/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "../itemUpload/itemUpload.module.css";
import HeaderInfo from "../../components/haeder/headerInfo";

import { actionCreators as filteringActions } from "../../redux/modules/filtering";
import { requestPublicData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const ItemStatus = () => {
  const dispatch = useDispatch();

  const statusValue = useSelector((state) => state.filtering.filterStatus);

  // 상품상태 데이터 받아오기
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const getCategory = requestPublicData("v1/items/grade-status");
    getCategory.then((result) => {
      setStatuses(result);
    });
  }, []);

  const [nextOK, setNextOK] = useState(false);

  const checkHandler = (grade) => {
    console.log(statusValue, grade);
    dispatch(filteringActions.setFilterStatus(grade));
    setNextOK(true);
  };

  const next = () => {
    history.push("/filtering");
  };

  return (
    <Outer>
      <HeaderInfo text="굿즈 상태" />
      <StatusContainer>
        <div>
          <div className={styles.detailText}>굿즈 상태 선택</div>
          {statuses.map((status) => (
            <StatusBox
              key={status.gradeStatus}
              className={
                statusValue === `${status.gradeStatus}`
                  ? styles.clickStatusBtn
                  : styles.statusBtn
              }
              onClick={() => checkHandler(`${status.gradeStatus}`)}
            >
              <StatusInput
                id={status.gradeStatus}
                type="radio"
                checked={statusValue === `${status.gradeStatus}`}
                onChange={() => checkHandler(`${status.gradeStatus}`)}
              />
              <label htmlFor={status.gradeStatus} />
              <div className={styles.statusGrade}>{status.gradeStatus}급</div>
              <div>{status.description}</div>
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
  margin-top: 35px;
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
