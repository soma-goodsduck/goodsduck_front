import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Text, Icon, LoginPopUp } from "../../elements";

import HeaderInfo from "../../components/haeder/headerInfo";
import { grayBorder } from "../../shared/colors";

import { requestAuthData, postAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const ReportPage = (props) => {
  const href = window.location.href.split("/");
  const bcrypt = href[href.length - 1];
  const [nick, setNick] = useState("");
  const [reports, setReports] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const requestCategoryOfReport = async () => {
    const result = await requestAuthData(`v1/category-report/users/${bcrypt}`);
    if (result === "login") {
      setShowPopup(true);
    }
    return result;
  };
  const fnEffect = async () => {
    const getCategoryOfReport = await requestCategoryOfReport();

    setReports(getCategoryOfReport.categoryReports);
    setNick(getCategoryOfReport.receiverNickName);
  };
  useEffect(fnEffect, []);

  const checkHandler = (_report) => {
    const json = {
      categoryReportId: _report.id,
      content: _report.content,
      receiverBcryptId: bcrypt,
    };
    const report = postAction("v1/users/report", json);
    report.then((result) => {
      if (result.response.isExist) {
        window.alert("이미 신고된 유저입니다.");
        history.goBack();
        return;
      }

      if (result.success) {
        window.alert(`${nick}님을 신고했습니다.`);
        history.goBack();
      } else {
        window.alert("신고 등록에 실패했습니다.");
      }
    });
  };

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <ReportContainer>
          <HeaderInfo text="신고하기" padding="0 16px" />
          <TextBox>
            <Text margin="10px 15px" medium>
              {nick}님을 신고하는 이유를 선택해주세요.
            </Text>
          </TextBox>
          {reports &&
            reports.map((report) => (
              <ReportBox key={report.id} onClick={() => checkHandler(report)}>
                <ReportInput
                  id={report.id}
                  type="radio"
                  // onChange={() => checkHandler(report)}
                />
                <label htmlFor={report.id}>{report.content}</label>
                <Icon
                  width="12px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
                />
              </ReportBox>
            ))}
        </ReportContainer>
      )}
    </>
  );
};

const ReportContainer = styled.div`
  margin-top: 55px;
  height: 100vh;
  background-color: #f8f8f8;
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

export default ReportPage;
