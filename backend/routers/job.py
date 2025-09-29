import uuid
from typing import Optional
from fastapi import (
    APIRouter, Depends, HTTPException, status, Cookie
    )
from sqlalchemy.orm import Session

from database.database import get_database
from models.job import StoryJob
from schemas.job import StoryJobRequest


router = APIRouter(
    prefix="/jobs",
    tags=["jobs"]
)


@router.get("/{job_id}", response_model=StoryJobRequest)
def get_job_status(job_id: str, db: Session = Depends(get_database)):
    job = db.query(StoryJob).filter(StoryJob.job_id == job_id).first()
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    return job