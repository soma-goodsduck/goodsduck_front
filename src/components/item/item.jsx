import React from "react";
import styled from "styled-components";
import { Image, Grid, Flex, Text } from "../../elements";

const Item = (props) => {
  return (
    <Grid is_flex_col>
      <Flex>
        <Image
          shape="rectangle"
          src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/gd.jpg"
          size={window.screen.width > 400 ? "185px" : "43vw"}
          borderRadius="10px"
        />
      </Flex>
      <Flex justify="flex-start" padding="10px 7px">
        <Text
          size={window.screen.width > 400 ? "16px" : "4vw"}
          color="#299bff"
          bold
          margin="0 5px 0 0"
        >
          구매
        </Text>
        <Title>
          <Text size={window.screen.width > 400 ? "16px" : "4vw"} is_long>
            GD 포토카드 팔아요
          </Text>
        </Title>
      </Flex>
      <Flex justify="flex-start" padding=" 0 7px">
        <Text size={window.screen.width > 400 ? "18px" : "5vw"} bold>
          20,000원
        </Text>
      </Flex>
      <Flex justify="space-between" padding="5px 10px 20px 5px">
        <Flex>
          <Image
            shape="circle"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/gd.jpg"
            size={window.screen.width > 400 ? "24px" : "7vw"}
            margin="0 7px 0 0"
          />
          <UserName>
            <Text is_long size={window.screen.width > 400 ? "18px" : "4.5vw"}>
              GDDDD
            </Text>
          </UserName>
        </Flex>
        <Text color="#bbbbbb" size={window.screen.width > 400 ? "16px" : "4vw"}>
          47분전
        </Text>
      </Flex>
    </Grid>
  );
};

const Title = styled.div`
  width: 80%;
`;

const UserName = styled.div`
  width: 65px;
`;

export default Item;
