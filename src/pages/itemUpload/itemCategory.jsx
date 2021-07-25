/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Icon } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import { getInfo } from "../../shared/axios";
import { actionCreators as newItemActions } from "../../redux/modules/newItem";

const ItemCategory = () => {
  const dispatch = useDispatch();
  const categoryValue = useSelector((state) => state.newItem.category);

  // 카테고리 데이터 받아오기
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = getInfo("items/category");
    getCategory.then((result) => {
      console.log(result);
      setCategories(result);
    });
  }, []);

  const checkHandler = (name) => {
    console.log(name);
    dispatch(newItemActions.setCategoryAction(name));
  };

  return (
    <CategoryContainer>
      <HeaderInfo text="카테고리" padding="0 16px" />
      <div className={styles.detailText}>전체 카테고리</div>
      {categories.map((category) => (
        <CategoryBox
          key={category.categoryItemId}
          className={styles.categoryBtn}
          onClick={() => checkHandler(`${category.categoryItemName}`)}
        >
          <CategoryInput
            id={category.categoryItemId}
            type="radio"
            checked={categoryValue === `${category.categoryItemId}`}
            onChange={() => checkHandler(`${category.categoryItemName}`)}
          />
          <label htmlFor={category.categoryItemId}>
            {category.categoryItemName}
          </label>
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
  margin-top: 55px;
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
