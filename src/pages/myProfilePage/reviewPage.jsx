import React, { useState, useEffect } from "react";
import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import Review from "../../components/review/review";
import { Spinner } from "../../elements";

import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const ReviewPage = (props) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const requestReviews = async () => {
    const result = await requestAuthData("v1/users/reviews");
    return result;
  };
  const fnEffect = async () => {
    setIsLoading(true);

    const _reviews = await requestReviews();
    if (_reviews < 0) {
      history.push("/error");
      return;
    }

    setIsLoading(false);
    setReviews(_reviews);
  };
  useEffect(fnEffect, []);

  return (
    <>
      <HeaderInfo text="리뷰" padding="0 16px" />
      {isLoading && <Spinner />}
      {reviews.length === 0 && (
        <Notice>
          <Text>아직 작성된 리뷰가 없습니다!</Text>
        </Notice>
      )}
      <ReviewBox>
        {reviews &&
          reviews.map((review, idx) => <Review key={idx} review={review} />)}
      </ReviewBox>
    </>
  );
};

const ReviewBox = styled.div`
  overflow-y: auto;
  height: 95vh;
  margin-top: 40px;
  padding: 20px;
`;

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const Text = styled.div`
  padding: 7px 0;
  font-weight: 500;
`;

export default ReviewPage;
