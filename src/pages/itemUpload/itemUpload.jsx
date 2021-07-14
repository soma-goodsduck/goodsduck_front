/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Flex, Button, Image, Icon } from "../../elements";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { actionCreators as imgActions } from "../../redux/modules/image";

import ItemStatus from "./itemStatus";
import ItemCategory from "./itemCategory";
import ItemImgUpload from "../../components/itemImgUpload/itemImgUpload";
import { history } from "../../redux/configureStore";

const ItemUpload = (props) => {
  const dispatch = useDispatch();

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const [tradeType, setTradeType] = useState("SELL");
  const [isSelling, setIsSelling] = useState(true);

  // 기존에 저장된 상태값 가져오기
  const userJwt = localStorage.getItem("jwt");

  const {
    dataName,
    dataPrice,
    dataDesc,
    dataCategory,
    dataTradeType,
    dataStatus,
    idolGroup,
    idolMember,
    fileList,
    preview,
  } = useSelector((state) => ({
    dataName: state.newItem.name,
    dataPrice: state.newItem.price,
    dataDesc: state.newItem.description,
    dataCategory: state.newItem.category,
    dataTradeType: state.newItem.trade_type,
    dataStatus: state.newItem.status_grade,
    idolGroup: state.newItem.idol_group_id,
    idolMember: state.newItem.idol_member_id,
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
    idolGroup,
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

  const uploadItem = () => {
    if (fileList.length === 0) {
      window.alert("사진을 추가해주세요");
      return;
    }

    if (!idolGroup || !idolMember) {
      window.alert("아이돌 그룹과 멤버를 추가해주세요");
      return;
    }

    if (!dataName || !dataCategory || !dataStatus || !dataDesc || !dataPrice) {
      window.alert(
        "상품 제목, 카테고리, 상품 상태, 상품설명, 가격을 모두 입력해주세요",
      );
      return;
    }

    dispatch(newItemActions.addItemAction(item, fileList));

    // 저장된 상태값 모두 삭제
    dispatch(newItemActions.clearAction());
    dispatch(imgActions.clearImgAction());
  };

  return (
    <ItemUploadBox>
      <Flex is_flex justify="flex-start">
        <ItemImgUpload />
        <Image
          shape="rectangle"
          size="100px"
          src={preview || ""}
          margin="0 10px"
        />
      </Flex>
      <Flex is_flex justify="space-evenly">
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
          <div>상품명</div>
          <Flex is_flex>
            <InputNameBox
              ref={nameRef}
              value={dataName || ""}
              placeholder="상품 제목을 입력해주세요. "
              onChange={() => {
                dispatch(newItemActions.setNameAction(nameRef.current.value));
              }}
            />
          </Flex>
        </div>
        <div
          className={styles.selectBtn}
          onClick={() => {
            history.push("/idolSelect");
          }}
        >
          <div>아이돌 그룹 & 멤버</div>
          <Icon src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_add.svg" />
        </div>
        <div className={styles.selectBtn}>
          <Flex is_col align="flex-start">
            <div>카테고리</div>
            <ItemCategory />
          </Flex>
        </div>
        <div className={styles.selectBtn}>
          <Flex is_col align="flex-start">
            <div>상품 상태</div>
            <ItemStatus />
          </Flex>
        </div>
        <div className={styles.selectBtn}>
          <Flex is_col align="flex-start">
            <div>상품 설명</div>
            <TextBox
              ref={descriptionRef}
              value={dataDesc || ""}
              placeholder="굿즈 정보를 입력해주세요. "
              onChange={() => {
                dispatch(
                  newItemActions.setDescAction(descriptionRef.current.value),
                );
              }}
            />
          </Flex>
        </div>
        <div className={styles.selectBtn}>
          <div>가격 입력</div>
          <Flex is_flex>
            <InputBox
              ref={priceRef}
              value={dataPrice || ""}
              type="number"
              placeholder="숫자만 입력해주세요. "
              onChange={() => {
                dispatch(
                  newItemActions.setPriceAction(Number(priceRef.current.value)),
                );
              }}
            />
            <div>원</div>
          </Flex>
        </div>
      </Flex>
      <Button
        text="등록 완료"
        padding="10px"
        margin="30px 0 0 0 "
        _onClick={() => uploadItem()}
      />
    </ItemUploadBox>
  );
};

const ItemUploadBox = styled.div`
  width: 100%;
  height: 100vh;
  dissplay: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const TypeBtn = styled.button`
  width: 150px;
  padding: 15px;
  margin: 10px;
`;

const TextBox = styled.textarea`
  width: 350px;
  height: 300px;
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
  width: 270px;
  height: 50px;
  border: 1px solid black;
  padding: 10px;
  margin-right: 5px;
`;

export default ItemUpload;
