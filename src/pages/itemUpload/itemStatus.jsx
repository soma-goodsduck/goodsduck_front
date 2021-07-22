/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import HeaderInfo from "../../components/haeder/headerInfo";

import { getInfo } from "../../shared/axios";
import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { history } from "../../redux/configureStore";

const ItemStatus = () => {
  const dispatch = useDispatch();
  const statusValue = useSelector((state) => state.newItem.status_grade);

  // 상품상태 데이터 받아오기
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const getCategory = getInfo("item/gradestatus");
    getCategory.then((result) => {
      console.log(result);
      setStatusData(result);
    });
  }, []);

  const [nextOK, setNextOK] = useState(false);

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
          {statusData.map((_statusData, idx) => (
            <StatusBox
              key={_statusData.gradeStatus}
              className={
                statusValue === `${_statusData.gradeStatus}`
                  ? styles.clickStatusBtn
                  : styles.statusBtn
              }
              onClick={() => checkHandler(`${_statusData.gradeStatus}`)}
            >
              <StatusInput
                id={_statusData.gradeStatus}
                type="radio"
                checked={statusValue === `${_statusData.gradeStatus}`}
                onChange={() => checkHandler(`${_statusData.gradeStatus}`)}
              />
              <label htmlFor={_statusData.gradeStatus} />
              <div className={styles.statusGrade}>
                {_statusData.gradeStatus}급
              </div>
              <div>{_statusData.description}</div>
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
