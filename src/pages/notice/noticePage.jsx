import React, { useState } from "react";

import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import Notice from "./notice";

const NoticePage = (props) => {
  const noticeList = [
    {
      id: 1,
      title: "공지",
      content:
        "공지입니다.\n ㅁㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㄴㅇ럼ㄴ러ㅣㅁㄴ러ㅣㅏㅁ너라ㅣ넘라ㅣ;ㅓㅁㄴㅇ라ㅣ;ㅓㅁ나ㅣ;러ㅣ;ㅁ넝리;먼아ㅣ;럼니;어람너람넝라ㅣ;\nㅁ넝라ㅣ;먼;ㅇ럼ㄴ;아ㅣ러미;나러;ㅁ니ㅓㄹ;ㅏㅣㅁㄴ러ㅏㅣㅁㄴ어라ㅣㅁㄴ어라ㅣㅁ널;ㅏㅣㅁ널;ㅏㅣ널;ㅏ\nㅣㅁ너리;ㅏㅁ너람ㄴ어람ㄴㅇ럼;널",
    },
    { id: 2, title: "공지2", content: "공지입니다." },
  ];

  return (
    <NoticeContainer>
      <HeaderInfo text="공지" />
      {noticeList.map((notice) => (
        <Notice notice={notice} key={notice.id} />
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
