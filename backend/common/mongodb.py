from functools import lru_cache

from django.conf import settings
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.errors import PyMongoError

from common.exceptions import MongoUnavailableError


@lru_cache(maxsize=1)
def get_mongo_client() -> MongoClient:
    return MongoClient(
        settings.MONGO_URI,
        serverSelectionTimeoutMS=3000,
        connectTimeoutMS=3000,
        socketTimeoutMS=5000,
    )


def get_mongo_database() -> Database:
    return get_mongo_client()[settings.MONGO_DB_NAME]


def check_mongo_health() -> None:
    try:
        get_mongo_client().admin.command("ping")
    except PyMongoError as exc:
        raise MongoUnavailableError from exc
