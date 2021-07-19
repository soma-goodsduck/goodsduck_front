import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemList.module.css";
import Item from "../item/item";

import { getInfo } from "../../shared/axios";

const ItemList = () => {
  const isFiltering = useSelector((state) => state.header.click_filtering);

  // 해당 아이템 데이터 받아오기
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItemList = getInfo("items");
    getItemList.then((result) => {
      setItems(result);
    });
  }, []);

  if (!items) {
    return null;
  }

  return (
    <ItemListBox
      className={isFiltering ? styles.filtering : styles.nonFiltering}
    >
      {items.map((item) => (
        <Item key={item.name} id={item.itemId} item={item} />
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
