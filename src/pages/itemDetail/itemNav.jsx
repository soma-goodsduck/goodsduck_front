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
          <Text>{numberWithCommas(item.price)}???</Text>
          {/* ?????? ????????? ?????? */}
          {isOwner && tradeType !== "??????" && (
            <Button
              className={isHighPrice ? styles.btnRePriceCol : styles.btnRePrice}
              onClick={() => {
                history.push(`/price/${id}`);
              }}
            >
              ?????? ?????? ??????
            </Button>
          )}
          {/* ???????????? ??? ??? ?????? ?????? */}
          {!isOwner &&
            item.myPricePropose === null &&
            item.chatId === null &&
            tradeType !== "??????" &&
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
                    src="https://goods-duck.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  ?????? {item.tradeType === "??????" ? "??????" : "??????"} ??????
                </Button>
                <Button
                  className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                  onClick={() => {
                    setShowPricePopup(true);
                  }}
                >
                  ?????? ????????????
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
                  src="https://goods-duck.com/icon/icon_goChat.svg"
                  alt="go chat"
                  margin="0 5px 2px 0"
                />
                ?????? {item.tradeType === "??????" ? "??????" : "??????"} ??????
              </Button>
              <Button
                className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                onClick={() => {
                  setShowPricePopup(true);
                }}
              >
                ?????? ????????????
              </Button>
            </Flex>
          )}
          {/* ????????? ????????? ???????????? ??? ?????? */}
          {!isOwner &&
            item.myPricePropose?.status === "CANCLED" &&
            item.chatId === null &&
            tradeType !== "??????" && (
              <Flex>
                <Button
                  className={isHighPrice ? styles.btnChatCol : styles.btnChat}
                  onClick={() => {
                    clickChatBtn();
                  }}
                >
                  <Icon
                    width="18px"
                    src="https://goods-duck.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  ?????? {item.tradeType === "??????" ? "??????" : "??????"} ??????
                </Button>
                <Button
                  className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                  onClick={() => {
                    setShowPricePopup(true);
                  }}
                >
                  ?????? ????????????
                </Button>
              </Flex>
            )}
          {/* ???????????? ??? ??? ?????? ?????? (???????????? ??????) */}
          {!isOwner &&
            item.myPricePropose !== null &&
            item.myPricePropose.status === "SUGGESTED" &&
            tradeType !== "??????" &&
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
                    src="https://goods-duck.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  ?????? {item.tradeType === "??????" ? "??????" : "??????"} ??????
                </Button>
                <Button
                  className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                  onClick={() => {
                    setShowPriceDeletePopup(true);
                  }}
                >
                  ?????? ?????? ??????
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
                  src="https://goods-duck.com/icon/icon_goChat.svg"
                  alt="go chat"
                  margin="0 5px 2px 0"
                />
                ?????? {item.tradeType === "??????" ? "??????" : "??????"} ??????
              </Button>
              <Button
                className={isHighPrice ? styles.btnPriceCol : styles.btnPrice}
                onClick={() => {
                  setShowPriceDeletePopup(true);
                }}
              >
                ?????? ?????? ??????
              </Button>
            </Flex>
          )}
          {/* ??????????????? ????????? ?????? */}
          {!isOwner &&
            item.chatId &&
            item.myPricePropose !== null &&
            item.myPricePropose.status === "ACCEPTED" &&
            tradeType !== "??????" && (
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
                    src="https://goods-duck.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  ??????????????? ??????
                </Button>
              </Flex>
            )}
          {/* ?????? ??????/?????? ????????? ??? ?????? (???????????? ??? ??? ??????) */}
          {!isOwner &&
            item.chatId &&
            item.myPricePropose === null &&
            tradeType !== "??????" && (
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
                    src="https://goods-duck.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  ??????????????? ??????
                </Button>
              </Flex>
            )}
          {/* ?????? ??????/?????? ????????? ??? ?????? (???????????? ??? ??? ??????) */}
          {!isOwner &&
            item.chatId &&
            item.myPricePropose !== null &&
            item.myPricePropose.status !== "ACCEPTED" &&
            tradeType !== "??????" && (
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
                    src="https://goods-duck.com/icon/icon_goChat.svg"
                    alt="go chat"
                    margin="0 5px 2px 0"
                  />
                  ??????????????? ??????
                </Button>
              </Flex>
            )}
          {/* ??????????????? ????????? ?????? */}
          {tradeType === "??????" && (
            <Flex>
              <Button
                className={
                  isHighPrice ? styles.btnSoldoutCol : styles.btnSoldout
                }
                style={{ cursor: "default" }}
              >
                ?????? ??????
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
