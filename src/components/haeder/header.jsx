import React, { useRef } from "react";

import styled from "styled-components";
import styles from "./header.module.css";

import { Flex, Icon } from "../../elements";

import { history } from "../../redux/configureStore";

const Header = () => {
  const inputRef = useRef();

  const onSearch = (name) => {
    history.push(`/search/item/${name}`);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const name = inputRef.current.value;
    if (name) {
      onSearch(name);
    }
    inputRef.current.value = "";
  };

  return (
    <div className={styles.header}>
      <HeaderBox>
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            className={styles.search}
            placeholder="검색어를 입력해주세요"
          />
        </form>
        <Flex>
          <Icon
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_search.svg"
            alt="search"
          />
          <Icon
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_heart2.svg"
            alt="heart"
            margin="0 10px"
            _onClick={() => {
              history.push("/favorites");
            }}
          />
          <Icon
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_notification.svg"
            alt="notice"
            width="20px"
            _onClick={() => {
              history.push("/notification");
            }}
          />
        </Flex>
      </HeaderBox>
    </div>
  );
};

const HeaderBox = styled.div`
  background-color: #ffffff;
  border-bottom: 3px solid #ffe200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;

export default Header;
