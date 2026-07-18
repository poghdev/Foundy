from pydantic import EmailStr


def normalize_gmail(email: EmailStr) -> str:
    normalized = str(email).strip().lower()
    if any(character.isspace() for character in normalized):
        raise ValueError("Enter a valid email address.")
    domain = normalized.rsplit("@", 1)[1]
    if domain != "gmail.com":
        raise ValueError("Only Gmail addresses are currently accepted.")
    return normalized


def validate_text_without_html(value: str) -> str:
    normalized = value.strip()
    if "<" in normalized or ">" in normalized:
        raise ValueError("HTML is not allowed.")
    return normalized
