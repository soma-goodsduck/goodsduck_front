import React, { useState, useRef } from "react";
import styles from "./header.module.css";
import styled from "styled-components";
import { Flex, Icon } from "../../elements";
import FilteringIdol from "../idolFiltering/idolGroupFiltering";
import Filtering from "../filtering/filtering";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as headerActions } from "../../redux/modules/header";
//import { checkUser } from "../../shared/checkUser";
import { BACKEND_URL } from "../../shared/OAuth";

const Header = () => {
  const inputRef = useRef();
  const isFiltering = useSelector((state) => state.header.click_filtering);
  const dispatch = useDispatch();

  const handleFiltering = () => {
    dispatch(headerActions.clickfilteringAction(isFiltering));
  };

  const checkUser = (path) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt == null) {
      dispatch(userActions.noAccessAction());
    } else {
      axios
        .get(`${BACKEND_URL}/api/v1/login?token=${jwt}`)
        // .get(`${BACKEND_URL}/api/v1/login`, {
        //   headers: { token: `${jwt}` },
        // })
        .then(function (result) {
          console.log(result.data);
          if (result.data.role === "ANONYMOUS") {
            dispatch(userActions.noAccessAction());
          } else {
            dispatch(userActions.accessAction(path));
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //const name = inputRef.current.value;
    //name && onSearch(name);
    inputRef.current.value = "";
  };

  return (
    <div className={isFiltering ? styles.filteringHeader : styles.header}>
      <HeaderBox>
        <img
          src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_search.svg"
          alt="search"
          className={styles.searchIcon}
        />
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            className={styles.search}
            placeholder="검색어를 입력해주세요"
          />
        </form>
        <Flex>
          <Icon
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_filter.svg"
            alt="filter"
            className={{ isFiltering: styles.filterIcon }}
            _onClick={() => {
              handleFiltering();
            }}
          />
          <Icon
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_heart.svg"
            alt="heart"
            margin="0 10px"
            _onClick={() => {
              checkUser("/favorites");
            }}
          />
          <Icon
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_notice.svg"
            alt="notice"
            width="22px"
            _onClick={() => checkUser("/notification")}
          />
        </Flex>
      </HeaderBox>
      {isFiltering && <FilteringIdol></FilteringIdol>}
      {isFiltering && <Filtering></Filtering>}
    </div>
  );
};

const HeaderBox = styled.div`
  background-color: #ffe200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;

export default Header;
