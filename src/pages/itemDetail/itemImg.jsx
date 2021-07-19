import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Sentry from "@sentry/react";

import styles from "./itemDetail.module.css";

import { Flex, Image, Icon } from "../../elements/index";
import { getAction, deleteAction } from "../../shared/axios";

const ItemImg = ({ id, item, onClick }) => {
  console.log(item);

  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  const [isLike, setIsLike] = useState(item.like);
  const clickHeart = () => {
    try {
      // 좋아요
      if (!isLike) {
        getAction(`like/item/${id}`);
      } else {
        deleteAction(`like/item/${id}`);
      }
    } catch (error) {
      console.log("error", error);
      Sentry.captureException(error);
    }
    setIsLike(!isLike);
  };

  const clickDots = () => {
    onClick();
  };

  const [showPreviousImgBtn, setShowPreviousImgBtn] = useState(true);
  const [showNextImgBtn, setShowNextImgBtn] = useState(true);
  const [imgNumber, setImgNumber] = useState(0);

  const imgClickHandler = (type) => {
    if (type === "previous" && imgNumber > 0) {
      setImgNumber(imgNumber - 1);
      setShowNextImgBtn(true);
    } else if (type === "next" && imgNumber < item.images.length - 1) {
      setImgNumber(imgNumber + 1);
      setShowPreviousImgBtn(true);
    }
  };
  useEffect(() => {
    if (item.images.length === 0) {
      setShowPreviousImgBtn(false);
      setShowNextImgBtn(false);
    }
    if (imgNumber === 0) {
      setShowPreviousImgBtn(false);
    } else if (imgNumber === item.images.length - 1) {
      setShowNextImgBtn(false);
    }
  }, [imgNumber]);

  return (
    <Flex className={styles.imgBox}>
      <Image
        shape="rectangle"
        src={item.images[imgNumber].url}
        size={isMobile ? `${screen}px` : "415px"}
        className={styles.itemImg}
      />
      <button
        type="button"
        aria-label="back"
        className={styles.backBtn}
        onClick={() => {
          goBack();
        }}
      />
      <button
        type="button"
        aria-label="like"
        className={item.like ? styles.clickLikeBtn : styles.likeBtn}
        onClick={() => clickHeart()}
      />
      <button
        type="button"
        aria-label="info"
        className={styles.infoBtn}
        onClick={() => clickDots()}
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
    </Flex>
  );
};

export default ItemImg;
