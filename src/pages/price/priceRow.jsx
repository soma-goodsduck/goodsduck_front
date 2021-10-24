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
  const reqAcceptPricePropose = async () => {
    const result = await postAction(
      `v1/items/${itemId}/price-propose/${proposeId}/accept`,
    );
    return result;
  };
  const reqUserData = async () => {
    const result = await requestPublicData("v1/users/look-up-id");
    return result;
  };
  const handleAccept = async () => {
    const acceptPricePropose = await reqAcceptPricePropose();

    if (acceptPricePropose < 0) {
      history.push("/error");
      return;
    }

    if (acceptPricePropose.success === true) {
      const getUserId = await reqUserData();

      const user = {
        id: getUserId.userId,
        nickName: getUserId.nickName,
        profileImg: getUserId.imageUrl,
        bcryptId: getUserId.bcryptId,
      };
      dispatch(chatActions.addChatRoomAtPropseAciton(item, user));
    }
  };

  // 가격제안 거절
  const reqRefusePricePropose = async () => {
    const result = await postAction(
      `v1/items/${itemId}/price-propose/${proposeId}/refuse`,
    );
    return result;
  };
  const handleRefuse = async () => {
    const refusePricePropose = await reqRefusePricePropose();

    if (refusePricePropose < 0) {
      history.push("/error");
      return;
    }

    if (refusePricePropose.success === true) {
      history.go(0);
    }
  };

  return (
    <Flex justify="space-between" padding="20px 0">
      <Flex is_flex>
        <Image
          shape="circle"
          src={
            item.proposer.imageUrl ||
            "https://goods-duck.com/sample_goodsduck.png"
          }
          margin="0 10px 0 0"
          size="60px"
        />
        <Flex is_col align="flex-start">
          <Flex>
            <Image
              shape="circle"
              size="15px"
              margin="0 5px 0 0"
              src={`https://goods-duck.com/icon/icon_level${item.proposer.level}.png`}
            />
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
