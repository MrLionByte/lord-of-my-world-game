from typing import List
from pydantic_settings import BaseSettings
from pydantic import field_validator

class Settings(BaseSettings):
    API_PREFIX: str = "/api"
    DEBUG: bool = False
    DATABASE_URL: str
    ALLOWED_ORIGINS: list[str] = []
    GROQ_API_KEY: str
    
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
    
settings = Settings()

if isinstance(settings.ALLOWED_ORIGINS, str):
    try:
        settings.ALLOWED_ORIGINS = json.loads(settings.ALLOWED_ORIGINS)
    except:
        settings.ALLOWED_ORIGINS = [settings.ALLOWED_ORIGINS]