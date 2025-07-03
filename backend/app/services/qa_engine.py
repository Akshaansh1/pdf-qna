from llama_index.core import SimpleDirectoryReader, VectorStoreIndex

def build_index(file_path: str):
    reader = SimpleDirectoryReader(input_files=[file_path])
    docs = reader.load_data()
    return VectorStoreIndex.from_documents(docs)

def query_pdf(index, question: str):
    query_engine = index.as_query_engine()
    return query_engine.query(question).response
