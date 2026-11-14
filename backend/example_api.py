"""
Reference backend for GalaxyFarm (FastAPI).

This file documents the JSON contract the frontend expects. It is NOT deployed
by Netlify — host your Python service separately, then set VITE_API_URL to its
base URL in the Netlify environment.

    pip install fastapi uvicorn
    uvicorn example_api:app --reload --port 8000
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GalaxyFarm API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your Netlify domain in production
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/overview")
def overview():
    return {
        "title": "Cultivating new worlds",
        "intro": "Intro paragraph shown under the main title.",
        "headline": "The global harvest at a glance",
        "subheadline": "Discoveries by observatory",
        "mapLabel": "World map",
        "mapHint": "Click a marker on the map to see its information",
    }


@app.get("/sites")
def sites():
    return [
        {
            "id": "paranal",
            "name": "Cerro Paranal",
            "location": "Atacama Desert, Chile",
            "lat": -24.627,
            "lon": -70.404,
            "photos": [
                # Use absolute URLs for images hosted by your backend.
                {"src": "/img/observatory-desert.png", "alt": "Observatory domes"},
            ],
            "fields": [
                {"label": "Planets confirmed", "info": "214", "addData": "+12 this quarter"},
                {"label": "Avg. orbital period", "info": "18.6 days", "addData": "Range 0.7 - 412 d"},
                {"label": "Stellar Host", "info": "TOI-700 · M dwarf", "addData": "101.4 ly · 3,480 K"},
            ],
        }
    ]
