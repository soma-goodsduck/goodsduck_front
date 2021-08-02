/* eslint-disable consistent-return */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemList.module.css";
import Item from "../item/item";
import FilteringIdol from "../idolFiltering/idolGroupFiltering";

import { getList, getListByIdol } from "../../shared/axios";
import { actionCreators as headerActions } from "../../redux/modules/header";

const ItemList = () => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemNum, setItemNum] = useState(0);
  const [isIdolFilter, setIsIdolFilter] = useState(false);
  const [idolFilter, setIdolFilter] = useState(0);

  const idolItems = useSelector((state) => state.header.items);

  const getItems = (num) => {
    setLoading(true);
    const getItemList = getList("items", num);
    getItemList.then((result) => {
      const newItemData = result.response;
      const newItem = [...items, ...result.response];
      setItems(newItem);
      setHasNext(result.hasNext);
      setLoading(false);
      if (result.hasNext) {
        setItemNum(newItemData[newItemData.length - 1].itemId);
      }
    });
  };

  const getItemsWithIdolFilter = (num, idolId) => {
    setLoading(true);
    const getItemList = getListByIdol("items/filter", num, idolId);
    getItemList.then((result) => {
      const newItemData = result.response;
      const newItem = [...idolItems, ...result.response];
      setItems(newItem);
      setHasNext(result.hasNext);
      setLoading(false);
      if (result.hasNext) {
        setItemNum(newItemData[newItemData.length - 1].itemId);
      }
    });
  };

  const handleFiltering = async (id) => {
    setIdolFilter(id);
    setIsIdolFilter(true);
    dispatch(headerActions.setItems([]));
    getItemsWithIdolFilter(0, id);
  };

  useEffect(() => {
    getItems(itemNum);
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

      if (isIdolFilter) {
        getItemsWithIdolFilter(itemNum, idolFilter);
      } else {
        getItems(itemNum);
      }
    }
  }, [itemNum]);

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
  }, [hasNext, itemNum]);

  return (
    <>
      <FilteringIdol onClick={handleFiltering} />

      {items && (
        <ItemListBox>
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
  margin-bottom: 80px;
`;

export default ItemList;
