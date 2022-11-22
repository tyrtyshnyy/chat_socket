import dayjs from 'dayjs';
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ChatBodyProps } from "../Chat.props";
const now = dayjs();

const ChatBody: FC<ChatBodyProps> = ({ messages, lastMessageRef, typingStatus }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };
const currentTime = now.format("HH:mm")

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You  <span className="message__time">{currentTime}</span></p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name} <span className="message__time">{currentTime}</span></p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        {/* <div ref={lastMessageRef} /> */}
      </div>
    </>
  );
};

export default ChatBody;
