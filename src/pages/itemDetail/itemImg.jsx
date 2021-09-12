/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import styles from "./itemDetail.module.css";

import { Flex } from "../../elements/index";
import { postAction, deleteAction } from "../../shared/axios";

const ItemImg = ({ id, item, onClick }) => {
  const history = useHistory();
  const goBack = () => {
    history.push("/");
  };

  const [isLike, setIsLike] = useState(item.isLike);
  const reqClickHeart = async () => {
    const result = await postAction(`v1/items/${id}/like`);
    return result;
  };
  const reqUnclickHeart = async () => {
    const result = await deleteAction(`v1/items/${id}/like`);
    return result;
  };

  const clickHeart = async () => {
    if (!isLike) {
      const clickAction = await reqClickHeart();
      if (clickAction < 0) {
        history.push("/error");
        return;
      }
    } else {
      const clickAction = await reqUnclickHeart();
      if (clickAction < 0) {
        history.push("/error");
        return;
      }
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
      <div className={styles.imgDataBox}>
        <Img src={item.images[imgNumber].url} className={styles.itemImg} />
        <span className={styles.watermark}>
          ⓒ GOODSDUCK ({item.itemOwner.nickName})
        </span>
      </div>
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
    </Flex>
  );
};

const Img = styled.div`
  width: 100vw;
  height: 100vw;

  background-image: url("${(props) => props.src}");
  background-size: cover;

  @media screen and (min-width: 415px) {
    width: 415px;
    height: 415px;
  }
`;

export default ItemImg;
