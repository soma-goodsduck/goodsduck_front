import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Text, Icon } from "../../elements";
import { blackBtn } from "../../shared/colors";

import { actionCreators as communityActions } from "../../redux/modules/community";
import { history } from "../../redux/configureStore";

const CommunityMenu = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <Header>
        <Text bold size="18px">
          메뉴
        </Text>
        <Icon
          width="18px"
          src="https://goods-duck.com/icon/icon_exit.svg"
          alt="menu"
          margin="0 5px 0 0"
          _onClick={() => {
            history.push("/community");
          }}
        />
      </Header>
      <MenuBtns>
        <MenuBtn
          onClick={() => {
            history.push("/community");
            dispatch(communityActions.setCommunityMenu("myPosts"));
          }}
        >
          내가 작성한 게시글
        </MenuBtn>
        <MenuBtn
          onClick={() => {
            history.push("/community");
            dispatch(communityActions.setCommunityMenu("myComments"));
          }}
        >
          내가 작성한 댓글
        </MenuBtn>
        <MenuBtn
          onClick={() => {
            history.push("/community");
            dispatch(communityActions.setCommunityMenu("myFavoritePosts"));
          }}
        >
          내가 좋아요한 게시글
        </MenuBtn>
        <MenuBtn
          onClick={() => {
            history.push("/community");
            dispatch(communityActions.setCommunityMenu("freeMarket"));
          }}
        >
          무료나눔장터
        </MenuBtn>
        <MenuBtn
          onClick={() => {
            history.push("/vote");
            dispatch(communityActions.setCommunityMenu("home"));
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ type: "home" });
          }}
        >
          투표하기
        </MenuBtn>
      </MenuBtns>
    </>
  );
};

const Header = styled.div`
  width: 100vw;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 10px;

  @media screen and (min-width: 415px) {
    width: 415px;
    left: 30%;
  }

  @media screen and (min-width: 500px) {
    left: 10%;
  }

  @media screen and (min-width: 850px) {
    left: 50%;
  }
`;

const MenuBtns = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 20px;
  margin-top: 50px;
`;

const MenuBtn = styled.button`
  color: ${blackBtn};
  font-size: 17px;
  font-weight: 600;
  padding: 15px 0;
`;

export default CommunityMenu;
