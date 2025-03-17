import { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m your AI Travel Planner assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  // Handle sending a message
  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { sender: 'user', text: input }]);

    // Simulate bot response (replace with API call later)
    const botResponse = getBotResponse(input);
    setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);

    // Clear input
    setInput('');
  };

  // Simple logic for bot responses (replace with API logic)
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('plan a trip')) {
      return 'Sure! Please tell me your destination, travel dates, and preferences (e.g., budget, interests).';
    } else if (input.includes('best time')) {
      return 'Could you specify the destination? I can tell you the best time to visit!';
    } else {
      return 'I’m here to help with trip planning. Ask me anything about destinations, itineraries, or travel tips!';
    }
  };

  return (
    <div className="fixed bottom-10 right-10 w-80 h-[400px] bg-white shadow-lg rounded-lg flex flex-col">
      {/* Chat Header */}
      <div className="bg-blue-500 text-white p-3 rounded-t-lg">
        <h3 className="font-semibold">AI Travel Assistant</h3>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;