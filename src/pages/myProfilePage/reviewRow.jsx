import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text, Image } from "../../elements";
import { gray, grayBorder, yellow } from "../../shared/colors";
import { timeForToday } from "../../shared/functions";

const ReviewRow = ({ review }) => {
  // 반응형
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);
  const styleProps = { isMobile };

  const starRendering = () => {
    const result = [];
    for (let i = 0; i < review.score; i += 1) {
      result.push(<StarCheckIcon key={i} className="fas fa-star" />);
    }
    for (let i = 0; i < 5 - review.score; i += 1) {
      result.push(<StarIcon key={i + 5} className="far fa-star" />);
    }
    return result;
  };

  return (
    <>
      <UserBox>
        <Image
          shape="circle"
          src={review.writerImageUrl}
          margin="0 10px 0 0"
          size="55px"
        />
        <InfoBox {...styleProps}>
          <Text medium>{review.writerNickName}</Text>
          <Row>
            <RatingBox>{starRendering()}</RatingBox>
            <Text color={gray} size="15px">
              {timeForToday(review.createdAt)}
            </Text>
          </Row>
          <Text size="15px">{review.content}</Text>
        </InfoBox>
      </UserBox>
      <Line />
    </>
  );
};

const UserBox = styled.div`
  display: flex;
`;

const InfoBox = styled.div`
  ${(props) => (props.isMobile ? "width: 200px;" : "width: 250px;")};
  margin-left: 10px;
`;

const Row = styled.div`
  display: felx;
  justify-content: space-between;
  margin: 10px 0;
`;

const RatingBox = styled.div`
  width: 100%;
`;
const StarIcon = styled.i`
  font-size: 16px;
  color: ${grayBorder};
`;
const StarCheckIcon = styled.i`
  font-size: 16px;
  color: ${yellow};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayBorder};
  margin: 18px 0;
`;

export default ReviewRow;
