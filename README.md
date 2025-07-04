# 🧠 PDF Q&A Chatbot

## Introduction
A powerful tool that lets you **chat with PDF documents**. Upload one or more PDFs, and ask questions in natural language. Powered by Llama‑Index (formerly GPT-Index) and Hugging Face vector embeddings, it returns precise answers along with relevant citations.

---

## Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Akshaansh1/pdf-qna.git
   cd pdf-qna
2. **Create a Virtual Environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
3. **Install required dependencies**
   ```bash
   pip install -r requirements.txt
4. **Start The Backend**
    ```bash
    cd backend
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
5. **Start the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev

## AI: Llama‑Index + Hugging Face Vector Embeddings
This app uses:
1. Llama‑Index to build an index over PDF documents
2. Hugging Face sentence-transformers (e.g. all-MiniLM-l6-v2) to compute vector embeddings

These components work together to:
1. Load and chunk PDF content,
2. Embed chunks into vector space,
3. Retrieve semantically relevant segments based on queries.
![image](https://github.com/user-attachments/assets/bff71540-6938-4141-b066-2cde5832e134)

## Backend
1.FastAPI – Handles routing, request parsing, and serves the API endpoints (/upload, /query) efficiently.

2.PdfMy / SimpleDirectoryReader – Loads and parses PDF content into text for downstream processing.

3.PostgresSQL - Stores the documents info and the query info

## Frontend
1. Used React.js for the frontend
2. Used libraries such as **tailwind-css** and **lucide-react** for styling.

## WorkFlow Of the Project
<img width="662" alt="image" src="https://github.com/user-attachments/assets/5fb28c14-8342-4a02-97c6-39d864882fcb" />

