import React, { useEffect, useState } from "react";

import styled from "styled-components";
import styles from "./postDetail.module.css";

const PostImg = ({ images }) => {
  const screen = window.screen.width;
  // 이미지 스와이프
  const [showPreviousImgBtn, setShowPreviousImgBtn] = useState(true);
  const [showNextImgBtn, setShowNextImgBtn] = useState(true);
  const [imgNumber, setImgNumber] = useState(0);

  const imgClickHandler = (type) => {
    if (type === "previous" && imgNumber > 0) {
      setImgNumber(imgNumber - 1);
      setShowNextImgBtn(true);
    } else if (type === "next" && imgNumber < images.length - 1) {
      setImgNumber(imgNumber + 1);
      setShowPreviousImgBtn(true);
    }
  };
  useEffect(() => {
    if (images.length === 1) {
      setShowPreviousImgBtn(false);
      setShowNextImgBtn(false);
    }
    if (imgNumber === 0) {
      setShowPreviousImgBtn(false);
    } else if (imgNumber === images.length - 1) {
      setShowNextImgBtn(false);
    }
  }, [imgNumber]);

  return (
    <>
      <div className={styles.imgBox}>
        <Img
          src={images[imgNumber].url}
          size={screen - 40}
          className={styles.postImg}
        />
        <button
          type="button"
          aria-label="previous img"
          className={showPreviousImgBtn ? styles.previousImgBtn : ""}
          onClick={() => imgClickHandler("previous")}
        />
        <button
          type="button"
          aria-label="next img"
          className={showNextImgBtn ? styles.nextImgBtn : ""}
          onClick={() => imgClickHandler("next")}
        />
      </div>
    </>
  );
};

const Img = styled.div`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  background-image: url("${(props) => props.src}");
  background-size: cover;

  @media screen and (min-width: 415px) {
    width: 375px;
    height: 375px;
  }
`;

export default PostImg;
