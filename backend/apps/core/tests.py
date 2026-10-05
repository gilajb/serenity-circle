from django.urls import reverse


def test_live_needs_no_database(client):
    response = client.get(reverse("health-live"))
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
