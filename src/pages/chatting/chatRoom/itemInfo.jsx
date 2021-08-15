import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { firebaseDatabase } from "../../../shared/firebase";

import { Image, Text } from "../../../elements";
import { grayBorder } from "../../../shared/colors";
import { numberWithCommas } from "../../../shared/functions";

import { history } from "../../../redux/configureStore";

const ItemInfo = ({ id }) => {
  // chatRoomId
  const href = window.location.href.split("/");
  const chatRoomId = href[href.length - 1];

  const [item, setItem] = useState({});

  useEffect(() => {
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
  }, []);

  return (
    <>
      {item && (
        <ItemBox
          onClick={() => {
            history.push(`/item/${id}`);
          }}
        >
          <Image
            shape="rectangle"
            src={item.image}
            size="70px"
            borderRadius="5px"
          />
          <ItemRowBox>
            <div>
              <Text is_long margin="5px 0">
                {item.name}
              </Text>
              <Text bold size="18px">
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
  width: 65%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
`;

export default ItemInfo;
