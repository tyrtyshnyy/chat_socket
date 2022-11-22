import { Socket } from "socket.io-client";

export interface ChatPageProps {
  socket: Socket;
}

export interface ChatFooterProps {
  socket: Socket;
}

type Message = {
  name: string
  id: number
  text: string
}
export interface ChatBodyProps {
  messages: Message[],
  lastMessageRef: React.RefObject<HTMLDivElement>
  typingStatus: string
}


export interface ChatBarProps {
  socket: Socket;
}