import React, { useEffect, useState } from "react";
import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import ItemRow from "../../components/itemRow/itemRow";
import PriceRow from "./priceRow";
import { Text, PopUp, FilteringModal, DoubleCheckModal2 } from "../../elements";

import { requestPublicData, requestAuthData } from "../../shared/axios";
import { grayBorder, grayBtnText } from "../../shared/colors";

const PriceProposeListPage = ({ history }) => {
  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  // 아이템 데이터 및 가격 제안 리스트
  const [itemData, setItemData] = useState(null);
  const [priceList, setPriceLists] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showNoItem, setShowNoItem] = useState(false);

  const requestItemData = async () => {
    const result = await requestPublicData(`v1/items/${itemId}/summary`);
    return result;
  };
  const requestPriceList = async () => {
    const result = await requestAuthData(`v1/items/${itemId}/price-propose`);
    return result;
  };
  const fnEffect = async () => {
    const getItemSummary = await requestItemData();
    const getPriceList = await requestPriceList();

    if (getItemSummary < 0 || getPriceList < 0) {
      if (getItemSummary === -101) {
        setShowNoItem(true);
        return;
      }
      if (getPriceList === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    setItemData(getItemSummary);

    const newPriceList = getPriceList.filter((x) => x.status === "SUGGESTED");
    setPriceLists(newPriceList);
  };
  useEffect(fnEffect, []);

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
      return new Date(b.createdAt) - new Date(a.createdAt);
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
      {showNoItem && (
        <DoubleCheckModal2
          text="삭제된 아이템입니다"
          onOkClick={() => {
            history.goBack();
          }}
        />
      )}
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
        <FilteringModal
          clickExit={hideFileringPopup}
          sortingNew={sortingNew}
          sortingLowPrice={sortingLowPrice}
          sortingHighPrice={sortingHighPrice}
        />
      )}
      {!showPopup && (
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
      )}
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

export default PriceProposeListPage;
