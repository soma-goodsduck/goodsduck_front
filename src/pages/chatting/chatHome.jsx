/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

const ChatTestHome = ({ userName, roomName, setUserName, setRoomName }) => {
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  // setRoomName(uuidv4());
  localStorage.setItem("userName", userName);
  localStorage.setItem("roomName", roomName);

  return (
    <div>
      <label htmlFor="roomName">Room</label>
      <input name="roomName" onChange={handleRoomNameChange} />
      <label htmlFor="id">ID</label>
      <input name="id" onChange={handleUserNameChange} />
      <button type="button">
        <Link to="/Chat">새로운 방 만들기</Link>
      </button>
      <button type="button">
        <Link to="/Chat">채팅 참여하기</Link>
      </button>
    </div>
  );
};

export default ChatTestHome;
