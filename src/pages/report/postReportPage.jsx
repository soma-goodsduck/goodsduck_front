import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Text, Icon, LoginPopUp } from "../../elements";
import ReportDoubleCheckModal from "./reportDoubleCheckModal";
import HeaderInfo from "../../components/haeder/headerInfo";
import { grayBorder } from "../../shared/colors";

import { requestAuthData, postAction } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";

const PostReportPage = (props) => {
  const dispatch = useDispatch();

  const href = window.location.href.split("/");
  const postId = Number(href[href.length - 1]);
  const bcryptForReport = useSelector((state) => state.post.bcryptForReport);

  const [userNick, setUserNick] = useState("");
  const [reports, setReports] = useState([]);
  const [reportId, setReportId] = useState("");
  const [showDoubleCheckModal, setShowDoubleCheckModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const requestCategoryOfReport = async () => {
    const result = await requestAuthData(
      `v1/posts/report-category/${bcryptForReport}`,
    );
    return result;
  };
  const fnEffect = async () => {
    const getCategoryOfReport = await requestCategoryOfReport();
    if (getCategoryOfReport < 0) {
      if (getCategoryOfReport === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    setReports(getCategoryOfReport.reportCategoryList);
    setUserNick(getCategoryOfReport.receiverNickName);
  };
  useEffect(fnEffect, []);

  const reqReport = async () => {
    const json = {
      reportCategoryId: reportId,
      id: String(postId),
      content: "",
      receiverBcryptId: bcryptForReport,
      type: "PostReport",
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
      dispatch(userActions.setNotificationBody("이미 신고된 게시글입니다."));
      return;
    }

    if (report.success) {
      history.goBack();
      dispatch(userActions.setShowNotification(true));
      dispatch(
        userActions.setNotificationBody(
          `${userNick}님의 게시글을 신고했습니다.`,
        ),
      );
    } else {
      window.alert("신고 등록에 실패했습니다.");
    }
  };

  return (
    <>
      {showPopup && <LoginPopUp />}
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
            {userNick}님의 게시물을 신고하는 이유를 선택해주세요.
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
                src="https://goods-duck.com/icon/icon_more.svg"
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

export default PostReportPage;
