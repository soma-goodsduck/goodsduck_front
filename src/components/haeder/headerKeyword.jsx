import React, { useRef, useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./header.module.css";

import { Flex, Icon } from "../../elements";

import { actionCreators as homeActions } from "../../redux/modules/home";
import { history } from "../../redux/configureStore";

const HeaderKeyword = memo(({ keyword }) => {
  const dispatch = useDispatch();

  const inputRef = useRef();
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    setSearchWord(keyword);
  }, []);

  const onSearch = (name) => {
    history.push(`/search/item/${name}`);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const name = inputRef.current.value;
    if (name) {
      onSearch(name);
    }
  };

  return (
    <>
      <div className={styles.header}>
        <HeaderBox>
          <Icon
            width="12px"
            src="https://goods-duck.com/icon/icon_back_b.svg"
            _onClick={() => {
              dispatch(homeActions.clearSearchFilter());
              history.push("/");
            }}
          />
          <form onSubmit={onSubmit}>
            <input
              value={searchWord}
              ref={inputRef}
              className={styles.searchKeyword}
              placeholder={searchWord}
              onChange={() => {
                setSearchWord(inputRef.current.value);
              }}
            />
          </form>
          <Flex>
            <Icon
              src="https://goods-duck.com/icon/icon_search.svg"
              alt="search"
              _onClick={(event) => {
                onSubmit(event);
              }}
            />
          </Flex>
        </HeaderBox>
      </div>
    </>
  );
});

const HeaderBox = styled.div`
  background-color: #ffffff;
  border-bottom: 3px solid #ffe200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;

export default HeaderKeyword;
