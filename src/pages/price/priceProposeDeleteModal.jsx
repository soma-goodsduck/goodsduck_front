import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import ItemRow from "../../components/itemRow/itemRow";
import { Text } from "../../elements";
import { numberWithCommas } from "../../shared/functions";

import {
  requestPublicData,
  requestAuthData,
  deleteAction,
} from "../../shared/axios";
import { actionCreators as chatActions } from "../../redux/modules/chat";
import { actionCreators as itemActions } from "../../redux/modules/item";
import { actionCreators as userActions } from "../../redux/modules/user";

import { history } from "../../redux/configureStore";

const PriceProposeDeleteModal = ({ priceId, proposePrice, _onClick, type }) => {
  const dispatch = useDispatch();

  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  // 해당 아이템 데이터 받아오기
  const [itemData, setItemData] = useState(null);
  const reqItemSummary = async () => {
    const result = await requestPublicData(`v1/items/${itemId}/summary`);
    return result;
  };
  const fnEffect = async () => {
    const getItemSummary = await reqItemSummary();
    if (getItemSummary < 0) {
      history.push("/error");
      return;
    }
    setItemData(getItemSummary);
  };
  useEffect(fnEffect, []);

  // 가격제시 취소
  const reqDeletePricePropose = async () => {
    const result = await deleteAction(
      `v1/items/${itemId}/price-propose/${priceId}`,
    );
    return result;
  };
  const reqItemDetail = async () => {
    const result = await requestPublicData(`v1/items/${itemId}`);
    return result;
  };
  const reqUserData = async () => {
    const result = await requestAuthData("v1/users/look-up-id");
    return result;
  };
  const handleDelete = async () => {
    const deletePricePropose = await reqDeletePricePropose();

    if (deletePricePropose < 0) {
      history.push("/error");
      return;
    }

    if (type === "beforeChat") {
      const getItemDetail = await reqItemDetail();
      const getUserData = await reqUserData();

      if (getItemDetail < 0 || getUserData < 0) {
        history.push("/error");
        return;
      }

      const user = {
        id: getUserData.userId,
        nickName: getUserData.nickName,
        profileImg: getUserData.imageUrl,
        bcryptId: getUserData.bcryptId,
      };

      dispatch(chatActions.addChatRoomAciton(getItemDetail, user));
    } else {
      _onClick();
      dispatch(itemActions.deletePriceProposeAction(priceId));
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("가격제시를 취소했습니다."));
    }
  };

  return (
    <Screen>
      <PriceProposeUpdateBox>
        <Info>
          <ExitBtn onClick={_onClick} />
          {itemData && <ItemRow item={itemData} />}
          {type === "beforeChat" ? (
            <div>
              <Text size="17px" margin="5px 0" bold is_center>
                기존 제시 금액 : {numberWithCommas(proposePrice)}원
              </Text>
              <Text size="17px" margin="10px 0 0 0" bold is_center color="red">
                먼저 취소하신 후, 즉시 거래하시겠습니까?
              </Text>
            </div>
          ) : (
            <Text size="20px" margin="20px 0 0 0" bold is_center>
              기존 제시 금액 : {numberWithCommas(proposePrice)}원
            </Text>
          )}
        </Info>

        <ProposeDeleteBtn
          onClick={() => {
            handleDelete();
          }}
        >
          {type === "beforeChat"
            ? "가격 제시 취소 후 즉시 거래"
            : "가격 제시 취소"}
        </ProposeDeleteBtn>
      </PriceProposeUpdateBox>
    </Screen>
  );
};

const Screen = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  color: #222222;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const PriceProposeUpdateBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 30%;
`;

const Info = styled.div`
  position: relative;
  height: 240px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
`;

const ProposeDeleteBtn = styled.button`
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;

  &:hover {
    color: #e33e3e;
  }
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  background-image: url("https://goods-duck.com/icon/icon_delete.svg");
  background-size: cover;
  margin-bottom: 10px;
  cursor: pointer;
`;

export default PriceProposeDeleteModal;
