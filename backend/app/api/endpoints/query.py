from fastapi import APIRouter, Query, Depends
from app.services.qa_engine import build_index, query_pdf
from app.models.document import Document
from app.core.database import SessionLocal
from sqlalchemy.orm import Session

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def ask_question(doc_id: int = Query(...), question: str = Query(...), db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        return {"error": "Document not found"}

    index = build_index(doc.filepath)
    answer = query_pdf(index, question)
    return {"answer": answer}
