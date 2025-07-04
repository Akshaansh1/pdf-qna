import os
from dotenv import load_dotenv

load_dotenv()  # Load variables from `.env`

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:pass@localhost:5432/pdfqa")
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploaded_files")

settings = Settings()
