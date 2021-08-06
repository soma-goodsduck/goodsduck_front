/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component } from "react";
import styled from "styled-components";

import ChattingRow from "./chattingRow";
import { Text, LoginPopUp } from "../../elements";
import Nav from "../../components/nav/nav";

import { requestPublicData } from "../../shared/axios";
import { firebaseDatabase } from "../../shared/firebase";

export class Chatting extends Component {
  state = {
    chatRoomsRef: firebaseDatabase.ref("chatRooms"),
    messagesRef: firebaseDatabase.ref("messages"),
    chatRooms: [],
    userId: "",
    showPopup: false,
  };

  componentDidMount() {
    const getUserId = requestPublicData("v1/users/look-up-id");
    getUserId.then((result) => {
      if (result === null) {
        this.setState({ showPopup: true });
      } else {
        this.AddChatRoomsListeners(result.userId);
        this.setState({ userId: result.userId });
      }
    });
  }

  componentWillUnmount() {
    this.state.chatRoomsRef.off();

    this.state.chatRooms.forEach((chatRoom) => {
      this.state.messagesRef.child(chatRoom.id).off();
    });
  }

  AddChatRoomsListeners = (userId) => {
    const chatRoomsArray = [];
    this.state.chatRoomsRef.on("child_added", (DataSnapshot) => {
      if (
        (DataSnapshot.val().createdBy.id === userId &&
          DataSnapshot.val().createdBy.isPresented === true) ||
        (DataSnapshot.val().createdWith.id === userId &&
          DataSnapshot.val().createdWith.isPresented === true)
      ) {
        chatRoomsArray.push(DataSnapshot.val());

        const sortChatRoomsArray = chatRoomsArray.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });

        this.setState({ chatRooms: sortChatRoomsArray });
      }
    });
  };

  render() {
    const { userId, chatRooms, showPopup } = this.state;

    return (
      <>
        {showPopup && <LoginPopUp />}
        {!showPopup && (
          <ChattingBox>
            <Header>
              <Text bold size="18px">
                채팅
              </Text>
            </Header>
            {chatRooms !== [] && (
              <div style={{ marginBottom: "80px" }}>
                {chatRooms.map((chatRoom) => (
                  <ChattingRow
                    key={chatRoom.id}
                    chatRoom={chatRoom}
                    userId={userId}
                  />
                ))}
              </div>
            )}
            <Nav />
          </ChattingBox>
        )}
      </>
    );
  }
}

const ChattingBox = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export default Chatting;
