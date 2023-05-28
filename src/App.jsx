import React from "react";
import Chat from "./feature/chat/components/Chat";
import ConnectedUsersList from "./feature/chat/components/ConnectedUsersList";
import SocketContext from "./contexts/SocketContext";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000");
  return (
    <SocketContext.Provider value={socket}>
      <div className="flex flex-row items-center justify-center h-screen bg-gray-200">
        <Chat />
        <ConnectedUsersList />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
