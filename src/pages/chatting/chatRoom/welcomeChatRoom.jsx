/* eslint-disable dot-notation */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/state-in-constructor */
import React, { Component, createRef } from "react";

import styled from "styled-components";

import Skeleton from "./skeleton";
import { Flex, Image } from "../../../elements/index";
import HeaderInfo from "../../../components/haeder/headerInfo";
import { lightGray2 } from "../../../shared/colors";
import { firebaseDatabase } from "../../../shared/firebase";

export class WelcomeChatRoom extends Component {
  messagesEnd = createRef();

  state = {
    withChatNick: "GOODSDUCK",
    messages: [],
    messageLoading: true,
    messagesRef: firebaseDatabase.ref("welcomeMessage"),
    screen: window.screen.width,
  };

  componentDidMount() {
    const messagesArray = [];
    this.setState({ messages: [] });
    this.state.messagesRef.on("child_added", (DataSnapshot) => {
      messagesArray.push(DataSnapshot.val());
      this.setState({
        messages: messagesArray,
      });
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

  renderMessageSkeleton = (loading) =>
    loading && (
      <>
        {[...Array(5)].map((undefine, i) => (
          <Skeleton key={i} />
        ))}
      </>
    );

  isImage = (_message) => {
    return (
      // eslint-disable-next-line no-prototype-builtins
      _message.hasOwnProperty("image") && !_message.hasOwnProperty("content")
    );
  };

  render() {
    const { messages, messageLoading, screen } = this.state;
    return (
      <>
        <HeaderInfo text={this.state.withChatNick} padding="0 16px" />
        <div style={{ marginTop: "55px" }}>
          {this.renderMessageSkeleton(messageLoading)}
          {!messageLoading &&
            messages.length > 0 &&
            messages.map((message) => {
              return (
                <Flex is_flex justify="flex-start" align="flex-end">
                  {this.isImage(message) ? (
                    <Image
                      shape="normal"
                      src={message.image}
                      width={screen > 415 ? "375px" : screen - 40}
                      margin="10px 20px 10px 20px;"
                      borderRadius="10px"
                    />
                  ) : (
                    <Text>{message.content}</Text>
                  )}
                </Flex>
              );
            })}
          <div ref={(node) => (this.messagesEnd = node)} />
        </div>
      </>
    );
  }
}

const Text = styled.p`
  max-width: 100%;
  background-color: ${lightGray2};
  border-radius: 0 10px 10px 10px;
  margin: 8px 20px;
  padding: 15px 18px;
  word-wrap: break-word;
`;

export default WelcomeChatRoom;
