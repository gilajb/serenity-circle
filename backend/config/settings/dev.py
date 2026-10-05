from .base import *  # noqa: F403

DEBUG = True
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]
CSRF_TRUSTED_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# No Redis on the development machine: run background tasks inline.
CELERY_TASK_ALWAYS_EAGER = True
