import React from "react";
import styled from "styled-components";
import { Text } from "../../elements";

import Review from "../../components/review/review";

const ReviewList = ({ reviews }) => {
  return (
    <ReviewBox>
      <Header>
        <Text bold>리뷰 {reviews.length}개</Text>
      </Header>
      {reviews &&
        reviews.map((review, idx) => <Review key={idx} review={review} />)}
    </ReviewBox>
  );
};

const ReviewBox = styled.div`
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export default ReviewList;
