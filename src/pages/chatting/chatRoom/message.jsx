/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "moment/locale/ko";
import moment from "moment";
import styled from "styled-components";
import { Flex, Text, Image } from "../../../elements/index";
import { gray, lightGray2, yellow } from "../../../shared/colors";

import { actionCreators as chatActions } from "../../../redux/modules/chat";

const Message = ({ message, isMine }) => {
  const dispatch = useDispatch();

  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  const isImage = (_message) => {
    return (
      _message.hasOwnProperty("image") && !_message.hasOwnProperty("content")
    );
  };

  const riskWords = ["카카오톡", "카톡", "전화번호"];
  useEffect(() => {
    riskWords.forEach((word) => {
      if (message.content.indexOf(word) !== -1) {
        dispatch(chatActions.setShowRiskPopup(true));
      }
    });
  }, []);

  return (
    <>
      {isMine ? (
        <Flex is_flex justify="flex-end" align="flex-end">
          <Text color={gray} size="14px" margin="0 0 14px 0">
            {timeFromNow(message.timestamp)}
          </Text>
          {isImage(message) ? (
            <Image
              shape="normal"
              src={message.image}
              width="200px"
              margin="10px 20px 10px 20px;"
              borderRadius="10px"
            />
          ) : (
            <ChatBoxByMe>{message.content}</ChatBoxByMe>
          )}
        </Flex>
      ) : (
        <Flex is_flex justify="flex-start" align="flex-end">
          {isImage(message) ? (
            <Image
              shape="normal"
              src={message.image}
              width="200px"
              margin="10px 20px 10px 10px;"
              borderRadius="10px"
            />
          ) : (
            <ChatBoxByNotMe>{message.content}</ChatBoxByNotMe>
          )}
          <Text color={gray} size="14px" margin="0 0 14px 0">
            {timeFromNow(message.timestamp)}
          </Text>
        </Flex>
      )}
    </>
  );
};

const ChatBoxByMe = styled.p`
  max-width: 75%;
  background-color: ${yellow};
  border-radius: 10px 0 10px 10px;
  margin: 8px 20px 8px 10px;
  padding: 15px 18px;
  word-wrap: break-word;
`;

const ChatBoxByNotMe = styled.p`
  max-width: 75%;
  background-color: ${lightGray2};
  border-radius: 0 10px 10px 10px;
  margin: 8px 10px 8px 20px;
  padding: 15px 18px;
  word-wrap: break-word;
`;

export default Message;
