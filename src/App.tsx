import { socket, SocketContext } from "@utils/context/SocketContext";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ChatPage from "@pages/Chat/ChatPage";
import HomePage from "@pages/Home/HomePage";

export default function App() {
  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/chat" element={<ChatPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}
