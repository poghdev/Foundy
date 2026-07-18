class MongoUnavailableError(Exception):
    """Raised when MongoDB cannot safely serve a request."""


class DuplicateEmailError(Exception):
    """Raised when an email already exists in the waitlist."""
