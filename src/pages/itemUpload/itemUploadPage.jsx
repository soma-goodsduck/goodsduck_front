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
import { actionCreators as userActions } from "../../redux/modules/user";

import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const ItemUpload = (props) => {
  const dispatch = useDispatch();

  const [userJwt, setUserJwt] = useState("");
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const [nextOK, setNextOK] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const requestUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    return result;
  };
  const fnEffect = async () => {
    const userData = await requestUserData();

    if (userData < 0) {
      if (userData === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

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

  const clickTradeType = (e) => {
    if (e.target.innerText === "구매하기") {
      dispatch(newItemActions.setTradeType("BUY"));
    } else if (e.target.innerText === "판매하기") {
      dispatch(newItemActions.setTradeType("SELL"));
    }
  };

  useEffect(() => {
    if (
      (dataName &&
        dataPrice &&
        dataStatus &&
        dataTradeType &&
        dataCategory &&
        idolMember &&
        fileList.length !== 0) ||
      (dataName &&
        dataPrice &&
        dataStatus &&
        dataTradeType &&
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
    dataStatus,
    dataTradeType,
    dataCategory,
    idolMember,
    fileList,
    images,
  ]);

  const uploadItem = () => {
    if (!nextOK) {
      return;
    }

    // 굿즈 등록 또는 업데이트
    if (itemId !== 0) {
      dispatch(newItemActions.updateItemAction(item, itemId, fileList));
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("굿즈를 수정했습니다."));
    } else {
      dispatch(newItemActions.addItemAction(item, fileList));
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("굿즈를 등록했습니다."));
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
          <ItemUploadBox>
            <div>
              <Flex is_flex justify="flex-start">
                <ItemImgUpload />
              </Flex>
              <Flex is_flex justify="space-between">
                <TypeBtn
                  className={
                    dataTradeType === "SELL"
                      ? styles.clickTypeBtn
                      : styles.typeBtn
                  }
                  onClick={(e) => clickTradeType(e)}
                >
                  판매하기
                </TypeBtn>
                <TypeBtn
                  className={
                    dataTradeType === "BUY"
                      ? styles.clickTypeBtn
                      : styles.typeBtn
                  }
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
                    dispatch(newItemActions.clearSelectIdol());
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
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-top: 65px;

  @media screen and (min-width: 415px) {
    height: 93vh;
  }
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
