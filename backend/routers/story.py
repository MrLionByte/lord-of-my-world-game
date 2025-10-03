import uuid
from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Cookie, Response, BackgroundTasks
from sqlalchemy.orm import Session

from database.database import get_database, SessionLocal
from models.story import Story, StoryNode
from models.job import StoryJob
from schemas.story import (
    CompleteStoryResponse, CreateStoryRequest,
    CompleteStoryNodeResponse
)
from schemas.job import StoryJobRequest
from core.story_generator import StoryGenerator


router = APIRouter(
    prefix="/stories",
    tags=["stories"]
)

def get_session_id(session_id: Optional[str] = Cookie(None)) -> str:
    if not session_id:
        session_id = str(uuid.uuid4())
    return session_id


@router.post("/create", response_model=StoryJobRequest)
def create_story(
    request: CreateStoryRequest,
    background_tasks: BackgroundTasks,
    response: Response,
    session_id: str = Depends(get_session_id),
    db: Session = Depends(get_database)
):
    response.set_cookie(key="session_id", value=session_id, httponly=True)

    job_id = str(uuid.uuid4())

    job = StoryJob(
        job_id=job_id,
        session_id=session_id,
        theme=request.theme,
        status="pending", 
    )
    db.add(job)
    db.commit()
    
    background_tasks.add_task(
        generate_story_task, 
        job_id=job_id, 
        theme=request.theme, 
        session_id=session_id
        )
    
    return job


def generate_story_task(job_id: str, theme: str, session_id: str):
    print("Starting background task for job_id:", job_id, theme, session_id)
    db = SessionLocal()
    print("Database session created", db)
    try:
        job = db.query(StoryJob).filter(StoryJob.job_id == job_id).first()
        print("Found job:", job)
        if not job:
            return 
        
        try:
            job.status = "processing"
            db.commit()
            print("Job status updated to processing")
            story = StoryGenerator.generate_story(db, session_id, theme)
            print("Story generated:", story)
            if not story:
                raise ValueError("Generated story content is empty")
            
            job.story_id = story.id
            job.status = "completed"
            job.completed_at = datetime.now()
            db.commit()
        except Exception as e:
            print("Error occurred at generate_story_task:", e)
            db.rollback()
            job.status = "failed"
            job.completed_at = datetime.now()
            job.error = str(e)
            db.commit()
    finally:
        db.close()
        

@router.get("/{story_id}/complete", response_model=CompleteStoryResponse)
def get_complete_story(story_id: int, db: Session = Depends(get_database)):
    story = db.query(Story).filter(Story.id == story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    
    complete_story = build_complete_story_tree(db, story)
    return complete_story


def build_complete_story_tree(db: Session, story: Story) -> CompleteStoryResponse:
    pass