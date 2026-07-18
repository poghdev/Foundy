import logging
from hashlib import sha256
from datetime import datetime, timezone

from bson import ObjectId
from django.core.cache import cache
from django.http import HttpRequest
from ninja import Router
from ninja.responses import Status

from apps.waitlist.repository import WaitlistRepository
from apps.waitlist.schemas import ErrorResponse, HealthResponse, WaitlistCreatedResponse, WaitlistRequest
from apps.waitlist.services import WaitlistService, mask_email
from common.exceptions import DuplicateEmailError, MongoUnavailableError

logger = logging.getLogger(__name__)
router = Router(tags=["waitlist"])
RATE_LIMIT_ATTEMPTS = 5
RATE_LIMIT_SECONDS = 10 * 60


def is_rate_limited(request: HttpRequest) -> bool:
    # TODO: Move rate limiting to Redis before multi-instance production deployment.
    client_ip = request.META.get("REMOTE_ADDR", "unknown")
    key = f"waitlist-rate-limit:{sha256(client_ip.encode()).hexdigest()}"
    if cache.add(key, 1, RATE_LIMIT_SECONDS):
        return False
    try:
        attempts = cache.incr(key)
    except ValueError:
        cache.set(key, 1, RATE_LIMIT_SECONDS)
        return False
    return attempts > RATE_LIMIT_ATTEMPTS


@router.post(
    "/waitlist",
    response={201: WaitlistCreatedResponse, 400: ErrorResponse, 409: ErrorResponse, 429: ErrorResponse, 503: ErrorResponse},
)
def create_waitlist(request: HttpRequest, payload: WaitlistRequest):
    if is_rate_limited(request):
        logger.warning("Waitlist rate limit reached")
        return Status(429, {"detail": "Too many submissions. Please try again later.", "code": "rate_limit_exceeded"})

    if payload.website:
        return Status(201, {
            "success": True,
            "message": "You have joined the Foundy early list.",
            "data": {"id": str(ObjectId()), "email": payload.email, "created_at": datetime.now(timezone.utc)},
        })

    try:
        entry = WaitlistService().submit(payload)
    except DuplicateEmailError:
        logger.info("Duplicate waitlist entry attempted for %s", mask_email(payload.email))
        return Status(409, {"detail": "This Gmail address is already on the Foundy early list.", "code": "email_already_exists"})
    except MongoUnavailableError:
        logger.error("MongoDB unavailable while creating waitlist entry")
        return Status(503, {"detail": "The waitlist service is temporarily unavailable.", "code": "mongodb_unavailable"})

    return Status(201, {
        "success": True,
        "message": "You have joined the Foundy early list.",
        "data": {"id": entry.id, "email": entry.email, "created_at": entry.created_at},
    })


@router.get("/health", response={200: HealthResponse, 503: ErrorResponse})
def health_check(request: HttpRequest):
    del request
    try:
        WaitlistRepository().health_check()
    except MongoUnavailableError:
        logger.error("MongoDB unavailable during health check")
        return Status(503, {"detail": "MongoDB is temporarily unavailable.", "code": "mongodb_unavailable"})
    return {"status": "ok", "services": {"api": "ok", "mongodb": "ok"}}
