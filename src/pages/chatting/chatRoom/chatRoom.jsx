/* eslint-disable react/no-array-index-key */
/* eslint-disable no-return-assign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import HeaderInfo2 from "../../../components/haeder/headerInfo2";
import ItemInfo from "./itemInfo";
import Message from "./message";
import MessageForm from "./messageForm";
import Skeleton from "./skeleton";
import { firebaseDatabase } from "../../../shared/firebase";

import { getInfo } from "../../../shared/axios";
import { history } from "../../../redux/configureStore";

export class ChatRoom extends Component {
  messagesEnd = createRef();

  state = {
    chatRoomId: this.props.chatRoomId,
    withChatNick: "",
    messages: [],
    messageLoading: true,
    messagesRef: firebaseDatabase.ref("messages"),
    chatRoomsRef: firebaseDatabase.ref("chatRooms"),
  };

  componentDidMount() {
    const getUserId = getInfo("/users/look-up-id");

    // 전달되는 props이 있을때 (ex. 채팅방을 클릭해서 들어온 경우)
    if (this.props.chatRoomId !== "") {
      const { createdById, chatRoomId } = this.props;
      getUserId.then((result) => {
        if (result.userId === createdById) {
          this.setState({ withChatNick: this.props.createdWithNickName });
        } else {
          this.setState({ withChatNick: this.props.createdByNickName });
        }
      });

      this.addMessagesListeners(chatRoomId);
    } else {
      // 전달되는 props이 없을때 (ex. 새로고침)
      const href = window.location.href.split("/");
      const newChatRoomId = href[href.length - 1];
      this.setState({ chatRoomId: newChatRoomId });

      const chatRoomInfoRef = firebaseDatabase.ref(
        `chatRooms/${newChatRoomId}`,
      );
      chatRoomInfoRef
        .get()
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            getUserId.then((result) => {
              if (result.userId === data.createdBy.id) {
                this.setState({ withChatNick: data.createdWith.nickName });
              } else {
                this.setState({ withChatNick: data.createdBy.nickName });
              }
            });

            this.addMessagesListeners(data.id);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setTimeout(() => {
      this.setState({
        messageLoading: false,
      });
    }, 2000);
  }

  componentDidUpdate() {
    // 메세지를 보냈을 때 자동으로 스크롤
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  }

  componentWillUnmount() {
    this.state.messagesRef.off();
  }

  addMessagesListeners = (chatRoomId) => {
    const messagesArray = [];
    this.setState({ messages: [] });
    this.state.messagesRef
      .child(chatRoomId)
      .on("child_added", (DataSnapshot) => {
        messagesArray.push(DataSnapshot.val());
        this.setState({
          messages: messagesArray,
        });
      });
  };

  leaveChatRoom = (chatRoomId) => {
    console.log(chatRoomId);
    this.state.chatRoomsRef.child(chatRoomId).remove();
    this.state.messagesRef.child(chatRoomId).remove();
    localStorage.removeItem(chatRoomId);
    history.push("/chatting");
  };

  renderMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message key={message.timestamp} message={message} />
    ));

  renderMessageSkeleton = (loading) =>
    loading && (
      <>
        {[...Array(5)].map((undefine, i) => (
          <Skeleton key={i} />
        ))}
      </>
    );

  render() {
    const { messages, messageLoading, chatRoomId } = this.state;

    return (
      <>
        <HeaderInfo2
          text1="채팅방 나가기"
          text2={this.state.withChatNick}
          padding="0 16px"
          _onClick={() => {
            this.leaveChatRoom(chatRoomId);
          }}
        />
        <ItemInfo />
        <div>
          {this.renderMessageSkeleton(messageLoading)}
          {!messageLoading && (
            <MessageBox>{this.renderMessages(messages)}</MessageBox>
          )}
          <div ref={(node) => (this.messagesEnd = node)} />
        </div>
        <MessageForm />
      </>
    );
  }
}

const MessageBox = styled.div`
  margin-bottom: 80px;
`;

const mapStateToProps = (state) => {
  return {
    chatRoomId: state.chat.chatRoomId,
    createdById: state.chat.createdById,
    createdByNickName: state.chat.createdByNickName,
    createdWithNickName: state.chat.createdWithNickName,
  };
};

export default connect(mapStateToProps)(ChatRoom);
