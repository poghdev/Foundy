from datetime import datetime
from typing import Any

from django.conf import settings
from pymongo.collection import Collection
from pymongo.errors import DuplicateKeyError, PyMongoError

from common.exceptions import DuplicateEmailError, MongoUnavailableError
from common.mongodb import get_mongo_database


class WaitlistRepository:
    def get_collection(self) -> Collection[dict[str, Any]]:
        return get_mongo_database()[settings.MONGO_WAITLIST_COLLECTION]

    def create(self, document: dict[str, Any]) -> str:
        try:
            result = self.get_collection().insert_one(document)
        except DuplicateKeyError as exc:
            raise DuplicateEmailError from exc
        except PyMongoError as exc:
            raise MongoUnavailableError from exc
        return str(result.inserted_id)

    def ensure_indexes(self) -> None:
        try:
            self.get_collection().create_index(
                [("email_normalized", 1)],
                unique=True,
                name="uniq_waitlist_email_normalized",
            )
        except PyMongoError as exc:
            raise MongoUnavailableError from exc

    def health_check(self) -> None:
        try:
            self.get_collection().database.client.admin.command("ping")
        except PyMongoError as exc:
            raise MongoUnavailableError from exc


def build_waitlist_document(
    *,
    full_name: str,
    email: str,
    age_group: str,
    role: str,
    message: str | None,
    consent: bool,
    now: datetime,
) -> dict[str, Any]:
    document: dict[str, Any] = {
        "full_name": full_name,
        "email": email,
        "email_normalized": email,
        "age_group": age_group,
        "role": role,
        "consent": consent,
        "source": "landing_page",
        "status": "new",
        "created_at": now,
        "updated_at": now,
    }
    if message:
        document["message"] = message
    return document
