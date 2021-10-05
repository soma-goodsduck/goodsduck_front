import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./pricePropose.module.css";

import ItemRow from "../../components/itemRow/itemRow";
import { Input, Flex, LoginPopUp } from "../../elements";
import { blackBtn } from "../../shared/colors";

import { actionCreators as itemActions } from "../../redux/modules/item";
import { actionCreators as userActions } from "../../redux/modules/user";
import { requestPublicData, postAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const PriceProposeModal = ({ _onClick }) => {
  const dispatch = useDispatch();

  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  // 해당 아이템 데이터 받아오기
  const [itemData, setItemData] = useState(null);
  const requestItemData = async () => {
    const result = await requestPublicData(`v1/items/${itemId}/summary`);
    return result;
  };
  const fnEffect = async () => {
    const getItemDetail = await requestItemData();
    if (getItemDetail < 0) {
      history.push("/error");
      return;
    }
    setItemData(getItemDetail);
  };
  useEffect(fnEffect, []);

  // 가격 제안 요청
  const [price, setPrice] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const reqPricePropose = async () => {
    const result = await postAction(`v1/items/${itemId}/price-propose`, {
      price,
    });
    return result;
  };
  const handleClcik = async () => {
    if (price <= 0) {
      dispatch(userActions.setShowNotification(true));
      dispatch(
        userActions.setNotificationBody(
          "최소한 0원 이상의 금액을 입력해야 합니다.",
        ),
      );
      return;
    }

    if (price % 500 !== 0) {
      dispatch(userActions.setShowNotification(true));
      dispatch(
        userActions.setNotificationBody(
          "가격제시 금액은 500원 단위로만 가능합니다.",
        ),
      );
      return;
    }

    if (itemData.tradeType === "구매") {
      if (price < itemData.price) {
        dispatch(userActions.setShowNotification(true));
        dispatch(
          userActions.setNotificationBody(
            "굿즈의 가격보다 더 높은 가격만 제시할 수 있습니다.",
          ),
        );
        return;
      }
    } else if (itemData.tradeType === "판매") {
      if (price > itemData.price) {
        dispatch(userActions.setShowNotification(true));
        dispatch(
          userActions.setNotificationBody(
            "굿즈의 가격보다 더 낮은 가격만 제시할 수 있습니다.",
          ),
        );
        return;
      }
    }

    const postPrice = await reqPricePropose();

    if (postPrice < 0) {
      if (postPrice === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    const pricePropose = {
      createdAt: postPrice.response.createdAt,
      proposedPrice: postPrice.response.proposedPrice,
      priceProposeId: postPrice.response.priceProposeId,
      type: "REDUX",
    };
    _onClick();
    dispatch(itemActions.addPriceProposeAction(pricePropose));
    dispatch(userActions.setShowNotification(true));
    dispatch(userActions.setNotificationBody("가격제시를 했습니다."));
  };

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <Screen>
          <PriceProposeBox>
            <Info>
              <ExitBtn onClick={_onClick} />
              {itemData && <ItemRow item={itemData} />}
              <Flex is_felxm margin="25px">
                <div className={styles.wonSign}>₩</div>
                <div className={styles.priceInput}>
                  <Input
                    type="number"
                    borderRadius="5px"
                    value={price}
                    placeholder="금액을 적어주세요"
                    _onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    size="18px"
                    bold
                    center
                  />
                </div>
              </Flex>
            </Info>
            <ProposeBtn
              onClick={() => {
                handleClcik();
              }}
            >
              가격 제시하기
            </ProposeBtn>
          </PriceProposeBox>
        </Screen>
      )}
    </>
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

const PriceProposeBox = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 30%;
`;

const Info = styled.div`
  position: relative;
  height: 250px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
`;

const ProposeBtn = styled.button`
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  color: ${blackBtn};
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_delete.svg");
  background-size: cover;
  margin-bottom: 10px;
  cursor: pointer;
`;

export default PriceProposeModal;
