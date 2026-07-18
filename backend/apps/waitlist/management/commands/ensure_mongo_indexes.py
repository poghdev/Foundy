from django.core.management.base import BaseCommand, CommandError

from apps.waitlist.repository import WaitlistRepository
from common.exceptions import MongoUnavailableError


class Command(BaseCommand):
    help = "Create idempotent indexes required by the Foundy MongoDB waitlist."

    def handle(self, *args: object, **options: object) -> None:
        del args, options
        try:
            WaitlistRepository().ensure_indexes()
        except MongoUnavailableError as exc:
            raise CommandError("MongoDB is unavailable; indexes were not created.") from exc
        self.stdout.write(self.style.SUCCESS("Waitlist MongoDB indexes are ready."))
