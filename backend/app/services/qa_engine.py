import os
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core.settings import Settings
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.retrievers import VectorIndexRetriever
from llama_index.core.response_synthesizers import CompactAndRefine
from llama_index.core.query_engine import RetrieverQueryEngine

# ✅ Set Hugging Face embeddings (local)
Settings.llm = None
Settings.embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")

# ✅ Build index with better chunking
def build_index(file_path: str):
    reader = SimpleDirectoryReader(input_files=[file_path])
    docs = reader.load_data()

    # Use sentence splitter for better chunking
    parser = SentenceSplitter(chunk_size=256, chunk_overlap=20)
    nodes = parser.get_nodes_from_documents(docs)

    return VectorStoreIndex(nodes)

# ✅ Query PDF and print debug info
def query_pdf(index, question: str):
    retriever = VectorIndexRetriever(index=index, similarity_top_k=5)
    response_synthesizer = CompactAndRefine()

    query_engine = RetrieverQueryEngine(
        retriever=retriever,
        response_synthesizer=response_synthesizer
    )

    response = query_engine.query(question)

    print("\n🔍 Retrieved Nodes:")
    for node in response.source_nodes:
        print(">>>", node.node.text[:300].replace("\n", " "))

    return response.response.strip()
