/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Flex, Image, Icon } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { actionCreators as imgActions } from "../../redux/modules/image";

import ItemImgUpload from "../../components/itemImgUpload/itemImgUpload";
import { history } from "../../redux/configureStore";

const ItemUpload = (props) => {
  const dispatch = useDispatch();

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const [tradeType, setTradeType] = useState("SELL");
  const [isSelling, setIsSelling] = useState(true);
  const [nextOK, setNextOK] = useState(false);

  // 기존에 저장된 상태값 가져오기
  const userJwt = localStorage.getItem("jwt");

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
    fileList,
    preview,
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
    fileList: state.image.fileList,
    preview: state.image.preview,
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
  };

  // 입력값이 변할때마다 상태값에 저장
  useEffect(() => {
    dispatch(newItemActions.setTradeTypeAction(tradeType));
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
      dataName &&
      dataPrice &&
      dataTradeType &&
      dataStatus &&
      dataCategory &&
      idolMember &&
      fileList.length !== 0
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
    dispatch(newItemActions.addItemAction(item, fileList));

    // 저장된 상태값 모두 삭제
    dispatch(newItemActions.clearAction());
    dispatch(imgActions.clearImgAction());
  };

  return (
    <ItemUploadBox>
      <HeaderInfo text="굿즈 등록" isClear />
      <div>
        <Flex is_flex justify="flex-start">
          <ItemImgUpload />

          {/* <Image
            shape="rectangle"
            size="80px"
            src={preview || ""}
            margin="0 10px 10px 10px"
          /> */}
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
            <InputNameBox
              className={dataName ? "" : styles.inputText}
              ref={nameRef}
              value={dataName || ""}
              placeholder="굿즈명"
              onChange={() => {
                dispatch(newItemActions.setNameAction(nameRef.current.value));
              }}
            />
            <div
              className={dataName ? styles.moreIconClick : styles.moreIcon}
            />
          </div>
          <div
            className={styles.selectBtn}
            onClick={() => {
              history.push("/idolSelect");
            }}
          >
            <div
              className={
                idolMember !== null ? styles.selectDoneText : styles.selectText
              }
            >
              {idolMember !== null
                ? `${idolGroupName} ${idolMemberName}`
                : "아이돌 그룹 & 멤버"}
            </div>
            <div
              className={idolMember ? styles.moreIconClick : styles.moreIcon}
            />
          </div>
          <div
            className={styles.selectBtn}
            onClick={() => {
              history.push("/category");
            }}
          >
            <div
              className={
                dataCategory !== "" ? styles.selectDoneText : styles.selectText
              }
            >
              {dataCategory !== "" ? dataCategory : "카테고리"}
            </div>
            <div
              className={dataCategory ? styles.moreIconClick : styles.moreIcon}
            />
          </div>
          <div
            className={styles.selectBtn}
            onClick={() => {
              history.push("/status");
            }}
          >
            <div
              className={
                dataStatus !== "" ? styles.selectDoneText : styles.selectText
              }
            >
              {dataStatus !== "" ? `${dataStatus}급` : "굿즈 상태"}
            </div>
            <div
              className={dataStatus ? styles.moreIconClick : styles.moreIcon}
            />
          </div>
          <div className={styles.selectBtn}>
            <InputNameBox
              className={dataDesc ? "" : styles.inputText}
              ref={descriptionRef}
              value={dataDesc || ""}
              placeholder="굿즈 설명"
              onChange={() => {
                dispatch(
                  newItemActions.setDescAction(descriptionRef.current.value),
                );
              }}
            />
            <div
              className={dataDesc ? styles.moreIconClick : styles.moreIcon}
            />
          </div>
          <div className={styles.selectBtn}>
            <div
              className={dataPrice ? styles.selectDoneText : styles.selectText}
            >
              ₩
            </div>
            <InputNameBox
              className={dataPrice ? "" : styles.inputText}
              ref={priceRef}
              value={dataPrice || ""}
              type="number"
              placeholder="가격 입력"
              onChange={() => {
                dispatch(newItemActions.setPriceAction(priceRef.current.value));
              }}
            />
            <div
              className={dataPrice ? styles.moreIconClick : styles.moreIcon}
            />
          </div>
        </Flex>
      </div>
      <button
        className={nextOK ? styles.nextOKBtn : styles.nextBtn}
        type="button"
        onClick={() => {
          uploadItem();
        }}
      >
        등록 완료
      </button>
    </ItemUploadBox>
  );
};

const ItemUploadBox = styled.div`
  width: 100%;
  height: 100vh;
  dissplay: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const TypeBtn = styled.button`
  width: 50%;
  padding: 15px;
`;

const TextBox = styled.textarea`
  width: 350px;
  height: 50px;
  border: 1px solid black;
  padding: 15px;
`;

const InputBox = styled.input`
  width: 200px;
  height: 50px;
  border: 1px solid black;
  padding: 10px;
  margin-right: 5px;
`;

const InputNameBox = styled.input`
  width: 100%;
`;

export default ItemUpload;
