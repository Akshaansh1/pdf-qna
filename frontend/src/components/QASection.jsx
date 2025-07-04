import React, { useState } from 'react';

export default function QASection({ docName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleAsk = async () => {
    if (!input.trim() || !docName) return;

    setMessages([...messages, { from: 'user', text: input }]);

    const res = await fetch(
      `http://localhost:8000/query/?doc_id=${docName.id}&question=${encodeURIComponent(input)}`
    );
    const data = await res.json();

    setMessages([...messages, { from: 'user', text: input }, { from: 'ai', text: data.answer }]);
    setInput("");
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-xl px-4 py-2 max-w-md text-sm whitespace-pre-wrap shadow-sm ${
                msg.from === 'user' ? 'bg-indigo-100' : 'bg-gray-100'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t px-4 py-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Send a message..."
            className="flex-1 border rounded px-3 py-2 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />
          <button
            onClick={handleAsk}
            className="bg-indigo-500 hover:bg-indigo-600 text-white rounded px-3 py-2 text-sm"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
