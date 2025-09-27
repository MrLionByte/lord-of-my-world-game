from sqlalchemy import (
    Column, Integer, String, Text, 
    DateTime, Boolean, ForeignKey, JSON 
    )
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func


from db.database import Base


class Story(Base):
    __tablename__ = "stories"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    session_id = Column(String(255), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    nodes = relationship("StoryNode", back_populates="story", cascade="all, delete-orphan")
    
    
class StoryNode(Base):
    __tablename__ = "story_nodes"
    
    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, ForeignKey("stories.id"), index=True, nullable=True)
    content = Column(Text)
    is_root = Column(Boolean, default=False)
    is_ending = Column(Boolean, default=False)
    is_wining_ending = Column(Boolean, default=False)
    options = Column(JSON, default=list)

    story = relationship("Story", back_populates="nodes")

