from fastapi import FastAPI

app = FastAPI(title="Echo Agents", version="0.1.0")


@app.get("/health")
def health() -> dict[str, str]:
    """Health probe endpoint."""
    return {"status": "ok"}


@app.get("/agents")
def list_agents() -> dict[str, list[str]]:
    """List available agent roles."""
    roles = [
        "orchestrateur",
        "achat",
        "produit",
        "agregateur",
        "logistique",
        "risque",
        "support",
    ]
    return {"agents": roles}
