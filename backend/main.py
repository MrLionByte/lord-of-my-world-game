from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from routers import story, job
from database.database import create_tables
 
 
app = FastAPI(
    title="Lord Of My World Game API",
    description="API for the Lord Of My World game",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

@app.on_event("startup")
def on_startup():
    create_tables() 

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(story.router, prefix=settings.API_PREFIX)
app.include_router(job.router, prefix=settings.API_PREFIX)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)