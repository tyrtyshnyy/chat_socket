import React, { FC, FormEvent, useState } from 'react';
import { ChatFooterProps } from '../Chat.props';

const ChatFooter: FC<ChatFooterProps> = ({socket} ) => {
  const [message, setMessage] = useState('');

  const handleTyping = () => {
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`);
  }
  

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;