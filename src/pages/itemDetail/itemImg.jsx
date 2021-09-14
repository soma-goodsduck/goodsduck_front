/* eslint-disable indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";

import styled from "styled-components";
import styles from "./itemDetail.module.css";

import { Flex } from "../../elements/index";
import { postAction, deleteAction } from "../../shared/axios";

import { actionCreators as itemActions } from "../../redux/modules/item";
import { history } from "../../redux/configureStore";
import { grayBorder } from "../../shared/colors";

const ItemImg = ({ id, item, onClick }) => {
  const dispatch = useDispatch();

  // scroll에 따른 btn 배경색 설정
  const screenWidth = window.screen.width;
  const [scrollHeight, setScrollHeight] = useState("");
  const [isOverImg, setIsOverImg] = useState(false);
  const [isSwipeBtnOverImg, setIsSwipeBtnOverImg] = useState(false);

  const _handleScroll = _.throttle(() => {
    const _img = document.querySelector("#itemImg");
    const _scrollHeight = Math.abs(_img.getBoundingClientRect().top);
    setScrollHeight(_scrollHeight);
  }, 300);
  const handleScroll = useCallback(_handleScroll, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  useEffect(() => {
    if (scrollHeight > screenWidth - 40) {
      setIsOverImg(true);
    } else {
      setIsOverImg(false);
    }

    if (scrollHeight > screenWidth - 230) {
      setIsSwipeBtnOverImg(true);
    } else {
      setIsSwipeBtnOverImg(false);
    }
  }, [scrollHeight]);

  // 찜 버튼
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

  // 이미지 스와이프
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
      <div className={styles.imgDataBox} id="itemImg">
        <Img src={item.images[imgNumber].url} className={styles.itemImg} />
        <span className={styles.watermark}>
          ⓒ GOODSDUCK ({item.itemOwner.nickName})
        </span>
      </div>
      <Btns
        style={
          isOverImg
            ? {
                backgroundColor: "#ffffff",
                borderBottom: `1px solid ${grayBorder}`,
              }
            : { backgroundColor: "" }
        }
      >
        <button
          type="button"
          aria-label="back"
          className={isOverImg ? styles.backBtnBlack : styles.backBtn}
          onClick={() => {
            history.push("/");
            dispatch(itemActions.clearPriceProposeInfo());
          }}
        />
        <div>
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
        </div>
      </Btns>
      {!isSwipeBtnOverImg && (
        <>
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
        </>
      )}
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

const Btns = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  z-index: 10;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

export default ItemImg;
