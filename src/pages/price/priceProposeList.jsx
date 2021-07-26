import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import ItemRow from "../../components/itemRow/itemRow";
import PriceRow from "./priceRow";
import { Text, PopUp } from "../../elements";

import { actionCreators as userActions } from "../../redux/modules/user";

import { getInfo, getData } from "../../shared/axios";
import { grayBorder, grayBtnText } from "../../shared/colors";
import PriceFilteringPopup from "./priceFilteringPopup";

const PriceProposeList = ({ history }) => {
  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  // 아이템 데이터 및 가격 제안 리스트
  const dispatch = useDispatch();
  const [itemData, setItemData] = useState(null);
  const [priceList, setPriceLists] = useState([]);
  const showPopup = useSelector((state) => state.user.show_popup);

  useEffect(() => {
    const getItemData = getInfo(`items/${itemId}`);
    getItemData.then((result) => {
      setItemData(result);
    });

    const getPriceList = getData(`items/${itemId}/price-propose`);
    getPriceList.then((result) => {
      const newResult = result.filter((x) => x.status === "SUGGESTED");
      setPriceLists(newResult);

      if (result === "login") {
        dispatch(userActions.showPopupAction());
      }
    });
  }, []);

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
    const sortData = priceList.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    setPriceLists(sortData);
    setFiltering("최신순");
    hideFileringPopup();
  };

  const sortingLowPrice = () => {
    const sortData = priceList.sort((a, b) => {
      return a.proposedPrice - b.proposedPrice;
    });

    setPriceLists(sortData);
    setFiltering("낮은 가격순");
    hideFileringPopup();
  };

  const sortingHighPrice = () => {
    const sortData = priceList.sort((a, b) => {
      return b.proposedPrice - a.proposedPrice;
    });

    setPriceLists(sortData);
    setFiltering("높은 가격순");
    hideFileringPopup();
  };

  return (
    <>
      {showPopup && (
        <PopUp
          is_bold
          width="250px"
          height="120px"
          text1="👉 로그인 하러가기"
          text2="그냥 둘러볼게요"
          _onClick={() => {
            history.replace("/");
          }}
        />
      )}
      {showFilteringPopup && (
        <PriceFilteringPopup
          clickExit={hideFileringPopup}
          sortingNew={sortingNew}
          sortingLowPrice={sortingLowPrice}
          sortingHighPrice={sortingHighPrice}
        />
      )}
      <PriceProposeBox>
        <HeaderInfo text="가격 제안 보기" />
        {itemData !== null && <ItemRow item={itemData} />}
        <Line />
        <Filtering onClick={() => clickFiltering()}>
          <Text color={grayBtnText}>{filtering}</Text>
          <Dropdown />
        </Filtering>
        {priceList !== [] && (
          <div>
            {priceList.map((priceItem) => (
              <PriceRow key={priceItem.priceProposeId} item={priceItem} />
            ))}
          </div>
        )}
      </PriceProposeBox>
    </>
  );
};

const PriceProposeBox = styled.div`
  margin-top: 65px;
  padding: 0 16px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
  margin: 10px 0;
`;

const Filtering = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  width: 17px;
  height: 10px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_dropmenu.svg");
  background-size: cover;
  object-fit: cover;
  margin-left: 5px;
`;

export default PriceProposeList;
