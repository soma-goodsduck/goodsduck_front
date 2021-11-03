import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import { LoginPopUp } from "../../elements";
import Nav from "../../components/nav/nav";
import HeaderCommunity from "../../components/haeder/headerCommunity";
import PostList from "../../components/post/postList";

import { requestAuthData } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";

const CommunityHomePage = (props) => {
  const dispatch = useDispatch();

  const communityMenu = useSelector((state) => state.community.menu);
  const [menuText, setMenuText] = useState("커뮤니티");
  const [showPopup, setShowPopup] = useState(false);

  const idolIdLS = Number(localStorage.getItem("filter_idolGroup"));
  const [isIdolFilter, setIsIdolFilter] = useState(idolIdLS);
  const handleIdolFilter = (id) => {
    setIsIdolFilter(id);
  };

  const reqUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    return result;
  };
  const fnEffect = async () => {
    const getUserData = await reqUserData();
    if (getUserData < 0) {
      if (getUserData === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
    }
  };
  useEffect(fnEffect, []);

  useEffect(() => {
    if (communityMenu === "home") {
      setMenuText("커뮤니티");
    } else if (communityMenu === "freeMarket") {
      setMenuText("무료나눔장터");
    } else if (communityMenu === "myPosts") {
      setMenuText("내가 작성한 게시글");
    } else if (communityMenu === "myComments") {
      setMenuText("내가 작성한 댓글");
    } else if (communityMenu === "myFavoritePosts") {
      setMenuText("내가 좋아요한 게시글");
    }
  }, [communityMenu]);

  return (
    <>
      {showPopup && <LoginPopUp />}
      <CommunityHome>
        <HeaderCommunity text={menuText} />
        <NoticeBox>투표 결과는 오른쪽 상단 메뉴에 있습니다 😉</NoticeBox>
        <PostList onIdolFilter={handleIdolFilter} type={communityMenu} />
        {(communityMenu === "home" || communityMenu === "freeMarket") && (
          <AddPostBtn
            onClick={() => {
              if (isIdolFilter !== 0) {
                history.push("/upload-post");
              } else {
                dispatch(userActions.setShowNotification(true));
                dispatch(
                  userActions.setNotificationBody(
                    "아이돌을 먼저 선택해주세요.",
                  ),
                );
              }
            }}
          />
        )}
      </CommunityHome>
      <Nav />
    </>
  );
};

const CommunityHome = styled.div`
  margin-bottom: 100px;
`;

const AddPostBtn = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;

  width: 70px;
  height: 70px;
  background-image: url("https://goods-duck.com/icon/icon_addPost.svg");
  background-size: cover;
  cursor: pointer;

  @media screen and (max-width: 320px) {
    width: 50px;
    height: 50px;
  }
  @media screen and (min-width: 415px) {
    bottom: 100px;
    right: 20%;
  }
  @media screen and (min-width: 540px) {
    right: 15%;
  }
  @media screen and (min-width: 768px) {
    right: 38%;
  }
  @media screen and (min-width: 1024px) {
    right: 10%;
  }
`;

const NoticeBox = styled.div`
  width: 100vw;
  height: 35px;
  margin-top: 60px;
  padding: 10px 20px;
  background-color: #f2f3f6;
  font-size: 14px;
  text-align: center;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

export default CommunityHomePage;
