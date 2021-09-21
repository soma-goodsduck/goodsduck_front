import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./myProfilePage.module.css";

import ItemRow from "./itemRow";
import { actionCreators as userAction } from "../../redux/modules/user";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const [isSelling, setIsSelling] = useState(true);
  const [isBuying, setIsBuying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const _items = useSelector((state) => state.user.items);

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

  useEffect(() => {
    if (isBuying) {
      dispatch(userAction.setFilteringType("BUYING"));
    } else if (isSelling) {
      dispatch(userAction.setFilteringType("SELLING"));
    } else if (isCompleted) {
      dispatch(userAction.setFilteringType("COMPLETE"));
    }
  }, [isBuying, isSelling, isCompleted]);

  return (
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
      {_items !== [] ? (
        <div>
          {_items.map((item) => (
            <ItemRow item={item} key={item.itemId} />
          ))}
        </div>
      ) : (
        <div>
          {items.map((item) => (
            <ItemRow item={item} key={item.itemId} />
          ))}
        </div>
      )}
    </ItemListBox>
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
