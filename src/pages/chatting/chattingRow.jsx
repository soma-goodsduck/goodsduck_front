import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Text, Image } from "../../elements";
import { gray, grayBorder, green, white } from "../../shared/colors";

const ChattingRow = (props) => {
  // 반응형
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);
  const styleProps = { isMobile };

  return (
    <>
      <ChattingRowBox>
        <UserBox>
          <Image
            shape="circle"
            src="https://i.pinimg.com/originals/a8/7b/5d/a87b5da556f38ab9c7f7e143fbcb8201.jpg"
            // src={itemData.itemOwner.userImage}
            margin="0 10px 0 0"
            size="55px"
          />
          <InfoBox {...styleProps}>
            <Text medium>마크크크</Text>
            <Text color={gray} size="15px">
              7월 4일
            </Text>
            <Text is_long color={gray} size="15px">
              네! ^^asdfasdfasdfasdfasfsfafasfas
            </Text>
            <Badge>1</Badge>
          </InfoBox>
        </UserBox>
        <Image
          shape="rectangle"
          src="https://pbs.twimg.com/profile_images/1236934708405006337/DnWgP_0M_400x400.jpg"
          size="55px"
          borderRadius="5px"
        />
      </ChattingRowBox>
      <Line />
    </>
  );
};

const ChattingRowBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
`;

const InfoBox = styled.div`
  ${(props) => (props.isMobile ? "width: 200px;" : "width: 250px;")};
  display: grid;
  ${(props) =>
    props.isMobile
      ? "grid-template-columns: 145px 70px;"
      : "grid-template-columns: 185px 70px;"};
  gap: 10px;
`;

const Badge = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${green};
  color: ${white};
  font-size: 14px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 23px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
`;

export default ChattingRow;
