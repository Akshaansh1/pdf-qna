import React from 'react';
import { Upload } from 'lucide-react';

export default function UploadForm({ setDocName, docName }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data?.doc_id) setDocName({ id: data.doc_id, name: file.name });
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 border-b">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="logo" className="h-6" />
        <span className="font-medium text-sm text-gray-600">formerly DPhil</span>
      </div>
      <div className="flex items-center space-x-2">
        {docName && (
          <span className="text-sm text-green-700 font-medium truncate max-w-[200px]">
            {docName.name}
          </span>
        )}
        <label htmlFor="pdf-upload" className="flex items-center space-x-1 border rounded px-3 py-1 text-sm cursor-pointer">
          <Upload size={14} /> <span>Upload PDF</span>
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}