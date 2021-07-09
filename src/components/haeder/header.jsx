import React from "react";
import styles from "./header.module.css";
import styled from "styled-components";
import { Flex, Icon } from "../../elements";

const Header = (props) => {
  return (
    <HeaderBox>
      <input className={styles.search} placeholder="검색어를 입력해주세요" />
      <Flex>
        <Icon
          src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_filter.svg"
          alt="filter"
        />
        <Icon
          src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_heart.svg"
          alt="heart"
          margin="0 10px"
        />
        <Icon
          src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_notice.svg"
          alt="notice"
          width="22px"
        />
      </Flex>
    </HeaderBox>
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
