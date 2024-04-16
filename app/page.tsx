"use client"

import React, { useState } from 'react';

const Home: React.FC = () => {
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const askTheAI = async () => {
    if (inputValue.trim() === '') return; // Ignore empty messages

    // Add user's message to the history
    setMessageHistory(prevHistory => [...prevHistory, `User: ${inputValue}`]);

    try {
      // Make API call to POST /api/openai
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: inputValue })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the AI');
      }

      const responseData = await response.json();

      // Add AI's response to the history
      setMessageHistory(prevHistory => [...prevHistory, `AI: ${responseData.response}`]);

      // Clear the input value after asking the AI
      setInputValue('');
    } catch (error) {
      console.error('Error:', error);
      // Handle error if needed
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Conversation history */}
      <div className="w-full max-w-lg bg-white p-4 mb-4 rounded-lg shadow-md">
        {messageHistory.map((message, index) => (
          <div key={index} className="mb-2">
            {message}
          </div>
        ))}
      </div>

      {/* Big textarea */}
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        className="w-full max-w-lg h-40 bg-gray-200 p-4 rounded-lg shadow-md mb-4"
        placeholder="Type your message here..."
      ></textarea>

      {/* Ask the AI button */}
      <button
        onClick={askTheAI}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
      >
        Ask the AI
      </button>
    </div>
  );
};

export default Home;
