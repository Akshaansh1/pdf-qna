import React, { useState } from 'react';

export default function QASection({ docName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) {
      alert("Please enter a question");
      return;
    }

    if (!docName) {
      alert("Please select a document first");
      return;
    }

    console.log("🚀 Sending question:", input);
    console.log("📄 Document:", docName);

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const url = `http://localhost:8000/query/?doc_id=${docName.id}&question=${encodeURIComponent(input)}`;
      console.log("🔗 Request URL:", url);

      const res = await fetch(url);
      console.log("📡 Response status:", res.status);
      console.log("📡 Response headers:", res.headers);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("📋 Response data:", data);

      let answerText = "";
      
      if (data.answer) {
        answerText = data.answer.trim();
      } else if (data.response) {
        answerText = data.response.trim();
      } else if (data.result) {
        answerText = data.result.trim();
      } else {
        answerText = "No answer found in the document.";
        console.warn("⚠️ No answer field found in response:", data);
      }

      const aiMessage = {
        from: 'ai',
        text: answerText || "No answer found in the document.",
      };

      setMessages((prev) => [...prev, aiMessage]);
      console.log("✅ Answer added:", answerText);

    } catch (error) {
      console.error("❌ Error fetching answer:", error);
      const errorMessage = {
        from: 'ai',
        text: `⚠️ Error: ${error.message}. Please check the console for details.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }

    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Debug info */}
      <div className="bg-gray-100 p-2 text-xs text-gray-600 border-b">
        <div>Document: {docName ? `${docName.name} (ID: ${docName.id})` : 'None selected'}</div>
        <div>Status: {isLoading ? 'Loading...' : 'Ready'}</div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>Ask a question about the document to get started!</p>
            <p className="text-sm mt-2">Try: "What is this document about?"</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-xl px-4 py-3 max-w-lg text-sm whitespace-pre-wrap overflow-wrap break-words shadow-md ${
                msg.from === 'user'
                  ? 'bg-indigo-100 text-right'
                  : 'bg-gray-100 text-left'
              }`}
            >
              {msg.from === 'ai' && <strong className="block text-gray-500 mb-1">Answer:</strong>}
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-xl px-4 py-3 max-w-lg shadow-md">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t px-4 py-3 bg-gray-50">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Send a message..."
            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleAsk()}
            disabled={isLoading}
          />
          <button
            onClick={handleAsk}
            disabled={isLoading || !input.trim()}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white rounded px-4 py-2 text-sm font-semibold"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
      </div>
    </div>
  );
}