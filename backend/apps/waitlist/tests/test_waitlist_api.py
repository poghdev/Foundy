from datetime import datetime, timezone

import pytest
from django.core.cache import cache
from django.test import Client

from apps.waitlist.services import CreatedWaitlistEntry
from common.exceptions import DuplicateEmailError, MongoUnavailableError


@pytest.fixture(autouse=True)
def clear_cache() -> None:
    cache.clear()


@pytest.fixture
def client() -> Client:
    return Client()


@pytest.fixture
def payload() -> dict[str, object]:
    return {
        "full_name": "Արամ Սարգսյան",
        "email": "ARAM@GMAIL.COM",
        "age_group": "18_24",
        "role": "young_specialist",
        "message": "I would like to join.",
        "consent": True,
    }


@pytest.fixture
def service_stub(monkeypatch: pytest.MonkeyPatch) -> list[object]:
    submissions: list[object] = []

    class StubService:
        def submit(self, submission: object) -> CreatedWaitlistEntry:
            submissions.append(submission)
            return CreatedWaitlistEntry("507f1f77bcf86cd799439011", submission.email, datetime.now(timezone.utc))

    monkeypatch.setattr("apps.waitlist.api.WaitlistService", lambda: StubService())
    return submissions


def post(client: Client, payload: dict[str, object]):
    return client.post("/api/v1/waitlist", data=payload, content_type="application/json")


def test_creates_waitlist_entry_and_returns_safe_data(client: Client, payload: dict[str, object], service_stub: list[object]) -> None:
    response = post(client, payload)
    body = response.json()

    assert response.status_code == 201
    assert body["success"] is True
    assert body["data"]["email"] == "aram@gmail.com"
    assert "full_name" not in body["data"]
    assert len(service_stub) == 1


def test_rejects_non_gmail(client: Client, payload: dict[str, object]) -> None:
    payload["email"] = "user@yahoo.com"
    response = post(client, payload)
    assert response.status_code == 400
    assert response.json()["code"] == "validation_error"


@pytest.mark.parametrize("email", ["not-an-email", "user@gmail.co", "user @gmail.com"])
def test_rejects_invalid_email(client: Client, payload: dict[str, object], email: str) -> None:
    payload["email"] = email
    assert post(client, payload).status_code == 400


@pytest.mark.parametrize(
    ("field", "value"),
    [
        ("full_name", " "),
        ("full_name", "a" * 101),
        ("age_group", "unknown"),
        ("role", "unknown"),
        ("consent", False),
        ("message", "a" * 1001),
    ],
)
def test_rejects_invalid_payload_values(client: Client, payload: dict[str, object], field: str, value: object) -> None:
    payload[field] = value
    assert post(client, payload).status_code == 400


def test_duplicate_email_returns_conflict(client: Client, payload: dict[str, object], monkeypatch: pytest.MonkeyPatch) -> None:
    class DuplicateService:
        def submit(self, submission: object) -> None:
            del submission
            raise DuplicateEmailError

    monkeypatch.setattr("apps.waitlist.api.WaitlistService", lambda: DuplicateService())
    response = post(client, payload)
    assert response.status_code == 409
    assert response.json()["code"] == "email_already_exists"


def test_honeypot_returns_success_without_storing(client: Client, payload: dict[str, object], service_stub: list[object]) -> None:
    payload["website"] = "https://spam.example"
    response = post(client, payload)
    assert response.status_code == 201
    assert service_stub == []


def test_mongodb_unavailable_returns_safe_error(client: Client, payload: dict[str, object], monkeypatch: pytest.MonkeyPatch) -> None:
    class UnavailableService:
        def submit(self, submission: object) -> None:
            del submission
            raise MongoUnavailableError

    monkeypatch.setattr("apps.waitlist.api.WaitlistService", lambda: UnavailableService())
    response = post(client, payload)
    assert response.status_code == 503
    assert response.json()["code"] == "mongodb_unavailable"


def test_health_endpoint(client: Client, monkeypatch: pytest.MonkeyPatch) -> None:
    class HealthyRepository:
        def health_check(self) -> None:
            return None

    monkeypatch.setattr("apps.waitlist.api.WaitlistRepository", HealthyRepository)
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["services"]["mongodb"] == "ok"
