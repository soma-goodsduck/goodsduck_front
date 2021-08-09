import React from "react";
import { useDispatch } from "react-redux";

import styles from "./pricePropose.module.css";

import { Flex, Image, Text } from "../../elements";
import { timeForToday, numberWithCommas } from "../../shared/functions";

import { actionCreators as chatActions } from "../../redux/modules/chat";
import { requestPublicData, postAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const PriceRow = ({ item }) => {
  const dispatch = useDispatch();

  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);
  const proposeId = item.priceProposeId;

  // 가격제안 수락
  const handleAccept = () => {
    const acceptPricePropose = postAction(
      `v1/items/${itemId}/price-propose/${proposeId}/accept`,
    );
    acceptPricePropose.then((result) => {
      if (result.success === true) {
        const getUserId = requestPublicData("v1/users/look-up-id");
        getUserId.then((userResult) => {
          const user = {
            id: userResult.userId,
            nickName: userResult.nickName,
            profileImg: userResult.imageUrl,
          };
          dispatch(chatActions.addChatRoomAtPropseAciton(item, user));
        });
      }
    });
  };
  // 가격제안 거절
  const handleRefuse = () => {
    const refusePricePropose = postAction(
      `v1/items/${itemId}/price-propose/${proposeId}/refuse`,
    );
    refusePricePropose.then((result) => {
      if (result.success === true) {
        history.go(0);
      }
    });
  };

  return (
    <Flex justify="space-between" padding="20px 0">
      <Flex is_flex>
        <Image
          shape="circle"
          src={
            item.proposer.imageUrl ||
            "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
          }
          margin="0 10px 0 0"
          size="60px"
        />
        <Flex is_col align="flex-start">
          <Flex>
            <Image shape="circle" size="15px" margin="0 5px 0 0" />
            <Text is_long>{item.proposer.nickName}</Text>
          </Flex>
          <Text size="20px" bold margin="5px 0">
            {numberWithCommas(item.proposedPrice)}원
          </Text>
          <Text size="16px" color="#bbbbbb">
            {timeForToday(item.createdAt)}
          </Text>
        </Flex>
      </Flex>
      <Flex is_flex>
        <button
          type="button"
          className={styles.acceptBtn}
          onClick={() => {
            handleAccept();
          }}
        >
          수락
        </button>
        <button
          type="button"
          className={styles.rejectBtn}
          onClick={() => {
            handleRefuse();
          }}
        >
          거절
        </button>
      </Flex>
    </Flex>
  );
};

export default PriceRow;
