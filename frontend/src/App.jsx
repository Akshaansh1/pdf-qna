import React, { useState } from 'react';
import QASection from './components/QASection';
import UploadForm from './components/UploadForm';

export default function App() {
  const [docName, setDocName] = useState(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <UploadForm setDocName={setDocName} docName={docName} />
      <QASection docName={docName} />
    </div>
  );
}