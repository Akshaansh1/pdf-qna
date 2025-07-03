from fastapi import APIRouter, UploadFile, File, Depends
import os
from app.core.database import SessionLocal
from app.models.document import Document
from app.services.pdf_processor import extract_text
from sqlalchemy.orm import Session
from uuid import uuid4

router = APIRouter()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploaded_files")
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
async def upload_pdf(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are supported"}

    filename = f"{uuid4().hex}.pdf"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    doc = Document(filename=filename, filepath=file_path)
    db.add(doc)
    db.commit()

    # You may pre-process and index the document here
    extract_text(file_path)

    return {"message": "Upload successful", "doc_id": doc.id}
