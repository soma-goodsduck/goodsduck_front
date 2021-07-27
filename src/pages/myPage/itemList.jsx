import React, { useEffect, useState } from "react";

import styled from "styled-components";
import styles from "./mypage.module.css";

import Item from "./item";
import { getData } from "../../shared/axios";
import LoginPopUp from "../../elements/loginPopUp";

const ItemList = (props) => {
  const [isSelling, setIsSelling] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const clickSelling = () => {
    setIsSelling(true);
    setIsBuying(false);
    setIsCompleted(false);
  };

  const clickBuying = () => {
    setIsSelling(false);
    setIsBuying(true);
    setIsCompleted(false);
  };

  const clickCompleted = () => {
    setIsSelling(false);
    setIsBuying(false);
    setIsCompleted(true);
  };

  // 해당 아이템 데이터 받아오기
  const [items, setItems] = useState(null);
  let tradeStatus;
  if (isBuying) {
    tradeStatus = "BUYING";
  } else if (isSelling) {
    tradeStatus = "SELLING";
  } else if (isCompleted) {
    tradeStatus = "COMPLETE";
  }

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getItems = getData(`users/items?tradeStatus=${tradeStatus}`);
    getItems.then((result) => {
      console.log(result);
      if (result === "login") {
        setShowPopup(true);
      } else {
        setItems(result);
      }
    });
  }, [tradeStatus]);

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <ItemListBox>
          <FilteringBox>
            <Filtering
              className={isSelling ? styles.isClicked : styles.isNotClicked}
              onClick={() => {
                clickSelling();
              }}
            >
              판매중
            </Filtering>
            <Filtering
              className={isBuying ? styles.isClicked : styles.isNotClicked}
              onClick={() => {
                clickBuying();
              }}
            >
              구매중
            </Filtering>
            <Filtering
              className={isCompleted ? styles.isClicked : styles.isNotClicked}
              onClick={() => {
                clickCompleted();
              }}
            >
              거래완료
            </Filtering>
          </FilteringBox>
          <Line />
          {items !== null && (
            <div>
              {items.map((item) => (
                <Item
                  item={item}
                  key={item.itemId}
                  clickCompleted={clickCompleted}
                />
              ))}
            </div>
          )}
        </ItemListBox>
      )}
    </>
  );
};

const ItemListBox = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
`;

const FilteringBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  margin-top: 20px;
`;

const Filtering = styled.button`
  margin-right: 15px;
`;

const Line = styled.div`
  height: 3px;
  background-color: #dddddd;
  border-radius: 2px;
  margin: 0 auto;
`;

export default ItemList;
