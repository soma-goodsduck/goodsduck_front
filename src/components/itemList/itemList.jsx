/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import Item from "../item/item";
import FilteringIdol from "../filtering/idolGroupFiltering";
import DetailFiltering from "../filtering/filtering";
import InfinityScroll from "./infinityScroll";

import { actionCreators as homeActions } from "../../redux/modules/home";

const ItemList = ({ keyword }) => {
  const dispatch = useDispatch();
  const {
    items,
    isLoading,
    hasNext,
    itemNum,
    searchOrderType,
    searchCompleteType,
  } = useSelector((state) => ({
    items: state.home.items,
    isLoading: state.home.isLoading,
    hasNext: state.home.hasNext,
    itemNum: state.home.itemNum,
    searchOrderType: state.home.searchOrderType,
    searchCompleteType: state.home.searchCompleteType,
  }));
  const [isIdolFilter, setIsIdolFilter] = useState(false);
  const [isDetailFilter, setIsDetailFilter] = useState(false);
  const [idolFilter, setIdolFilter] = useState(0);
  const filteringInfo = JSON.parse(localStorage.getItem("filtering"));

  const getFilteringQuery = (num, _filteringInfo) => {
    const idolGroupId = localStorage.getItem("filter_idolGroup");
    let query = `itemId=${num}&idolGroup=${idolGroupId}`;

    if (_filteringInfo.category !== "") {
      query = query.concat(`&category=${_filteringInfo.category}`);
    }
    if (_filteringInfo.gradeStatus !== "") {
      query = query.concat(`&gradeStatus=${_filteringInfo.gradeStatus}`);
    }
    if (_filteringInfo.idolMember !== "") {
      query = query.concat(`&idolMember=${_filteringInfo.idolMember}`);
    }
    if (_filteringInfo.minPrice !== 0) {
      query = query.concat(`&minPrice=${_filteringInfo.minPrice}`);
    }
    if (_filteringInfo.maxPrice !== 0) {
      query = query.concat(`&maxPrice=${_filteringInfo.maxPrice}`);
    }
    if (_filteringInfo.tradeType !== "") {
      query = query.concat(`&tradeType=${_filteringInfo.tradeType}`);
    }

    return query;
  };

  useEffect(() => {
    if (
      localStorage.getItem("filter_idolGroup") &&
      localStorage.getItem("filtering")
    ) {
      setIsIdolFilter(true);
      setIsDetailFilter(true);
    }

    dispatch(homeActions.clearItems());
    if (keyword) {
      dispatch(
        homeActions.getItemsDataBySearch(
          0,
          keyword,
          searchOrderType,
          searchCompleteType,
        ),
      );
    } else if (filteringInfo) {
      const query = getFilteringQuery(0, filteringInfo);
      dispatch(homeActions.getItemsDataByFilter(query));
    } else if (localStorage.getItem("filter_idolGroup")) {
      setIsIdolFilter(true);
      setIsDetailFilter(true);
      dispatch(
        homeActions.getItemsDataByIdol(
          0,
          localStorage.getItem("filter_idolGroup"),
        ),
      );
    } else {
      dispatch(homeActions.getItemsData());
    }
  }, [keyword, searchOrderType, searchCompleteType]);

  const handleCallNext = (_type) => {
    if (_type === "home") {
      dispatch(homeActions.getItemsData(itemNum));
    } else if (_type === "idol") {
      dispatch(
        homeActions.getItemsDataByIdol(
          itemNum,
          localStorage.getItem("filter_idolGroup"),
        ),
      );
    } else if (_type === "keyword") {
      dispatch(
        homeActions.getItemsDataBySearch(
          itemNum,
          keyword,
          searchOrderType,
          searchCompleteType,
        ),
      );
    } else if (_type === "filtering") {
      const query = getFilteringQuery(itemNum, filteringInfo);
      dispatch(homeActions.getItemsDataByFilter(query));
    }
  };

  const handleFiltering = async (id) => {
    setIdolFilter(id);
    setIsIdolFilter(true);
    setIsDetailFilter(true);
    dispatch(homeActions.clearItems());
    dispatch(homeActions.getItemsDataByIdol(0, id));
  };

  return (
    <>
      {!keyword && <FilteringIdol onClick={handleFiltering} />}
      {!keyword && isDetailFilter && <DetailFiltering idolId={idolFilter} />}

      <InfinityScroll
        callNext={(_type) => {
          handleCallNext(_type);
        }}
        hasNext={hasNext}
        loading={isLoading}
        keyword={keyword}
        isIdolFilter={isIdolFilter}
      >
        {items && (
          <ItemListBox>
            {items.map((item) => (
              <Item key={item.itemId} id={item.itemId} item={item} />
            ))}
          </ItemListBox>
        )}
      </InfinityScroll>
    </>
  );
};

const ItemListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 45vw);
  grid-auto-rows: 73vw;
  grid-column-gap: 15px;
  justify-content: center;
  padding: 10px;
  margin-bottom: 80px;

  @media screen and (min-width: 415px) {
    grid-template-columns: repeat(2, 50%);
    grid-auto-rows: 300px;
    grid-column-gap: 0;
  }
`;

export default ItemList;
