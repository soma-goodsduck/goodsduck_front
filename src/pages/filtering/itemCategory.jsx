/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "../itemUpload/itemUpload.module.css";
import { Icon } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import { requestPublicData } from "../../shared/axios";
import { actionCreators as filteringActions } from "../../redux/modules/filtering";

import { history } from "../../redux/configureStore";

const ItemCategory = () => {
  const dispatch = useDispatch();
  const categoryValue = useSelector((state) => state.filtering.filterCategory);

  // 카테고리 데이터 받아오기
  const [categories, setCategories] = useState([]);

  const reqCategory = async () => {
    const result = await requestPublicData("v1/items/category");
    return result;
  };
  const fnEffect = async () => {
    const getCategory = await reqCategory();
    if (getCategory < 0) {
      history.push("/error");
      return;
    }
    setCategories(getCategory);
  };
  useEffect(fnEffect, []);

  const checkHandler = (name, id) => {
    dispatch(filteringActions.setFilterCategory(name, id));
    history.push("/filtering");
  };

  return (
    <CategoryContainer>
      <HeaderInfo isFiltering text="카테고리" padding="0 16px" />
      <div className={styles.detailText}>전체 카테고리</div>
      {categories &&
        categories.map((category) => (
          <CategoryBox
            key={category.categoryId}
            className={styles.categoryBtn}
            onClick={() =>
              checkHandler(category.categoryName, category.categoryId)
            }
          >
            <CategoryInput
              id={category.categoryId}
              type="radio"
              checked={categoryValue === `${category.categoryId}`}
              onChange={() => checkHandler(`${category.categoryName}`)}
            />
            <label htmlFor={category.categoryId}>{category.categoryName}</label>
            <Icon
              width="12px"
              src="https://goods-duck.com/icon/icon_more.svg"
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
