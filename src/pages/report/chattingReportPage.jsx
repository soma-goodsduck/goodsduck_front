import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Text, Icon } from "../../elements";
import ReportDoubleCheckModal from "./reportDoubleCheckModal";
import HeaderInfo from "../../components/haeder/headerInfo";
import { grayBorder } from "../../shared/colors";

import { requestAuthData, postAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const ChattingReportPage = (props) => {
  const href = window.location.href.split("/");
  const bcrypt = href[href.length - 1];
  const chatroomId = href[href.length - 2];

  const [nick, setNick] = useState("");
  const [reports, setReports] = useState([]);
  const [reportId, setReportId] = useState("");
  const [showDoubleCheckModal, setShowDoubleCheckModal] = useState(false);

  const requestCategoryOfReport = async () => {
    const result = await requestAuthData(`v1/chats/report-category/${bcrypt}`);
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

  const reqReport = async () => {
    const json = {
      reportCategoryId: reportId,
      id: chatroomId,
      content: "",
      receiverBcryptId: bcrypt,
      type: "ChatReport",
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
      window.alert("이미 신고된 채팅방입니다.");
      history.goBack();
      return;
    }

    if (report.success) {
      window.alert(`${nick}님과의 채팅을 신고했습니다.`);
      history.goBack();
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
        <HeaderInfo text="신고하기" padding="0 16px" />
        <TextBox>
          <Text margin="10px 15px" medium>
            {nick}님과의 채팅을 신고하는 이유를 선택해주세요.
          </Text>
        </TextBox>
        {reports &&
          reports.map((report) => (
            <ReportBox
              key={report.categoryId}
              onClick={() => {
                setReportId(report.categoryId);
                setShowDoubleCheckModal(true);
              }}
            >
              <ReportInput id={report.categoryId} type="radio" />
              <label htmlFor={report.categoryId}>{report.categoryName}</label>
              <Icon
                width="12px"
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_more.svg"
              />
            </ReportBox>
          ))}
      </ReportContainer>
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
  padding: 10px 0;
  background-color: #f8f8f8;
  display: flex;
  align-items: flex-end;
`;

export default ChattingReportPage;
