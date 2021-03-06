/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { DoubleCheckModal2, Flex, LoginPopUp, Spinner } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";
import ItemImgUpload from "../../components/itemImgUpload/itemImgUpload";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";

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
    isLoading,
    showImgBigPopup,
    showManyItemsPopup,
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
    isLoading: state.newItem.loading,
    showImgBigPopup: state.newItem.showImgBigPopup,
    showManyItemsPopup: state.newItem.showManyItemsPopup,
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
    if (e.target.innerText === "????????????") {
      dispatch(newItemActions.setTradeType("BUY"));
    } else if (e.target.innerText === "????????????") {
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

    // ?????? ?????? ?????? ????????????
    if (itemId !== 0) {
      dispatch(newItemActions.updateItemAction(item, itemId, fileList));
    } else {
      dispatch(newItemActions.addItemAction(item, fileList));
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {showPopup && <LoginPopUp />}
      {showImgBigPopup && (
        <DoubleCheckModal2
          text="???????????? ?????? ?????? ????????? ??? ???????????? :("
          height="80px"
          onOkClick={() => {
            dispatch(newItemActions.setShowImgBigPopup(false));
            history.replace("/");
          }}
        />
      )}
      {showManyItemsPopup && (
        <DoubleCheckModal2
          text="????????? ??? ?????? ?????? ?????? ??????????????????."
          text2="?????? ??? ?????????????????? :("
          onOkClick={() => {
            dispatch(newItemActions.setShowManyItemsPopup(false));
            history.replace("/");
          }}
        />
      )}
      {!isLoading && (
        <div>
          <HeaderInfo text="?????? ??????" isClear />
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
                  ????????????
                </TypeBtn>
                <TypeBtn
                  className={
                    dataTradeType === "BUY"
                      ? styles.clickTypeBtn
                      : styles.typeBtn
                  }
                  onClick={(e) => clickTradeType(e)}
                >
                  ????????????
                </TypeBtn>
              </Flex>
              <Flex is_col>
                <div className={styles.selectBtn}>
                  <InputBox
                    className={dataName ? "" : styles.inputText}
                    ref={nameRef}
                    value={dataName || ""}
                    placeholder="?????????"
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
                      : "????????? ?????? & ??????"}
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
                    {dataCategory !== "" ? dataCategory : "????????????"}
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
                    {dataStatus !== "" ? `${dataStatus}???` : "?????? ??????"}
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
                    placeholder="?????? ??????"
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
                    ???
                  </div>
                  <InputBox
                    className={dataPrice ? "" : styles.inputText}
                    ref={priceRef}
                    value={dataPrice || ""}
                    type="number"
                    placeholder="?????? ??????"
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
              {itemId !== 0 ? "?????? ??????" : "?????? ??????"}
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
