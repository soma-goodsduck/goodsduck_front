/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ItemRow from "../../components/itemRow/itemRow";
import { Image, Text } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import { actionCreators as userActions } from "../../redux/modules/user";
import {
  requestAuthData,
  postAction,
  patchJsonAction,
} from "../../shared/axios";
import { gray, grayBorder, white, yellow } from "../../shared/colors";
import { history } from "../../redux/configureStore";

const WritingReviewPage = () => {
  const dispatch = useDispatch();

  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  const [users, setUsers] = useState([]);
  const [item, setItem] = useState(null);
  const reviewRef = useRef();
  const { userChatIdForReview, review, numOfStar } = useSelector((state) => ({
    userChatIdForReview: state.user.userForReview,
    review: state.user.review,
    numOfStar: state.user.numOfStar,
  }));
  const [selectedUser, setSelectedUser] = useState(false);
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);
  const [nextOK, setNextOK] = useState(false);

  const requestUsersByChat = async () => {
    const result = await requestAuthData(`v2/users/items/${itemId}/chat`);
    if (result === "login") {
      history.push("/login");
    }
    if (result.isExist) {
      history.push("/my-profile");
    }
    return result;
  };
  const fnEffect = async () => {
    const usersByChat = await requestUsersByChat();
    if (usersByChat.chatRooms !== []) {
      setUsers(usersByChat.chatRooms);
    }
    setItem(usersByChat.item);
  };
  useEffect(fnEffect, []);

  const onSelectUser = (chatId) => {
    dispatch(userActions.setUserForReview(chatId));
    setSelectedUser(true);
  };

  const onFinReview = () => {
    // 리뷰 작성 요청
    if (nextOK) {
      try {
        postAction("v1/users/reviews", {
          chatRoomId: userChatIdForReview,
          content: review,
          itemId,
          score: numOfStar,
          reviewType: "REVIEW_FIRST",
        });
      } catch (error) {
        console.log(error);
        return;
      }
      patchJsonAction(`v1/items/${itemId}/trade-status`, {
        tradeStatus: "COMPLETE",
      });
      history.replace("/my-profile");
    }
    dispatch(userActions.clearReview());
  };

  useEffect(() => {
    if (userChatIdForReview && numOfStar !== 0 && review) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [userChatIdForReview, numOfStar, review]);

  return (
    <>
      <HeaderInfo text="리뷰 작성" padding="0 16px" isReviewClear />
      <ReviewBox>
        <div>
          {item && <ItemRow item={item} isMine />}
          <Line />
          <div style={{ marginTop: "15px" }}>
            <Text medium is_center>
              {users.length !== 0
                ? "✅ 거래 상대방을 선택해주세요"
                : "⚠️ 거래 상대방이 없습니다."}
            </Text>
          </div>
          {users.length !== 0 && (
            <div>
              <UserRows>
                {users.map((user) => (
                  <UserRow
                    key={user.chatId}
                    selectedUser={
                      userChatIdForReview === user.chatId ? selectedUser : ""
                    }
                    onClick={() => onSelectUser(user.chatId)}
                  >
                    <UserInput
                      id={user.chatId}
                      type="radio"
                      checked={userChatIdForReview === user.chatId}
                      onChange={() => onSelectUser(user.chatId)}
                    />
                    <label htmlFor={user.chatId} />
                    <Image
                      shape="circle"
                      src={
                        user.otherUser.imageUrl ||
                        "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/image/logo.png"
                      }
                      margin="0 10px 0 0"
                      size="55px"
                    />
                    <Text medium>{user.otherUser.nickName}</Text>
                  </UserRow>
                ))}
              </UserRows>
              <Line />
              <ReviewFormBox>
                <RatingsBox>
                  <RatingBox
                    onClick={() => {
                      setStar1(true);
                      if (star2 || star3 || star4 || star5) {
                        setStar2(false);
                        setStar3(false);
                        setStar4(false);
                        setStar5(false);
                      }
                      dispatch(userActions.setNumOfStar(1));
                    }}
                  >
                    {!star1 && (
                      <div>
                        <StarIcon className="far fa-star" />
                      </div>
                    )}
                    {star1 && (
                      <div>
                        <StarCheckIcon className="fas fa-star" />
                      </div>
                    )}
                  </RatingBox>
                  <RatingBox
                    onClick={() => {
                      setStar2(true);
                      if (!star1) {
                        setStar1(true);
                      }
                      if (star3 || star4 || star5) {
                        setStar3(false);
                        setStar4(false);
                        setStar5(false);
                      }
                      dispatch(userActions.setNumOfStar(2));
                    }}
                  >
                    {!star2 && (
                      <div>
                        <StarIcon className="far fa-star" />
                      </div>
                    )}
                    {star2 && (
                      <div>
                        <StarCheckIcon className="fas fa-star" />
                      </div>
                    )}
                  </RatingBox>
                  <RatingBox
                    onClick={() => {
                      setStar3(true);
                      if (!star1 || !star2) {
                        setStar1(true);
                        setStar2(true);
                      }
                      if (star4 || star5) {
                        setStar4(false);
                        setStar5(false);
                      }
                      dispatch(userActions.setNumOfStar(3));
                    }}
                  >
                    {!star3 && (
                      <div>
                        <StarIcon className="far fa-star" />
                      </div>
                    )}
                    {star3 && (
                      <div>
                        <StarCheckIcon className="fas fa-star" />
                      </div>
                    )}
                  </RatingBox>
                  <RatingBox
                    onClick={() => {
                      setStar4(true);
                      if (!star1 || !star2 || !star3) {
                        setStar1(true);
                        setStar2(true);
                        setStar3(true);
                      }
                      if (star5) {
                        setStar5(false);
                      }
                      dispatch(userActions.setNumOfStar(4));
                    }}
                  >
                    {!star4 && (
                      <div>
                        <StarIcon className="far fa-star" />
                      </div>
                    )}
                    {star4 && (
                      <div>
                        <StarCheckIcon className="fas fa-star" />
                      </div>
                    )}
                  </RatingBox>
                  <RatingBox
                    onClick={() => {
                      setStar5(true);
                      if (!star1 || !star2 || !star3 || !star4) {
                        setStar1(true);
                        setStar2(true);
                        setStar3(true);
                        setStar4(true);
                      }
                      dispatch(userActions.setNumOfStar(5));
                    }}
                  >
                    {!star5 && (
                      <div>
                        <StarIcon className="far fa-star" />
                      </div>
                    )}
                    {star5 && (
                      <div>
                        <StarCheckIcon className="fas fa-star" />
                      </div>
                    )}
                  </RatingBox>
                </RatingsBox>
                <ReviewTextBox
                  placeholder="리뷰를 작성해주세요"
                  ref={reviewRef}
                  onChange={() => {
                    dispatch(userActions.setReview(reviewRef.current.value));
                  }}
                />
              </ReviewFormBox>
            </div>
          )}
        </div>
        <SelectBtn
          nextOK={nextOK}
          onClick={() => {
            onFinReview();
          }}
        >
          리뷰 작성 완료
        </SelectBtn>
      </ReviewBox>
    </>
  );
};

const ReviewBox = styled.div`
  margin-top: 65px;
  padding: 0 16px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
  margin: 25px 0;
`;

const UserInput = styled.input`
  display: none;
`;

const UserRows = styled.div`
  margin-top: 15px;
  cursor: pointer;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 5px;

  ${(props) =>
    props.selectedUser && "background-color: #dddddd;  border-radius:10px;"}
`;

const ReviewFormBox = styled.div`
  width: 100%;
`;

const RatingsBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;
const RatingBox = styled.button`
  padding: 0 5px;
`;
const StarIcon = styled.i`
  font-size: 24px;
  color: ${grayBorder};
`;
const StarCheckIcon = styled.i`
  font-size: 24px;
  color: ${yellow};
`;

const ReviewTextBox = styled.textarea`
  width: 100%;
  height: 100px;
  font-size: 14px;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid ${grayBorder};

  &::placeholder {
    font-size: 14px;
  }
`;

const SelectBtn = styled.button`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  color: ${white};
  background-color: ${gray};
  border-radius: 5px;
  transition: transform 200ms ease-in;

  &:hover {
    ${(props) => props.nextOK && "transform: scale(1.05);"}
    ${(props) => !props.nextOK && "cursor: default;"}
  }

  ${(props) => props.nextOK && "color:#222222; background-color: #ffe200;"}
`;

export default WritingReviewPage;
