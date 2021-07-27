import React, { useState } from "react";

const ChatInput = ({ userName, socket }) => {
  const [chatMessage, setChatMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("onSend", {
      userName: userName || localStorage.getItem("userName"),
      msg: chatMessage,
      timeStamp: new Date().toLocaleTimeString(),
    });
    setChatMessage("");
    console.log(chatMessage);
    console.log("onSend");
  };

  const onChatMessageChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="메시지를 입력하세요."
          value={chatMessage}
          onChange={onChatMessageChange}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default ChatInput;
