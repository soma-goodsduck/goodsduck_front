import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { firebaseDatabase } from "../../../shared/firebase";

import { Image, Text, Flex } from "../../../elements";
import { black, grayBorder, gray, white } from "../../../shared/colors";
import { numberWithCommas } from "../../../shared/functions";
import { requestPublicData } from "../../../shared/axios";

import { actionCreators as chatActions } from "../../../redux/modules/chat";
import { history } from "../../../redux/configureStore";

const ItemInfo = () => {
  const dispatch = useDispatch();
  const href = window.location.href.split("/");
  const chatRoomId = href[href.length - 1];
  const itemId = href[href.length - 2];

  const [item, setItem] = useState({});
  const [isNotExist, setIsNotExist] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [color, setColor] = useState(black);

  const requestItemData = async () => {
    const result = await requestPublicData(`v1/items/${itemId}/summary`);
    return result;
  };
  const fnEffect = async () => {
    const getItemData = await requestItemData();
    dispatch(chatActions.setItemIsExisted());

    if (getItemData.tradeStatus === "COMPLETE") {
      setIsCompleted(true);
      setColor(gray);
    }

    const chatRoomInfoRef = firebaseDatabase.ref(
      `chatRooms/${itemId}/${chatRoomId}`,
    );
    chatRoomInfoRef
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setItem(snapshot.val().item);
        }
      })
      .catch((error) => {
        if (process.env.REACT_APP_TYPE === "DEV") {
          console.log(error);
        }
        history.push("/error");
      });

    if (getItemData < 0) {
      if (getItemData === -101) {
        dispatch(chatActions.setItemIsNotExisted());
        setIsNotExist(true);
        dispatch(chatActions.setReadyToSendMessage(false));
        setColor(gray);
        return;
      }
      history.push("/error");
    }
  };
  useEffect(fnEffect, []);

  return (
    <>
      {item && (
        <ItemContainer>
          <ItemBox
            onClick={() => {
              history.push(`/item/${itemId}`);
              // LS에 채팅방에 방문한 시각 업데이트
              localStorage.setItem(
                `${chatRoomId}`,
                `${Math.round(new Date().getTime())}`,
              );
            }}
          >
            <Image
              shape="rectangle"
              src={item.imageUrl}
              size="70px"
              borderRadius="5px"
            />
            <ItemRowBox>
              <div>
                <Flex justify="flex-start">
                  {isNotExist && <ItemType color={color}>삭제</ItemType>}
                  {isCompleted && <ItemType color={color}>완료</ItemType>}
                  <Text is_long margin="5px 0" color={color}>
                    {item.name}
                  </Text>
                </Flex>
                <Text bold size="18px" color={color}>
                  {numberWithCommas(Number(item.price))}원
                </Text>
              </div>
            </ItemRowBox>
          </ItemBox>
        </ItemContainer>
      )}
    </>
  );
};

const ItemContainer = styled.div`
  width: 100vw;
  background-color: ${white};
  position: fixed;
  cursor: pointer;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const ItemBox = styled.div`
  margin: 0 20px;
  margin-top: 55px;
  display: flex;
  position: relative;
  border-bottom: 2px solid ${grayBorder};

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const ItemRowBox = styled.div`
  width: 75%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
`;

const ItemType = styled.div`
  width: 40px;
  font-weight: 600;
  margin: 5px 0;
  color: ${(props) => props.color};
`;

export default ItemInfo;
