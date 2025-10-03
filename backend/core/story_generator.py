from sqlalchemy.orm import Session

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

from core.prompts import STORY_PROMPT
from models.story import Story,StoryNode
from core.models import StoryLLMResponse, StoryNodeLLM
from core.config import settings


class StoryGenerator:
    @classmethod
    def _get_llm(cls):
        return ChatGroq(
            model="openai/gpt-oss-120b",
            api_key=settings.GROQ_API_KEY
            )
    
    @classmethod
    def generate_story(cls, db: Session, session_id: str, theme: str) -> Story:
        print("Generating story with theme:", theme)
        llm = cls._get_llm()
        print("LLM initialized:", llm)
        story_parser = PydanticOutputParser(pydantic_object=StoryLLMResponse)
        prompt = ChatPromptTemplate.from_messages([
            (
                "system", 
                STORY_PROMPT
            ),(
                "human", 
                f"Create the story with this theme {theme}."
            )
        ]).partial(format_instructions=story_parser.get_format_instructions())
        
        raw_response = llm.invoke(prompt.invoke({}))
        
        response_text = raw_response
        if hasattr(raw_response, 'content'):
            response_text = raw_response.content

        story_structure = story_parser.parse(response_text)
        story_db = Story(
            title=story_structure.title, 
            content=story_structure.rootNode.content, 
            session_id=session_id
            )
        db.add(story_db)
        db.flush()
        
        root_node_data = story_structure.rootNode
        if isinstance(root_node_data, dict):
            root_node_data = StoryNodeLLM.model_validate(root_node_data)
        
        print("At story DB")
        print(type(story_db.id))
        cls._process_story_node(story_db.id, db, root_node_data, is_root=True)

        db.commit()
        return story_db
    
    @classmethod
    def _process_story_node(cls, story_id: int, db: Session, node_data: StoryNodeLLM, is_root: bool = False) -> StoryNode:
        node = StoryNode(
            story_id=story_id,
            is_root=is_root,
            content=node_data.content,
            is_ending=node_data.isEnding,
            is_winning_ending=node_data.isWinningEnding,
            options=[]
        )
        
        db.add(node)
        db.flush()
        
        if not node.is_ending and (hasattr(node_data, 'options') or node_data.options):
                
            new_options = []
            for option in node_data.options or []:
                next_node = option.nextNode
                if isinstance(next_node, dict):
                    next_node = StoryNodeLLM.model_validate(next_node)

                child_node = cls._process_story_node(story_id, db, next_node, is_root=False)

                new_options.append({
                    "text": option.text,
                    "node_id": child_node.id,
                })

            node.options = new_options
            
        db.flush()
        return node
        