/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import HeaderInfo from "../../components/haeder/headerInfo";
import { Spinner } from "../../elements";

import { requestPublicData } from "../../shared/axios";
import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { history } from "../../redux/configureStore";

const ItemStatus = () => {
  const dispatch = useDispatch();
  const statusValue = useSelector((state) => state.newItem.status_grade);
  const [isLoading, setIsLoading] = useState(true);

  // 상품상태 데이터 받아오기
  const [statuses, setStatuses] = useState([]);

  const reqItemStatusCategory = async () => {
    const result = await requestPublicData("v1/items/grade-status");
    return result;
  };
  const fnEffect = async () => {
    const getItemStatusCategory = await reqItemStatusCategory();
    setIsLoading(false);
    if (getItemStatusCategory < 0) {
      history.push("/error");
      return;
    }
    setStatuses(getItemStatusCategory);
  };
  useEffect(fnEffect, []);

  const checkHandler = (grade) => {
    dispatch(newItemActions.setStatus(grade));
    history.push("/upload-item");
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <Outer>
          <HeaderInfo text="굿즈 상태" isUploading />
          <StatusContainer>
            <div>
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
                  <div className={styles.statusGrade}>
                    {status.gradeStatus}급
                  </div>
                  <div>{status.description}</div>
                </StatusBox>
              ))}
            </div>
          </StatusContainer>
        </Outer>
      )}
    </>
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
