import React from "react";
import styled from "styled-components";

import { Flex } from "../../elements";
import { grayBtnBorder, yellow } from "../../shared/colors";
// import ItemRow from "../../components/itemRow/itemRow";
import ItemRow from "./itemRow";

import { patchJsonAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const Item = ({ item, clickCompleted }) => {
  let status;
  let updateStatus;
  const tradeStatus = item.tradeStatus;
  const tradeType = item.tradeType;
  if (tradeStatus === "BUYING" || tradeStatus === "SELLING") {
    status = "예약중";
    updateStatus = "RESERVING";
  } else if (tradeStatus === "RESERVING" && tradeType === "BUY") {
    status = "구매중";
    updateStatus = "BUYING";
  } else if (tradeStatus === "RESERVING" && tradeType === "SELL") {
    status = "판매중";
    updateStatus = "SELLING";
  }

  const handleUpdate = (updateType) => {
    patchJsonAction(`items/${item.itemId}/trade-status`, {
      tradeStatus: updateType,
    });
  };

  return (
    <>
      <ItemRow item={item} isBtn />
      {item.tradeStatus !== "COMPLETE" && (
        <Flex justify="space-between">
          <StatusBtn
            onClick={() => {
              handleUpdate(updateStatus);
            }}
          >
            {status}으로 변경
          </StatusBtn>
          <StatusBtn
            onClick={() => {
              handleUpdate("COMPLETE");
              clickCompleted();
            }}
          >
            거래완료로 변경
          </StatusBtn>
        </Flex>
      )}
    </>
  );
};

const StatusBtn = styled.button`
  width: 48%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid ${grayBtnBorder};
  font-weight: bold;
  font-size: 14px;
  box-sizing: border-box;

  &:hover {
    padding: 13px;
    background-color: ${yellow};
    border: none;
  }
`;

export default Item;
