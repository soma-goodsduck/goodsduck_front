/* eslint-disable consistent-return */
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemList.module.css";
import Item from "../item/item";

import { getList } from "../../shared/axios";

const ItemList = () => {
  const isFiltering = useSelector((state) => state.header.click_filtering);

  // 해당 아이템 데이터 받아오기
  const [items, setItems] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(0);

  const getItems = (num) => {
    setLoading(true);
    const getItemList = getList("items", num);
    getItemList.then((result) => {
      const newItem = [...items, ...result.response.content];
      setItems(newItem);
      setHasNext(result.hasNext);
      setLoading(false);
      setPageNum(pageNum + 1);
    });
  };

  useEffect(() => {
    getItems(pageNum);
  }, []);

  // 무한 스크롤
  const infiniteScroll = useCallback(() => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight === scrollTop + clientHeight) {
      if (loading) {
        return;
      }
      getItems(pageNum);
    }
  }, [pageNum]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (hasNext) {
      window.addEventListener("scroll", infiniteScroll, true);
    } else {
      window.removeEventListener("scroll", infiniteScroll, true);
    }

    return () => window.removeEventListener("scroll", infiniteScroll, true);
  }, [hasNext, pageNum]);

  return (
    <>
      {items && (
        <ItemListBox
          className={isFiltering ? styles.filtering : styles.nonFiltering}
        >
          {items.map((item) => (
            <Item key={item.itemId} id={item.itemId} item={item} />
          ))}
        </ItemListBox>
      )}
    </>
  );
};

const ItemListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-auto-rows: 300px;
  padding: 10px;
`;

export default ItemList;
