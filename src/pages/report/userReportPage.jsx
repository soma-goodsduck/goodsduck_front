import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./report.module.css";

import { Text, Icon } from "../../elements";
import ReportDoubleCheckModal from "./reportDoubleCheckModal";
import HeaderInfo from "../../components/haeder/headerInfo";
import { grayBorder, white } from "../../shared/colors";

import { requestAuthData, postAction } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";

const UserReportPage = (props) => {
  const dispatch = useDispatch();

  const href = window.location.href.split("/");
  const bcrypt = href[href.length - 1];
  const [nick, setNick] = useState("");
  const [reports, setReports] = useState([]);
  const [showDoubleCheckModal, setShowDoubleCheckModal] = useState(false);

  const [reportId, setReportId] = useState("");
  const [reportContent, setReportContent] = useState("");
  const reportRef = useRef();
  const [nextOK, setNextOK] = useState(false);

  const requestCategoryOfReport = async () => {
    const result = await requestAuthData(`v1/users/report-category/${bcrypt}`);
    return result;
  };
  const fnEffect = async () => {
    const getCategoryOfReport = await requestCategoryOfReport();

    if (getCategoryOfReport < 0) {
      history.push("/error");
      return;
    }
    setReports(getCategoryOfReport.reportCategoryList);
    setNick(getCategoryOfReport.receiverNickName);
  };
  useEffect(fnEffect, []);

  useEffect(() => {
    if (reportId !== "" && reportContent !== "") {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [reportId, reportContent]);

  const reqReport = async () => {
    const json = {
      reportCategoryId: reportId,
      id: bcrypt,
      content: reportContent,
      receiverBcryptId: bcrypt,
      type: "UserReport",
    };
    const result = await postAction("v1/users/report", json);
    return result;
  };
  const reportHandler = async () => {
    const report = await reqReport();

    if (report < 0) {
      history.push("/error");
      return;
    }

    if (report.response.isExist) {
      history.goBack();
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("이미 신고된 유저입니다."));
      return;
    }

    if (report.success) {
      history.goBack();
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody(`${nick}님을 신고했습니다.`));
    } else {
      window.alert("신고 등록에 실패했습니다.");
    }
  };

  return (
    <>
      {showDoubleCheckModal && (
        <ReportDoubleCheckModal
          text="정말로 신고하시겠습니까?"
          onOkClick={reportHandler}
        />
      )}

      <ReportContainer>
        <div>
          <HeaderInfo text="신고하기" padding="0 16px" />
          <TextBox>
            <Text margin="10px 15px" medium>
              {nick}님을 신고하는 이유를 선택해주세요.
            </Text>
          </TextBox>
          {reports &&
            reports.map((report) => (
              <ReportBox
                key={report.categoryId}
                onClick={() => {
                  setReportId(report.categoryId);
                }}
              >
                <ReportInput
                  className={styles.reportInput}
                  id={report.categoryId}
                  type="radio"
                  checked={reportId === report.categoryId}
                  onChange={() => setReportId(report.categoryId)}
                />
                <label
                  className={styles.reportLabel}
                  htmlFor={report.categoryId}
                >
                  {report.categoryName}
                </label>
                <Icon
                  width="12px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
                />
              </ReportBox>
            ))}
          <ReportTextBox
            placeholder="신고 이유를 작성해주세요"
            ref={reportRef}
            onChange={() => {
              setReportContent(reportRef.current.value);
            }}
          />
        </div>
        <button
          className={nextOK ? styles.nextOKBtn : styles.nextBtn}
          type="button"
          onClick={() => {
            setShowDoubleCheckModal(true);
          }}
        >
          다음
        </button>
      </ReportContainer>
    </>
  );
};

const ReportContainer = styled.div`
  margin-top: 55px;
  height: 100vh;
  background-color: ${white};
`;
const ReportBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 15px;
  background-color: #ffffff;
  cursor: pointer;
  border-top: 1px solid ${grayBorder};

  &:last-child {
    border-top: 1px solid ${grayBorder};
    border-bottom: 1px solid ${grayBorder};
  }
`;
const ReportInput = styled.input`
  display: none;
`;
const TextBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: #f8f8f8;
  display: flex;
  align-items: flex-end;
`;

const ReportTextBox = styled.textarea`
  width: 95%;
  height: 100px;
  font-size: 14px;
  margin: 10px;
  margin-top: 20px;
  padding: 10px;
  border: 2px solid ${grayBorder};

  &::placeholder {
    font-size: 14px;
  }
`;

export default UserReportPage;
