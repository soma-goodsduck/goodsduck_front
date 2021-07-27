import React, { useEffect, useState } from "react";

import socketIOClient from "socket.io-client/dist/socket.io";

import ChatLog from "./chatLog";
import ChatInput from "./chatInput";
import Spinner from "../../shared/spinner";

const ChatRoom = () => {
  // 아이템 아이디
  const href = window.location.href.split("/");
  const chatRoomId = href[href.length - 1];
  const userJWT = localStorage.getItem("jwt");

  const myInfo = {
    roomName: chatRoomId,
    userName: userJWT,
  };

  const [currentSocket, setCurrentSocket] = useState();

  useEffect(() => {
    setCurrentSocket(socketIOClient(process.env.REACT_APP_BACK_NODE_URL));
  }, []);

  if (currentSocket) {
    currentSocket.on("connect", () => {
      currentSocket.emit("join", myInfo);
    });
  }

  console.log(chatRoomId, userJWT);

  return (
    <div>
      {currentSocket ? (
        <>
          <ChatLog socket={currentSocket} />
          <ChatInput userName={userJWT} socket={currentSocket} />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ChatRoom;
