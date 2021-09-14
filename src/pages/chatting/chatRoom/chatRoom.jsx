/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component, createRef } from "react";

import styled from "styled-components";

import HeaderInfo2 from "../../../components/haeder/headerInfo2";
import ItemInfo from "./itemInfo";
import Message from "./message";
import MessageForm from "./messageForm";
import Skeleton from "./skeleton";
import AttachmentForm from "./attachmentForm";
import { firebaseDatabase } from "../../../shared/firebase";

import { postAction, requestPublicData } from "../../../shared/axios";
import { history } from "../../../redux/configureStore";
import AttachmentUserInfo from "./attachmentUserInfo";

export class ChatRoom extends Component {
  messagesEnd = createRef();

  state = {
    createdByMe: false,
    chatRoomId: "",
    withChatNick: "",
    withChatBcrypt: "",
    messages: [],
    messageLoading: true,
    messagesRef: firebaseDatabase.ref("messages"),
    showAttachmentPopup: false,
    showAttachmentAddressPopup: false,
    showAttachmentAccountPopup: false,
  };

  componentDidMount() {
    const getUserId = requestPublicData("v1/users/look-up-id");
    getUserId.then((result) => {
      if (result < 0) {
        history.push("/error");
      }
    });

    const href = window.location.href.split("/");
    const _ChatRoomId = href[href.length - 1];
    this.setState({ chatRoomId: _ChatRoomId });

    const chatRoomInfoRef = firebaseDatabase.ref(`chatRooms/${_ChatRoomId}`);
    chatRoomInfoRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();

          getUserId.then((result) => {
            if (result.userId === data.createdBy.id) {
              this.setState({ createdByMe: true });
              this.setState({ withChatNick: data.createdWith.nickName });
              this.setState({ withChatBcrypt: data.createdWith.bcryptId });
            } else {
              this.setState({ withChatNick: data.createdBy.nickName });
              this.setState({ withChatBcrypt: data.createdBy.bcryptId });
            }
          });

          this.addMessagesListeners(data.id);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      this.setState({
        messageLoading: false,
      });
    }, 1000);
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

  handleOpenAttachment = () => {
    this.setState({ showAttachmentPopup: true });
  };

  handleOpenAttachmentAddress = () => {
    this.setState({ showAttachmentAddressPopup: true });
  };

  handleOpenAttachmentAccount = () => {
    this.setState({ showAttachmentAccountPopup: true });
  };

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
    if (this.state.createdByMe) {
      firebaseDatabase
        .ref(`chatRooms/${chatRoomId}/createdBy`)
        .update({ isPresented: false });
    } else {
      firebaseDatabase
        .ref(`chatRooms/${chatRoomId}/createdWith`)
        .update({ isPresented: false });
    }
    postAction("v1/chat", { chatId: chatRoomId });
    localStorage.removeItem(chatRoomId);
    history.replace("/chatting");
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
    const {
      messages,
      messageLoading,
      chatRoomId,
      withChatBcrypt,
      showAttachmentPopup,
      showAttachmentAddressPopup,
      showAttachmentAccountPopup,
    } = this.state;

    return (
      <>
        {showAttachmentPopup && (
          <AttachmentForm
            _onClick1={() => {
              this.setState({ showAttachmentAddressPopup: true });
              this.setState({ showAttachmentPopup: false });
            }}
            _onClick2={() => {
              this.setState({ showAttachmentAccountPopup: true });
              this.setState({ showAttachmentPopup: false });
            }}
            _onClickExit={() => {
              this.setState({ showAttachmentPopup: false });
            }}
          />
        )}
        {showAttachmentAddressPopup && (
          <AttachmentUserInfo
            type="address"
            text="배송지 정보"
            _onClickExit={() => {
              this.setState({ showAttachmentAddressPopup: false });
            }}
          />
        )}
        {showAttachmentAccountPopup && (
          <AttachmentUserInfo
            type="account"
            text="계좌번호"
            _onClickExit={() => {
              this.setState({ showAttachmentAccountPopup: false });
            }}
          />
        )}
        <HeaderInfo2
          text1="채팅방 나가기"
          text2={this.state.withChatNick}
          padding="0 16px"
          _onClick={() => {
            this.leaveChatRoom(chatRoomId);
          }}
          _nickClick={() => {
            history.push(`/profile/${withChatBcrypt}`);
          }}
          type="chat"
          isClick
          isChat
          popup2
          userIdForReport={withChatBcrypt}
        />
        <ItemInfo />
        <div style={{ marginTop: "150px" }}>
          {this.renderMessageSkeleton(messageLoading)}
          {!messageLoading && (
            <MessageBox>{this.renderMessages(messages)}</MessageBox>
          )}
          <div ref={(node) => (this.messagesEnd = node)} />
        </div>
        <MessageForm
          onOpenAttachment={() => {
            this.handleOpenAttachment();
          }}
          // onSendImg={}
        />
      </>
    );
  }
}

const MessageBox = styled.div`
  margin-bottom: 80px;
`;

export default ChatRoom;
