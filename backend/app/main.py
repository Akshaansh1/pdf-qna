from fastapi import FastAPI
from app.api.endpoints import upload, query
from fastapi.middleware.cors import CORSMiddleware

# Create the app with desired settings
app = FastAPI(redirect_slashes=False)  # Only create app ONCE

# Allow CORS from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register your routers
app.include_router(upload.router, prefix="/upload")
app.include_router(query.router, prefix="/query")
