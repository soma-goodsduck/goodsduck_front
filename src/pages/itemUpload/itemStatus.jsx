/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Flex } from "../../elements";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";

const ItemStatus = () => {
  const dispatch = useDispatch();
  const statusValue = useSelector((state) => state.newItem.status_grade);

  const grades = ["S", "A", "B", "C"];

  const checkHandler = (grade) => {
    dispatch(newItemActions.setStatusAction(grade));
  };

  return (
    <Flex is_flex is_wrap>
      {grades.map((grade) => (
        <StatusBox
          key={grade}
          className={
            statusValue === `${grade}`
              ? styles.clickStatusBtn
              : styles.statusBtn
          }
        >
          <StatusInput
            id={grade}
            type="radio"
            checked={statusValue === `${grade}`}
            onChange={() => checkHandler(`${grade}`)}
          />
          <label htmlFor={grade}>{grade}급</label>
        </StatusBox>
      ))}
    </Flex>
  );
};

const StatusBox = styled.div`
  width: 50px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
  text-align: center;
`;
const StatusInput = styled.input`
  display: none;
`;

export default ItemStatus;
