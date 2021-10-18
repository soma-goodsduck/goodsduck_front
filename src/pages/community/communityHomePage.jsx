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
        <NoticeBox>투표하기는 오른쪽 상단 메뉴에 있습니다 😉</NoticeBox>
        {/* <NoticeBox2>
          ⚠️ 투표권을 얻기 위한 성의없는 글 및 배포성 글을 작성한 유저의 계정은
          정지될 수 있으며, 투표에 불이익이 갈 수 있습니다.
        </NoticeBox2> */}
        <NoticeBox2>
          <strong>투표 정산 작업 공지드립니다.</strong> <br />- 커뮤니티 활동을
          투표권을 얻기 위한 도배성 글이 많아짐에 따라 일일 게시글 수 30개까지만
          유효 투표수로 인정했습니다. <br />- 굿즈 등록과 커뮤니티 게시글 등록
          후 바로 삭제하여 투표권만 얻은 개수도 모두 무효화했습니다. <br />-
          사진 나눔의 경우는 `커뮤니티의 나눔 게시글`을 이용해주세요 :) <br />
          <br />
          <strong>10.17 22:00 기준으로 재조정된 투표수입니다.</strong> <br />
          오마이걸 투표수 = 1214표 (기존 투표수 2372표 - 커뮤니티 도배글(758표)
          - 비정상적인 굿즈 등록(400표)) <br />
          스테이씨 투표수 : 1264개 (기존 투표수 2324표 - 커뮤니티 도배글(720표)
          - 비정상적인 굿즈 등록(340표)) <br />
          <br />
          앞으로도 도배성 글, 글 등록과 삭제 반복 등과 같이 정책을 위반하는
          경우에는 항상 투표에 불이익이 갈 수 있으므로 조심해주세요!
        </NoticeBox2>
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
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_addPost.svg");
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

const NoticeBox2 = styled.div`
  width: 100vw;
  padding: 10px 20px;
  background-color: #f2f3f6;
  font-size: 14px;
  text-align: left;
  line-height: 1.4;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

export default CommunityHomePage;
