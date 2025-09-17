from fastapi.testclient import TestClient

from src.main import app

client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_list_agents() -> None:
    response = client.get("/agents")
    assert response.status_code == 200
    payload = response.json()
    assert "agents" in payload
    assert sorted(payload["agents"]) == sorted(
        [
            "orchestrateur",
            "achat",
            "produit",
            "agregateur",
            "logistique",
            "risque",
            "support",
        ]
    )
