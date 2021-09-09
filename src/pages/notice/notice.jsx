import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon, Text } from "../../elements";
import { grayBorder } from "../../shared/colors";

const Notice = ({ notice }) => {
  const [iconUrl, setIconUrl] = useState("noticeDown");
  const [isOpen, setIsOpen] = useState(false);
  const [descHeight, setDescHegiht] = useState(0);

  const hadnleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setIconUrl("noticeUp");
    } else {
      setIconUrl("noticeDown");
    }

    const findEnter = notice.content.match(/[\n]/g);
    if (findEnter) {
      let _descHeingt = 0;
      const _desc = notice.content.split("\n");
      const numOfEnter = findEnter.length;
      console.log(_desc, numOfEnter);

      for (let i = 0; i < numOfEnter + 1; i += 1) {
        if (_desc[i].length / 20 > 1) {
          _descHeingt += Math.ceil(_desc[i].length / 20);
        }
      }

      _descHeingt += numOfEnter;
      setDescHegiht(_descHeingt);
    } else {
      const countOfLetter = notice.content.length;
      if (countOfLetter / 20 > 1) {
        setDescHegiht(Math.floor(countOfLetter / 20));
      }
    }
  }, [isOpen]);

  return (
    <>
      <NoticeBox
        onClick={() => {
          hadnleClick();
        }}
      >
        <NoticeTitle>
          <Text>{notice.title}</Text>
          <Icon
            width="16px"
            src={`https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_${iconUrl}.svg`}
          />
        </NoticeTitle>
        {isOpen && (
          <NoticeBody
            value={notice.content}
            readOnly
            style={{ height: `${30 + descHeight * 25}px` }}
          />
        )}
      </NoticeBox>
    </>
  );
};

const NoticeBox = styled.div`
  cursor: pointer;
  border-bottom: 1px solid ${grayBorder};
`;

const NoticeTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 15px;
  background-color: #ffffff;
`;

const NoticeBody = styled.textarea`
  width: 100%;
  resize: none;
  line-height: 1.5;
  padding: 0 15px;
  background-color: #ffffff;
`;

export default Notice;
