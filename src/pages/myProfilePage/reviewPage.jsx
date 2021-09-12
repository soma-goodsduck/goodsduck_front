import React, { useState, useEffect } from "react";
import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import Review from "../../components/review/review";

import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const ReviewPage = (props) => {
  const [reviews, setReviews] = useState([]);
  const requestReviews = async () => {
    const result = await requestAuthData("v1/users/reviews");
    return result;
  };
  const fnEffect = async () => {
    const _reviews = await requestReviews();
    if (_reviews < 0) {
      history.push("/error");
      return;
    }
    setReviews(_reviews);
  };
  useEffect(fnEffect, []);

  return (
    <>
      <HeaderInfo text="리뷰" padding="0 16px" />
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

export default ReviewPage;
