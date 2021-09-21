import React, { useEffect, useState } from "react";

import styled from "styled-components";
import HeaderInfo from "../../components/haeder/headerInfo";
import Notice from "./notice";

import { requestPublicData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const NoticePage = (props) => {
  const [noticeList, setNoticeList] = useState([]);

  const sliceDateString = (createdAt) => {
    return createdAt.substr(0, 10);
  };
  const requestNotices = async () => {
    const result = await requestPublicData("v1/notices");
    return result;
  };
  const fnEffect = async () => {
    const getNotices = await requestNotices();

    if (getNotices < 0) {
      history.push("/error");
    }

    setNoticeList(getNotices);
  };
  useEffect(fnEffect, []);

  return (
    <NoticeContainer>
      <HeaderInfo text="공지" />
      {noticeList.map((notice) => (
        <Notice
          notice={notice}
          key={notice.id}
          date={sliceDateString(notice.createdAt)}
        />
      ))}
    </NoticeContainer>
  );
};

const NoticeContainer = styled.div`
  margin-top: 55px;
  height: 100vh;
  background-color: #f8f8f8;
`;

export default NoticePage;
