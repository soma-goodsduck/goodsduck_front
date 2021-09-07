import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Text, Icon } from "../../elements";
import ReportDoubleCheckModal from "./reportDoubleCheckModal";
import HeaderInfo from "../../components/haeder/headerInfo";
import { grayBorder } from "../../shared/colors";

import {
  requestPublicData,
  requestAuthData,
  postAction,
} from "../../shared/axios";
import { history } from "../../redux/configureStore";

const ItemReportPage = (props) => {
  const href = window.location.href.split("/");
  const bcrypt = href[href.length - 1];
  const itemId = Number(href[href.length - 2]);

  const [itemData, setItemData] = useState(null);
  const [reports, setReports] = useState([]);
  const [reportId, setReportId] = useState("");
  const [showDoubleCheckModal, setShowDoubleCheckModal] = useState(false);

  const requestItemData = async () => {
    const result = await requestPublicData(`v1/items/${itemId}/summary`);
    return result;
  };
  const requestCategoryOfReport = async () => {
    const result = await requestAuthData(`v1/items/report-category/${bcrypt}`);
    return result;
  };
  const fnEffect = async () => {
    const getCategoryOfReport = await requestCategoryOfReport();
    const getItemData = await requestItemData();
    console.log(getCategoryOfReport);

    setReports(getCategoryOfReport.reportCategoryList);
    setItemData(getItemData);
  };
  useEffect(fnEffect, []);

  const reportHandler = () => {
    const json = {
      reportCategoryId: reportId,
      id: String(itemId),
      content: "",
      receiverBcryptId: bcrypt,
      type: "ItemReport",
    };

    const report = postAction("v1/users/report", json);
    report
      .then((result) => {
        if (result.response.isExist) {
          window.alert("이미 신고된 굿즈입니다.");
          history.goBack();
          return;
        }

        if (result.success) {
          window.alert(`${itemData.name} 굿즈를 신고했습니다.`);
          history.goBack();
        } else {
          window.alert("신고 등록에 실패했습니다.");
        }
      })
      .catch(() => {
        window.alert(
          "네트워크 장애가 발생했습니다. 잠시 후 다시 시도해주세요.",
        );
        history.goBack();
      });
  };

  return (
    <>
      {showDoubleCheckModal && (
        <ReportDoubleCheckModal
          text="정말로 신고하시겠습니까?"
          onOkClick={reportHandler}
        />
      )}

      {itemData && (
        <ReportContainer>
          <HeaderInfo text="신고하기" padding="0 16px" />
          <TextBox>
            <Text margin="10px 15px" medium>
              &quot;{itemData.name}&quot; 굿즈를 신고하는 이유를 선택해주세요.
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
  padding: 10px 0;
  background-color: #f8f8f8;
  display: flex;
  align-items: flex-end;
`;

export default ItemReportPage;
