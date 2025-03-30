import { useState } from "react";
import { FaComment } from "react-icons/fa";
import { chatSession } from "@/service/AIModal"; // Import the shared chatSession

const Chatbot = ({ trip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m your AI Travel Planner assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  // Function to get bot response using Gemini chatSession
  const getBotResponse = async (userInput) => {
    try {
      setIsLoading(true);
      const result = await chatSession.sendMessage(
        `You are a travel planner assistant. The user asked: "${userInput}". Provide a helpful response based on this and any relevant trip data: ${JSON.stringify(trip)}. Only return plain text, no JSON formatting.`
      );
      let botResponse = await result.response.text();
  
      // If the response looks like JSON, extract the text
      try {
        const parsed = JSON.parse(botResponse);
        if (parsed.answer) {
          botResponse = parsed.answer; // Extract the "answer" value
        }
      } catch (e) {
        // If parsing fails, assume it’s already plain text
      }
  
      return botResponse.trim();
    } catch (error) {
      console.error("Error with Gemini API:", error);
      return "Oops! Something went wrong. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending a message
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user's message to chat
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setIsLoading(true);

    // Get bot response
    const botResponse = await getBotResponse(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
  };

  return (
    <>
      <div
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition"
        onClick={toggleChat}
      >
        <FaComment size={24} />
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-10 w-80 h-[400px] bg-white shadow-lg rounded-lg flex flex-col">
          <div className="bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">AI Travel Assistant</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-left mb-2">
                <span className="inline-block p-2 rounded-lg bg-gray-100 text-gray-800">
                  Typing...
                </span>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask me anything about travel..."
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
      )}
    </>
  );
};

export default Chatbot;