import logging

from django.conf import settings
from django.http import HttpRequest
from ninja import NinjaAPI
from ninja.errors import ValidationError

from apps.waitlist.api import router as waitlist_router

logger = logging.getLogger(__name__)
api = NinjaAPI(
    title="Foundy API",
    version="1.0.0",
    urls_namespace="foundy-api",
    docs_url="/docs" if settings.DEBUG else None,
    openapi_url="/openapi.json" if settings.DEBUG else None,
)
api.add_router("", waitlist_router)


@api.exception_handler(ValidationError)
def validation_error_handler(request: HttpRequest, exc: ValidationError):
    fields: dict[str, list[str]] = {}
    for error in exc.errors:
        location = error.get("loc", [])
        field = str(location[-1]) if location else "request"
        fields.setdefault(field, []).append(error.get("msg", "Invalid value."))
    return api.create_response(
        request,
        {"detail": "Please correct the highlighted fields.", "code": "validation_error", "fields": fields},
        status=400,
    )
