/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Flex, LoginPopUp } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";
import ItemImgUpload from "../../components/itemImgUpload/itemImgUpload";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { actionCreators as imgActions } from "../../redux/modules/image";

import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const ItemUpload = (props) => {
  // 반응형
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);
  const styleProps = { isMobile };

  const dispatch = useDispatch();

  const [userJwt, setUserJwt] = useState("");
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const [tradeType, setTradeType] = useState("SELL");
  const [isSelling, setIsSelling] = useState(true);
  const [nextOK, setNextOK] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const requestUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    if (result === "login") {
      setShowPopup(true);
    }
    return result;
  };
  const fnEffect = async () => {
    const userData = await requestUserData();
    setUserJwt(userData.jwt);
  };
  useEffect(fnEffect, []);

  const {
    dataName,
    dataPrice,
    dataDesc,
    dataCategory,
    dataTradeType,
    dataStatus,
    idolMember,
    idolMemberName,
    idolGroupName,
    images,
    fileList,
    itemId,
  } = useSelector((state) => ({
    dataName: state.newItem.name,
    dataPrice: state.newItem.price,
    dataDesc: state.newItem.description,
    dataCategory: state.newItem.category,
    dataTradeType: state.newItem.trade_type,
    dataStatus: state.newItem.status_grade,
    idolMember: state.newItem.idol_member_id,
    idolMemberName: state.newItem.idol_member_name,
    idolGroupName: state.newItem.idol_group_name,
    images: state.newItem.images,
    fileList: state.image.fileList,
    itemId: state.newItem.item_id,
  }));

  const item = {
    userJwt,
    dataName,
    dataPrice,
    dataDesc,
    dataTradeType,
    dataStatus,
    dataCategory,
    idolMember,
    images,
    fileList,
  };

  // 입력값이 변할때마다 상태값에 저장
  useEffect(() => {
    dispatch(newItemActions.setTradeType(tradeType));
    // 판매하기와 구매하기 선택값 유지
    if (dataTradeType === "BUY") {
      setIsSelling(false);
    } else if (dataTradeType === "SELL") {
      setIsSelling(true);
    }
  }, [tradeType]);

  const clickTradeType = (e) => {
    if (e.target.innerText === "구매하기") {
      setTradeType("BUY");
      setIsSelling(false);
    } else {
      setTradeType("SELL");
      setIsSelling(true);
    }
  };

  useEffect(() => {
    if (
      (dataName &&
        dataPrice &&
        dataTradeType &&
        dataStatus &&
        dataCategory &&
        idolMember &&
        fileList.length !== 0) ||
      (dataName &&
        dataPrice &&
        dataTradeType &&
        dataStatus &&
        dataCategory &&
        idolMember &&
        images.length !== 0)
    ) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [
    dataName,
    dataPrice,
    dataTradeType,
    dataStatus,
    dataCategory,
    idolMember,
    fileList,
  ]);

  const uploadItem = () => {
    if (!nextOK) {
      return;
    }

    // 굿즈 등록 또는 업데이트
    if (itemId !== 0) {
      dispatch(newItemActions.updateItemAction(item, itemId, fileList));
    } else {
      dispatch(newItemActions.addItemAction(item, fileList));
    }

    // 저장된 상태값 모두 삭제
    dispatch(newItemActions.clearAction());
    dispatch(imgActions.clearImgAction());
  };

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <div>
          <HeaderInfo text="굿즈 등록" isClear />
          <ItemUploadBox {...styleProps}>
            <div>
              <Flex is_flex justify="flex-start">
                <ItemImgUpload />
              </Flex>
              <Flex is_flex justify="space-between">
                <TypeBtn
                  className={isSelling ? styles.clickTypeBtn : styles.typeBtn}
                  onClick={(e) => clickTradeType(e)}
                >
                  판매하기
                </TypeBtn>
                <TypeBtn
                  className={isSelling ? styles.typeBtn : styles.clickTypeBtn}
                  onClick={(e) => clickTradeType(e)}
                >
                  구매하기
                </TypeBtn>
              </Flex>
              <Flex is_col>
                <div className={styles.selectBtn}>
                  <InputBox
                    className={dataName ? "" : styles.inputText}
                    ref={nameRef}
                    value={dataName || ""}
                    placeholder="굿즈명"
                    onChange={() => {
                      dispatch(newItemActions.setName(nameRef.current.value));
                    }}
                  />
                  <div
                    className={
                      dataName ? styles.moreIconClick : styles.moreIcon
                    }
                  />
                </div>
                <div
                  className={styles.selectBtn}
                  onClick={() => {
                    history.replace("/select-idol");
                  }}
                >
                  <div
                    className={
                      idolMember !== null
                        ? styles.selectDoneText
                        : styles.selectText
                    }
                  >
                    {idolMember !== null
                      ? `${idolGroupName} ${idolMemberName}`
                      : "아이돌 그룹 & 멤버"}
                  </div>
                  <div
                    className={
                      idolMember ? styles.moreIconClick : styles.moreIcon
                    }
                  />
                </div>
                <div
                  className={styles.selectBtn}
                  onClick={() => {
                    history.replace("/category");
                  }}
                >
                  <div
                    className={
                      dataCategory !== ""
                        ? styles.selectDoneText
                        : styles.selectText
                    }
                  >
                    {dataCategory !== "" ? dataCategory : "카테고리"}
                  </div>
                  <div
                    className={
                      dataCategory ? styles.moreIconClick : styles.moreIcon
                    }
                  />
                </div>
                <div
                  className={styles.selectBtn}
                  onClick={() => {
                    history.replace("/status");
                  }}
                >
                  <div
                    className={
                      dataStatus !== ""
                        ? styles.selectDoneText
                        : styles.selectText
                    }
                  >
                    {dataStatus !== "" ? `${dataStatus}급` : "굿즈 상태"}
                  </div>
                  <div
                    className={
                      dataStatus ? styles.moreIconClick : styles.moreIcon
                    }
                  />
                </div>
                <div className={styles.selectBtn}>
                  <InputDescBox
                    className={dataDesc ? "" : styles.inputText}
                    ref={descriptionRef}
                    value={dataDesc || ""}
                    placeholder="굿즈 설명"
                    onChange={() => {
                      dispatch(
                        newItemActions.setDesc(descriptionRef.current.value),
                      );
                    }}
                  />
                  <div
                    className={
                      dataDesc ? styles.moreIconClick : styles.moreIcon
                    }
                  />
                </div>
                <div className={styles.selectBtn}>
                  <div
                    className={
                      dataPrice ? styles.selectDoneText : styles.selectText
                    }
                  >
                    ₩
                  </div>
                  <InputBox
                    className={dataPrice ? "" : styles.inputText}
                    ref={priceRef}
                    value={dataPrice || ""}
                    type="number"
                    placeholder="가격 입력"
                    onChange={() => {
                      dispatch(newItemActions.setPrice(priceRef.current.value));
                    }}
                  />
                  <div
                    className={
                      dataPrice ? styles.moreIconClick : styles.moreIcon
                    }
                  />
                </div>
              </Flex>
            </div>
            <AddBtn
              className={nextOK ? styles.nextOKBtn : styles.nextBtn}
              onClick={() => {
                uploadItem();
              }}
            >
              {itemId !== 0 ? "수정 완료" : "등록 완료"}
            </AddBtn>
          </ItemUploadBox>
        </div>
      )}
    </>
  );
};

const ItemUploadBox = styled.div`
  ${(props) => (props.isMobile ? "height: 90vh;" : "height: 93vh;")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-top: 65px;
`;

const TypeBtn = styled.button`
  width: 50%;
  padding: 15px;
`;

const InputBox = styled.input`
  width: 100%;
`;
const InputDescBox = styled.textarea`
  width: 100%;
  height: 100%;
  min-height: 100px;
  resize: vertical;
`;

const AddBtn = styled.button`
  margin-top: 10px;
`;

export default ItemUpload;
