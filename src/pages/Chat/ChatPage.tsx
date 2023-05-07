import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import s from './ChatPage.module.css';
import { ChatBar, ChatBody, ChatFooter } from './components';

import { SocketContext } from '@utils/context/SocketContext';




const ChatPage: FC = () => {

  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const socket = useContext(SocketContext)

  const lastMessageRef = useRef(null);

  // useEffect(() => {
  //   socket.connect()
  
  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [])

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      setMessages([...messages, data])
      setTypingStatus('')
    });

  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

console.log('====================================');
console.log(lastMessageRef);
console.log('====================================');
  return (
    <div className={s.chat}>
      <ChatBar socket={socket}/>
      <div className={s.main}>
        <ChatBody messages={messages}  lastMessageRef={lastMessageRef} typingStatus={typingStatus}/>
        <ChatFooter socket={socket}/>
      </div>
    </div>
  );
};

export default ChatPage;