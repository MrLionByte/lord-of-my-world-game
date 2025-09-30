from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field


class StoryOptionLLM(BaseModel):
    text: str = Field(description="The text for this option shown to the player")
    nextNode: Dict[str, Any] = Field(description="The next node content and its options")


class StoryNodeLLM(BaseModel):
    content: str = Field(description="The main content of this story node")
    isEnding: bool = Field(description="Whether this node is an ending node")
    isWinningEnding: bool = Field(description="Whether this ending is a winning ending node")
    options: Optional[List[StoryOptionLLM]] = Field(
        default=None, description="List of options for this node"
        )
    

class StoryLLMResponse(BaseModel):
    title: str = Field(description="The title of the story")
    rootNode: StoryNodeLLM = Field(description="The root node of the story")
    
    
    
