/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import HeaderInfo from "../../components/haeder/headerInfo";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { history } from "../../redux/configureStore";

const ItemStatus = () => {
  const dispatch = useDispatch();
  const statusValue = useSelector((state) => state.newItem.status_grade);

  const grades = ["S", "A", "B", "C"];
  const statusTexts = [
    "박스를 개봉하지 않은 새상품이며, 생산 당시의 포장상태가 그대로 보존된 완전한 상태입니다.",
    "박스를 개봉한 중고 상품이며, 새 상품처럼 깨끗한 상태입니다.",
    "사용 흔적이 있으나, 대체로 관리 상태가 양호한 중고 상품입니다.",
    "사용 흔적이 많지만, 사용상에는 문제가 없는 상태입니다.",
  ];
  const [_grade, setGrade] = useState("");
  const [nextOK, setNextOK] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    if (_grade) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [_grade]);

  const checkHandler = (grade) => {
    console.log(statusValue, grade);
    dispatch(newItemActions.setStatusAction(grade));
    setNextOK(true);
  };

  const next = () => {
    history.push("/new");
  };

  return (
    <Outer>
      <HeaderInfo text="굿즈 상태" />
      <StatusContainer>
        <div>
          <div className={styles.detailText}>굿즈 상태 선택</div>
          {grades.map((grade, idx) => (
            <StatusBox
              key={grade}
              className={
                statusValue === `${grade}`
                  ? styles.clickStatusBtn
                  : styles.statusBtn
              }
              onClick={() => checkHandler(`${grade}`)}
            >
              <StatusInput
                id={grade}
                type="radio"
                checked={statusValue === `${grade}`}
                onChange={() => checkHandler(`${grade}`)}
              />
              <label htmlFor={grade} />
              <div className={styles.statusGrade}>{grade}급</div>
              <div>{statusTexts[idx]}</div>
            </StatusBox>
          ))}
        </div>
        <button
          className={nextOK ? styles.nextOKBtn : styles.nextBtn}
          type="button"
          onClick={() => {
            next();
          }}
        >
          완료
        </button>
      </StatusContainer>
    </Outer>
  );
};

const Outer = styled.div`
  height: 100vh;
  padding: 0 15px;
`;

const StatusContainer = styled.div`
  height: 90vh;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StatusBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 20px 15px;
  margin: 10px 0;
  border-radius: 8px;
  cursor: pointer;
`;
const StatusInput = styled.input`
  display: none;
`;

export default ItemStatus;
