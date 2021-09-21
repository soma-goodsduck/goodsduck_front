/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemDetail.module.css";

import PriceProposeModal from "../price/priceProposeModal";
import PriceProposeDeleteModal from "../price/priceProposeDeleteModal";
import { Flex, Icon, LoginPopUp } from "../../elements/index";

import { requestAuthData } from "../../shared/axios";
import { numberWithCommas } from "../../shared/functions";
import { actionCreators as chatActions } from "../../redux/modules/chat";
import { history } from "../../redux/configureStore";

const ItemNav = ({ item, id, isOwner, tradeType }) => {
  const dispatch = useDispatch();
  const { priceProposeType, priceProposeList } = useSelector((state) => ({
    priceProposeType: state.item.type,
    priceProposeList: state.item.priceProposeList,
  }));
  const lastPricePropose = priceProposeList[priceProposeList.length - 1];

  const [isNoRefresh, setIsNoRefresh] = useState(false);
  useEffect(() => {
    if (lastPricePropose?.type === "REDUX") {
      setIsNoRefresh(true);
    }
  });
  const [showPricePopup, setShowPricePopup] = useState(null);
  const hidePricePopup = () => {
    setShowPricePopup(false);
  };
  const [showPriceDeletePopup, setShowPriceDeletePopup] = useState(null);
  const hidePriceDeletePopup = () => {
    setShowPriceDeletePopup(false);
  };
  const [showCheckPriceDeletePopup, setShowCheckPriceDeletePopup] =
    useState(null);
  const hideCheckPriceDeletePopup = () => {
    setShowCheckPriceDeletePopup(false);
  };

  const [isHighPrice, setIsHighPrice] = useState(false);
  useEffect(() => {
    if (item.price > 999999) {
      setIsHighPrice(true);
    }
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const reqUserData = async () => {
    const result = await requestAuthData("v1/users/look-up-id");
    return result;
  };
  const clickChatBtn = async () => {
    const getUserData = await reqUserData();

    if (getUserData < 0) {
      if (getUserData === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    if (item.myPricePropose !== null) {
      setShowCheckPriceDeletePopup(true);
      return;
    }

    const user = {
      id: getUserData.userId,
      nickName: getUserData.nickName,
      profileImg: getUserData.imageUrl,
      bcryptId: getUserData.bcryptId,
    };
    dispatch(chatActions.addChatRoomAciton(item, user));
  };

  return (
    <>
      {showPricePopup && (
        <PriceProposeModal
          _onClick={() => {
            hidePricePopup();
          }}
        />
      )}
      {showPriceDeletePopup && (
        <PriceProposeDeleteModal
          priceId={
            isNoRefresh
              ? lastPricePropose.priceProposeId
              : item.myPricePropose.priceProposeId
          }
          proposePrice={
            isNoRefresh
              ? lastPricePropose.proposedPrice
              : item.myPricePropose.proposedPrice
          }
          _onClick={() => {
            hidePriceDeletePopup();
          }}
          type=""
        />
      )}
      {showCheckPriceDeletePopup && (
        <PriceProposeDeleteModal
          priceId={
            isNoRefresh
              ? lastPricePropose.priceProposeId
              : item.myPricePropose.priceProposeId
          }
          proposePrice={
            isNoRefresh
              ? lastPricePropose.proposedPrice
              : item.myPricePropose.proposedPrice
          }
          _onClick={() => {
            hideCheckPriceDeletePopup();
          }}
          type="beforeChat"
        />
      )}
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <ItemNavBox
          className={isHighPrice ? styles.itemNavCol : styles.itemNavRow}
        >
          <Text>{numberWithCommas(item.price)}원</Text>
          {/* 상품 주인일 경우 */}
          {isOwner && tradeType !== "완료" && (
            <Button
              className={isHighPrice ? styles.btnRePriceCol : styles.btnRePrice}
              onClick={() => {
                history.push(`/price/${id}`);
              }}
            >
              가격 제안 보기
            </Button>
          )}
          {/* 가격제안 한 적 없는 경우 */}
          {!isOwner &&
            item.myPricePropose === null &&
            item.chatId === null &&
            tradeType !== "완료" &&
            priceProposeType === "" && (
              <Flex>
                <Button
                  className={isHighPrice ? styles.btnChatCol : styles.btnChat}
                  onClick={() => {
                    clickChatBtn();
                  }}
                >
                  <Icon
                    width="18px"
                    src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  즉시 {item.tradeType === "판매" ? "구매" : "판매"} 가능
                </Button>
                <Button
                  className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                  onClick={() => {
                    setShowPricePopup(true);
                  }}
                >
                  가격 제시하기
                </Button>
              </Flex>
            )}
          {priceProposeType === "SUGGEST" && (
            <Flex>
              <Button
                className={isHighPrice ? styles.btnChatCol : styles.btnChat}
                onClick={() => {
                  clickChatBtn();
                }}
              >
                <Icon
                  width="18px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                  alt="go chat"
                  margin="0 5px 2px 0"
                />
                즉시 {item.tradeType === "판매" ? "구매" : "판매"} 가능
              </Button>
              <Button
                className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                onClick={() => {
                  setShowPricePopup(true);
                }}
              >
                가격 제시하기
              </Button>
            </Flex>
          )}
          {/* 기존에 채팅방 나가기를 한 이후 */}
          {!isOwner &&
            item.myPricePropose?.status === "CANCLED" &&
            item.chatId === null &&
            tradeType !== "완료" && (
              <Flex>
                <Button
                  className={isHighPrice ? styles.btnChatCol : styles.btnChat}
                  onClick={() => {
                    clickChatBtn();
                  }}
                >
                  <Icon
                    width="18px"
                    src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  즉시 {item.tradeType === "판매" ? "구매" : "판매"} 가능
                </Button>
                <Button
                  className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                  onClick={() => {
                    setShowPricePopup(true);
                  }}
                >
                  가격 제시하기
                </Button>
              </Flex>
            )}
          {/* 가격제안 한 적 있는 경우 (채팅방은 없음) */}
          {!isOwner &&
            item.myPricePropose !== null &&
            item.myPricePropose.status === "SUGGESTED" &&
            tradeType !== "완료" &&
            item.chatId === null &&
            priceProposeType === "" && (
              <Flex>
                <Button
                  className={isHighPrice ? styles.btnChatCol : styles.btnChat}
                  onClick={() => {
                    clickChatBtn();
                  }}
                >
                  <Icon
                    width="18px"
                    src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  즉시 {item.tradeType === "판매" ? "구매" : "판매"} 가능
                </Button>
                <Button
                  className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                  onClick={() => {
                    setShowPriceDeletePopup(true);
                  }}
                >
                  가격 제시 삭제
                </Button>
              </Flex>
            )}
          {priceProposeType === "DELETE" && (
            <Flex>
              <Button
                className={isHighPrice ? styles.btnChatCol : styles.btnChat}
                onClick={() => {
                  clickChatBtn();
                }}
              >
                <Icon
                  width="18px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                  alt="go chat"
                  margin="0 5px 2px 0"
                />
                즉시 {item.tradeType === "판매" ? "구매" : "판매"} 가능
              </Button>
              <Button
                className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                onClick={() => {
                  setShowPriceDeletePopup(true);
                }}
              >
                가격 제시 삭제
              </Button>
            </Flex>
          )}
          {/* 가격제안이 수락된 경우 */}
          {!isOwner &&
            item.chatId &&
            item.myPricePropose !== null &&
            item.myPricePropose.status === "ACCEPTED" &&
            tradeType !== "완료" && (
              <Flex>
                <Button
                  className={
                    isHighPrice ? styles.btnReChatCol : styles.btnReChat
                  }
                  onClick={() => {
                    history.push(`/chat-room/${id}/${item.chatId}`);
                  }}
                >
                  <Icon
                    width="18px"
                    src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  채팅방으로 이동
                </Button>
              </Flex>
            )}
          {/* 즉시 구매/판매 채팅을 건 경우 (가격제안 한 적 없음) */}
          {!isOwner &&
            item.chatId &&
            item.myPricePropose === null &&
            tradeType !== "완료" && (
              <Flex>
                <Button
                  className={
                    isHighPrice ? styles.btnReChatCol : styles.btnReChat
                  }
                  onClick={() => {
                    history.push(`/chat-room/${id}/${item.chatId}`);
                  }}
                >
                  <Icon
                    width="18px"
                    src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  채팅방으로 이동
                </Button>
              </Flex>
            )}
          {/* 즉시 구매/판매 채팅을 건 경우 (가격제안 한 적 있음) */}
          {!isOwner &&
            item.chatId &&
            item.myPricePropose !== null &&
            item.myPricePropose.status !== "ACCEPTED" &&
            tradeType !== "완료" && (
              <Flex>
                <Button
                  className={
                    isHighPrice ? styles.btnReChatCol : styles.btnReChat
                  }
                  onClick={() => {
                    history.push(`/chat-room/${id}/${item.chatId}`);
                  }}
                >
                  <Icon
                    width="18px"
                    src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  채팅방으로 이동
                </Button>
              </Flex>
            )}
          {/* 거래완료된 상품의 경우 */}
          {tradeType === "완료" && (
            <Flex>
              <Button
                className={
                  isHighPrice ? styles.btnSoldoutCol : styles.btnSoldout
                }
                style={{ cursor: "default" }}
              >
                거래 완료
              </Button>
            </Flex>
          )}
        </ItemNavBox>
      )}
    </>
  );
};

const ItemNavBox = styled.div`
  width: 100%;
  padding: 0 16px 20px 16px;
`;

const Button = styled.div`
  font-weight: bold;
  border-radius: 5px;
  padding: 12px;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 600;

  @media screen and (min-width: 415px) {
    font-size: 25px;
  }
`;

export default ItemNav;
