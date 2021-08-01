/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from "react";
import "moment/locale/ko";
import moment from "moment";
import styled from "styled-components";
import { Flex, Text, Image } from "../../../elements/index";

import { getInfo } from "../../../shared/axios";
import { gray, lightGray2, yellow } from "../../../shared/colors";

const Message = ({ message }) => {
  const [isMessageMine, setIsMessageMine] = useState(false);
  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  const isImage = (_message) => {
    return (
      _message.hasOwnProperty("image") && !_message.hasOwnProperty("content")
    );
  };

  useEffect(() => {
    const getUserId = getInfo("/users/look-up-id");
    getUserId.then((result) => {
      if (result.userId === message.user.id) {
        setIsMessageMine(true);
      } else {
        setIsMessageMine(false);
      }
    });
  });

  return (
    <>
      {isMessageMine ? (
        <Flex is_flex justify="flex-end" align="flex-end">
          <Text color={gray} size="14px" margin="0 0 14px 0">
            {timeFromNow(message.timestamp)}
          </Text>
          {isImage(message) ? (
            <Image
              shape="normal"
              src={message.image}
              width="200px"
              margin="10px 20px 10px 10px;"
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
