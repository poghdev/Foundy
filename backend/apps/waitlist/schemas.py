from datetime import datetime
from typing import Literal

from ninja import Schema
from pydantic import EmailStr, StrictBool, field_validator

from apps.waitlist.validators import normalize_gmail, validate_text_without_html

AgeGroup = Literal["under_16", "16_17", "18_24", "25_plus", "prefer_not_to_say"]
WaitlistRole = Literal["young_specialist", "founder", "mentor", "company_partner", "parent_educator", "other"]


class WaitlistRequest(Schema):
    full_name: str
    email: EmailStr
    age_group: AgeGroup
    role: WaitlistRole
    message: str | None = None
    consent: StrictBool
    website: str | None = None

    @field_validator("full_name")
    @classmethod
    def validate_full_name(cls, value: str) -> str:
        normalized = validate_text_without_html(value)
        if not 2 <= len(normalized) <= 100:
            raise ValueError("Full name must contain 2 to 100 characters.")
        return normalized

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: EmailStr) -> str:
        return normalize_gmail(value)

    @field_validator("message")
    @classmethod
    def validate_message(cls, value: str | None) -> str | None:
        if value is None:
            return None
        normalized = validate_text_without_html(value)
        if len(normalized) > 1000:
            raise ValueError("Message must not exceed 1000 characters.")
        return normalized or None

    @field_validator("consent")
    @classmethod
    def validate_consent(cls, value: bool) -> bool:
        if value is not True:
            raise ValueError("Consent is required.")
        return value


class WaitlistData(Schema):
    id: str
    email: str
    created_at: datetime


class WaitlistCreatedResponse(Schema):
    success: bool = True
    message: str
    data: WaitlistData


class ErrorResponse(Schema):
    detail: str
    code: str
    fields: dict[str, list[str]] | None = None


class HealthResponse(Schema):
    status: str
    services: dict[str, str]
