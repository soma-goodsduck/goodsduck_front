import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Icon, Text, Flex } from "../../elements";
import { grayBorder, grayText } from "../../shared/colors";

const Notice = ({ notice, date }) => {
  const screen = window.screen.width;
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
          <Flex is_col align="flex-start">
            <Text color={grayText} size="13px" margin="0 0 8px 0">
              {date}
            </Text>
            <Text>{notice.title}</Text>
          </Flex>
          <Icon
            width="18px"
            src={`https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_${iconUrl}.svg`}
          />
        </NoticeTitle>
        {isOpen && !notice.content.includes("goodsduck-s3") && (
          <NoticeBody
            value={notice.content}
            readOnly
            style={{ height: `${30 + descHeight * 15}px` }}
          />
        )}
        {isOpen && notice.content.includes("goodsduck-s3") && (
          <NoticeImgBody
            src={notice.content}
            width={screen > 415 ? "415px" : "100vw"}
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

const NoticeImgBody = styled.img`
  width: ${(props) => props.width};
  src: ${(props) => props.src};
`;

export default Notice;
