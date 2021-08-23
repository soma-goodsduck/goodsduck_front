import React from "react";
import styled from "styled-components";
import { Text, Image } from "../../elements";
import { gray, grayBorder, yellow } from "../../shared/colors";
import { timeForToday } from "../../shared/functions";

const ReviewRow = ({ review }) => {
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
      <ReviewBox>
        <Image
          shape="circle"
          src={
            review.writerImageUrl ||
            "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
          }
          margin="0 10px 0 0"
          size="55px"
        />
        <InfoBox>
          <Text medium>{review.writerNickName}</Text>
          <Row>
            <RatingBox>{starRendering()}</RatingBox>
            <Text color={gray} size="15px">
              {timeForToday(review.createdAt)}
            </Text>
          </Row>
          <Text size="15px">{review.content}</Text>
        </InfoBox>
      </ReviewBox>
    </>
  );
};

const ReviewBox = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const InfoBox = styled.div`
  width: 200px;
  margin-left: 10px;

  @media screen and (min-width: 415px) {
    width: 250px;
  }
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

export default ReviewRow;
