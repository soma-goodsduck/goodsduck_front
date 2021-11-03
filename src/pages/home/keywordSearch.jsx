/* eslint-disable react/destructuring-assignment */
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import { Grid, FilteringModal, Flex, Icon, Text } from "../../elements";
import Nav from "../../components/nav/nav";
import Header from "../../components/haeder/headerKeyword";
import ItemList from "../../components/itemList/itemList";
import { grayBtnText } from "../../shared/colors";
import { actionCreators as homeActions } from "../../redux/modules/home";

const KeywordSearch = (props) => {
  const dispatch = useDispatch();

  const keyword = props.match.params.name;
  const [showCompletedItem, setShowCompletedItem] = useState(true);

  const filteringShowCompletedItem = () => {
    setShowCompletedItem(!showCompletedItem);
    dispatch(homeActions.setSearchCompleteType(!showCompletedItem));
  };

  const [showFilteringPopup, setShowFilteringPopup] = useState(false);
  const clickFiltering = () => {
    setShowFilteringPopup(true);
  };
  const hideFileringPopup = () => {
    setShowFilteringPopup(false);
  };

  // 필터링 (최신순, 낮은 가격순, 높은 가격순)
  const [filtering, setFiltering] = useState("최신순");
  const sortingNew = () => {
    setFiltering("최신순");
    dispatch(homeActions.setSearchOrderType("latest"));
    hideFileringPopup();
  };

  const sortingLowPrice = () => {
    setFiltering("낮은 가격순");
    dispatch(homeActions.setSearchOrderType("low_price"));
    hideFileringPopup();
  };

  const sortingHighPrice = () => {
    setFiltering("높은 가격순");
    dispatch(homeActions.setSearchOrderType("high_price"));
    hideFileringPopup();
  };

  return (
    <>
      {showFilteringPopup && (
        <FilteringModal
          clickExit={hideFileringPopup}
          sortingNew={sortingNew}
          sortingLowPrice={sortingLowPrice}
          sortingHighPrice={sortingHighPrice}
        />
      )}
      <Grid>
        <Header keyword={keyword} />
        <FilteringBox>
          <Filtering onClick={() => clickFiltering()}>
            <Dropdown />
            <Text color={grayBtnText}>{filtering}</Text>
          </Filtering>
          <Flex
            _onClick={() => {
              filteringShowCompletedItem();
            }}
          >
            {showCompletedItem && (
              <Icon
                width="16px"
                margin="0 7px 0 0"
                src="https://goods-duck.com/icon/icon_uncheckbox.svg"
              />
            )}
            {!showCompletedItem && (
              <Icon
                width="16px"
                margin="0 7px 0 0"
                src="https://goods-duck.com/icon/icon_checkbox.svg"
              />
            )}
            <CompletedItemBtn>거래완료 안보기</CompletedItemBtn>
          </Flex>
        </FilteringBox>
        <ItemListBox>
          <ItemList keyword={keyword} />
        </ItemListBox>
        <Nav />
      </Grid>
    </>
  );
};

const ItemListBox = styled.div`
  margin-top: 10px;
`;

const FilteringBox = styled.div`
  margin-top: 80px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
`;

const Filtering = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Dropdown = styled.div`
  width: 17px;
  height: 10px;
  background-image: url("https://goods-duck.com/icon/icon_dropmenu.svg");
  background-size: cover;
  object-fit: cover;
  margin-right: 5px;
`;

const CompletedItemBtn = styled.button`
  color: ${grayBtnText};
`;

export default KeywordSearch;
