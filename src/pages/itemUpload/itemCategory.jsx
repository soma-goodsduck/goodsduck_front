/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Icon } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";

const ItemCategory = () => {
  const dispatch = useDispatch();
  const categoryValue = useSelector((state) => state.newItem.category);

  const categories = [
    "앨범",
    "포토카드",
    "포스터",
    "응원도구",
    "인형/피규어",
    "패션의류",
    "패션잡화",
    "팬시",
    "기타",
  ];

  const checkHandler = (name) => {
    dispatch(newItemActions.setCategoryAction(name));
  };

  return (
    <CategoryContainer>
      <HeaderInfo text="카테고리" padding="0 16px" />
      <div className={styles.detailText}>전체 카테고리</div>
      {categories.map((category) => (
        <CategoryBox
          key={category}
          className={styles.categoryBtn}
          onClick={() => checkHandler(`${category}`)}
        >
          <CategoryInput
            id={category}
            type="radio"
            checked={categoryValue === `${category}`}
            onChange={() => checkHandler(`${category}`)}
          />
          <label htmlFor={category}>{category}</label>
          <Icon
            width="12px"
            src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
          />
        </CategoryBox>
      ))}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;
`;
const CategoryBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 15px;
  background-color: #ffffff;
  cursor: pointer;
`;
const CategoryInput = styled.input`
  display: none;
`;

export default ItemCategory;
