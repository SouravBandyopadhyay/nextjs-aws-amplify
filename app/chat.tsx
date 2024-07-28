'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  });

  return (
    <div className=" max-w-xl mx-auto p-6 border border-gray-200 rounded-lg bg-white">
      <ul className="space-y-4 overflow-y-auto max-h-80">
        {messages.map((m, index) => (
          <li
            key={index}
            className={`p-4 rounded-lg ${
              m.role === 'user'
                ? 'bg-blue-100 text-right'
                : 'bg-gray-100 text-left'
            }`}
          >
            <span className="font-semibold">{m.role === 'user' ? 'You: ' : 'AI: '}</span>
            {m.content}
          </li>
        ))}
      </ul>
    
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button type="submit" className="p-2 bg-purple-500 text-white rounded-r-lg hover:bg-purple-600">
          Send
        </button>
      </form>
    </div>
  );
}
