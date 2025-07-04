from pydantic import BaseModel
from datetime import datetime

# For returning document metadata
class DocumentSchema(BaseModel):
    id: int
    filename: str
    upload_date: datetime

    class Config:
        orm_mode = True

# For upload response
class UploadResponse(BaseModel):
    message: str
    doc_id: int

# For query response
class QueryResponse(BaseModel):
    answer: str
