/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component } from "react";
import styled from "styled-components";

import ChattingRow from "./chattingRow";
import { Text, LoginPopUp, Spinner } from "../../elements";
import Nav from "../../components/nav/nav";

import { requestPublicData, requestAuthData } from "../../shared/axios";
import { firebaseDatabase } from "../../shared/firebase";
import { history } from "../../redux/configureStore";

export class Chatting extends Component {
  state = {
    chatRooms: [],
    chatRoomList: [], // from DB
    itemList: [], // from DB
    userId: "",
    showPopup: false,
    isLoading: true,
  };

  componentDidMount() {
    localStorage.setItem("hasNewChat", false);

    const getUserId = requestPublicData("v1/users/look-up-id");
    getUserId.then((result) => {
      if (result < 0) {
        if (result === -201) {
          this.setState({ showPopup: true });
          return;
        }
        history.push("/error");
        return;
      }

      this.setState({ userId: result.userId });

      const usersRef = firebaseDatabase.ref("users");
      usersRef.child(result.userId).update({ hasNewChat: false });
    });

    const getChatroomList = requestAuthData("v2/users/chat-rooms");
    getChatroomList.then((result) => {
      if (result < 0) {
        if (result === -201) {
          this.setState({ showPopup: true });
          return;
        }
        history.push("/error");
        return;
      }

      this.setState({ chatRoomList: result });
      this.AddChatRoomsListeners();
    });

    const getMyItemList = requestAuthData("v1/users/items/not-complete");
    getMyItemList.then((result) => {
      this.setState({ isLoading: false });

      if (result < 0) {
        if (result === -201) {
          this.setState({ showPopup: true });
          return;
        }
        history.push("/error");
        return;
      }

      this.setState({ itemList: result });
      this.AddChatRoomsListeners();
    });
  }

  componentWillUnmount() {
    firebaseDatabase.ref("chatRooms").off();
    this.state.chatRooms.forEach((chatRoom) => {
      firebaseDatabase.ref("messages").child(chatRoom.id).off();
    });
  }

  AddChatRoomsListeners = () => {
    const chatRoomsArray = [];

    this.state.chatRoomList.forEach((chatRoom) => {
      const chatRef = firebaseDatabase.ref(
        `chatRooms/${chatRoom.itemSimpleDto.itemId}/${chatRoom.chatId}`,
      );
      chatRef.get().then((snapshot) => {
        chatRoomsArray.push(snapshot.val());

        const sortChatRoomsArray = chatRoomsArray.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });

        this.setState({ chatRooms: sortChatRoomsArray });
      });
    });

    this.state.itemList.forEach((itemId) => {
      firebaseDatabase
        .ref(`chatRooms/${itemId}`)
        .on("child_added", (snapshot) => {
          chatRoomsArray.push(snapshot.val());

          const sortChatRoomsArray = chatRoomsArray.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
          });

          this.setState({ chatRooms: sortChatRoomsArray });
        });
    });
  };

  renderChatRooms = () => {
    const existChatRooms = [];
    this.state.chatRooms.forEach((chatRoom) => {
      if (
        (chatRoom.createdBy.id === this.state.userId &&
          chatRoom.createdBy.isPresented === true) ||
        (chatRoom.createdWith.id === this.state.userId &&
          chatRoom.createdWith.isPresented === true)
      ) {
        existChatRooms.push(chatRoom);
      }
    });

    return (
      <>
        {existChatRooms.map((chatRoom) => (
          <ChattingRow
            key={chatRoom.id}
            chatRoom={chatRoom}
            userId={this.state.userId}
          />
        ))}
      </>
    );
  };

  render() {
    const { chatRooms, showPopup, isLoading } = this.state;

    return (
      <>
        {showPopup && <LoginPopUp />}
        <ChattingBox>
          <Header>
            <Text bold size="18px">
              채팅
            </Text>
          </Header>
          {isLoading && <Spinner />}
          {chatRooms !== [] && (
            <div style={{ marginBottom: "80px" }}>{this.renderChatRooms()}</div>
          )}
          <Nav />
        </ChattingBox>
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
