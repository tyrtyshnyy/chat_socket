import React, { FC, FormEvent, useContext, useState } from "react";

import { SocketContext } from "@utils/context/SocketContext";
import { useNavigate } from "react-router-dom";

import s from "./HomePage.module.css";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const socket = useContext(SocketContext)

  // useEffect(() => {
  //   socket.connect()
  
  //   return () => {
  //     // socket.disconnect()
  //   }
  // }, [])
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate("/chat");
  };
  return (
    <form className={s.container} onSubmit={handleSubmit}>
      <h2 className={s.header}>Присоединиться к Open Chat</h2>
      <label htmlFor="username">Введите имя</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className={s.input}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className={s.cta}>Войти</button>
    </form>
  );
};

export default HomePage;
