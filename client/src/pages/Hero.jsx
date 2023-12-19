import React, { useState } from 'react';

const Message = ({ text, isUser }) => {
  const messageClass = isUser ? 'bg-white text-black' : 'bg-black';
  const positionClass = isUser ? 'text-right' : 'text-left';

  return (
    <div className={`max-w-xs mx-2 my-1 p-2 rounded ${messageClass} ${positionClass}`}>
      {text}
    </div>
  );
};

const ChatBox = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-b from-blue-400 to-blue-700 text-white">
      <div className="flex-1 flex flex-col overflow-y-scroll p-4">
        {/* Main chat area with chat history */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Sky Chat</h2>
        </div>
        {/* New messages area */}
        <div className="flex-1 overflow-y-scroll">
          {messages.map((message, index) => (
            <Message key={index} text={message.text} isUser={message.isUser} />
          ))}
        </div>
        <div className="p-4">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-l"
            />
            <button onClick={handleSendMessage} className="p-2 bg-yellow-300 text-blue-700 rounded-r">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, isUser: true }]);
    // Simulate a response from the other user (in a real app, you would send a request to a server)
    setTimeout(() => {
      setMessages([...messages, { text: 'Received: ' + text, isUser: false }]);
    }, 1000);
  };

  return (
    <div className="App flex items-center justify-center h-screen">
      <ChatBox messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default App;
