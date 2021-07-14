import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./itemList.module.css";
import Item from "../item/item";

// 지금은 목업 데이터에서 가져오지만, 나중에는 GET으로 받아오기
import { items } from "../../shared/JsonDataItem";

// import { actionCreators as itemActions } from "../../redux/modules/item";

const ItemList = (props) => {
  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.item.list);
  const isFiltering = useSelector((state) => state.header.click_filtering);

  // useEffect(() => {
  //   dispatch(itemActions.getItemAciton());
  // }, []);

  return (
    <ItemListBox
      className={isFiltering ? styles.filtering : styles.nonFiltering}
    >
      {items.map((item) => (
        <Item key={item.id} id={item.id} item={item} />
      ))}
    </ItemListBox>
  );
};

const ItemListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-auto-rows: 300px;
  padding: 10px;
`;

export default ItemList;
