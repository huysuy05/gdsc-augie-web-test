from fastapi import APIRouter

route = APIRouter(
    tags=["workshops"],
    prefix="/workshops"
)


@route.get("/")
def fetch_all_workshops():
    return "Fetching"