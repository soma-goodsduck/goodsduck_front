/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./itemDetail.module.css";

import { Flex, Image } from "../../elements/index";
import { postAction, deleteAction } from "../../shared/axios";

const ItemImg = ({ id, item, onClick }) => {
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const history = useHistory();
  const goBack = () => {
    history.push("/");
  };

  const [isLike, setIsLike] = useState(item.isLike);
  const clickHeart = () => {
    if (!isLike) {
      postAction(`v1/items/${id}/like`);
    } else {
      deleteAction(`v1/items/${id}/like`);
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
    if (item.images.length === 1) {
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
        className={isLike ? styles.clickLikeBtn : styles.likeBtn}
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
      <span className={styles.watermark}>
        ⓒ GOODSDUCK ({item.itemOwner.nickName})
      </span>
    </Flex>
  );
};

export default ItemImg;
