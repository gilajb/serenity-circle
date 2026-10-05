import pytest
from django.db import IntegrityError

from .models import User

pytestmark = pytest.mark.django_db

PASSWORD = "a-long-test-password"


def test_create_user_lowercases_email_and_hashes_with_argon2():
    user = User.objects.create_user("Someone@Example.COM", PASSWORD, full_name="Test User")
    assert user.email == "someone@example.com"
    assert user.role == User.Role.CLIENT
    assert user.password.startswith("argon2")
    assert user.check_password(PASSWORD)


def test_email_is_unique_regardless_of_case():
    User.objects.create(email="someone@example.com", full_name="Test User")
    with pytest.raises(IntegrityError):
        User.objects.create(email="SOMEONE@example.com", full_name="Test User")


def test_superuser_is_an_admin():
    user = User.objects.create_superuser("admin@example.com", PASSWORD, full_name="Admin")
    assert user.role == User.Role.ADMIN
    assert user.is_staff and user.is_superuser
