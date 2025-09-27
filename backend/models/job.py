from sqlalchemy import (
    Column, Integer, String, Text, 
    DateTime, 
    )
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


from db.database import Base


class StoryJob(Base):
    __tablename__ = "story_jobs"
    
    id = Column(Integer, primary_key = True, index=True)
    job_id = Column(String(255), nullable=False, index=True)
    session_id = Column(String(255), nullable=False, index=True)
    theme = Column(String(255), nullable=False)
    status = Column(String(50), nullable=False, default="pending")
    story_id = Column(Integer, nullable=True)
    error = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    