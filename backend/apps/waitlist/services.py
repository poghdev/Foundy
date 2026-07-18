import logging
from dataclasses import dataclass
from datetime import datetime, timezone

from apps.waitlist.repository import WaitlistRepository, build_waitlist_document
from apps.waitlist.schemas import WaitlistRequest

logger = logging.getLogger(__name__)


def mask_email(email: str) -> str:
    local, domain = email.split("@", 1)
    return f"{local[:1]}***@{domain}"


@dataclass(frozen=True)
class CreatedWaitlistEntry:
    id: str
    email: str
    created_at: datetime


class WaitlistService:
    def __init__(self, repository: WaitlistRepository | None = None) -> None:
        self.repository = repository or WaitlistRepository()

    def submit(self, payload: WaitlistRequest) -> CreatedWaitlistEntry:
        now = datetime.now(timezone.utc)
        document = build_waitlist_document(
            full_name=payload.full_name,
            email=payload.email,
            age_group=payload.age_group,
            role=payload.role,
            message=payload.message,
            consent=payload.consent,
            now=now,
        )
        identifier = self.repository.create(document)
        logger.info("Waitlist entry created for %s", mask_email(payload.email))
        return CreatedWaitlistEntry(id=identifier, email=payload.email, created_at=now)
