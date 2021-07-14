/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Flex } from "../../elements";

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
    <Flex is_flex is_wrap>
      {categories.map((category) => (
        <CategoryBox
          key={category}
          className={
            categoryValue === `${category}`
              ? styles.clickStatusBtn
              : styles.statusBtn
          }
        >
          <CategoryInput
            id={category}
            type="radio"
            checked={categoryValue === `${category}`}
            onChange={() => checkHandler(`${category}`)}
          />
          <label htmlFor={category}>{category}</label>
        </CategoryBox>
      ))}
    </Flex>
  );
};

const CategoryBox = styled.div`
  width: 100px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
  text-align: center;
`;
const CategoryInput = styled.input`
  display: none;
`;

export default ItemCategory;
