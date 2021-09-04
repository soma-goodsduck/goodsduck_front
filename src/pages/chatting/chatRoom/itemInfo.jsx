import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { firebaseDatabase } from "../../../shared/firebase";

import { Image, Text, Flex } from "../../../elements";
import { black, grayBorder, gray } from "../../../shared/colors";
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
  const [color, setColor] = useState(black);

  useEffect(() => {
    const getItemInfo = requestPublicData(`v1/items/${itemId}/summary`);
    getItemInfo
      .then((result) => {
        setItem(result);
        dispatch(chatActions.setItemIsExisted());
        console.log(result);
      })
      .catch(() => {
        dispatch(chatActions.setItemIsNotExisted());
        setIsNotExist(true);
        setColor(gray);

        const chatRoomInfoRef = firebaseDatabase.ref(`chatRooms/${chatRoomId}`);
        chatRoomInfoRef
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              setItem(snapshot.val().item);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }, []);

  return (
    <>
      {item && (
        <ItemBox
          onClick={() => {
            history.push(`/item/${itemId}`);
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
      )}
    </>
  );
};

const ItemBox = styled.div`
  margin: 0 20px;
  margin-top: 70px;
  display: flex;
  position: relative;
  border-bottom: 2px solid ${grayBorder};
  cursor: pointer;
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
