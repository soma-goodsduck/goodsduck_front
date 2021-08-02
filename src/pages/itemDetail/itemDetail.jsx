import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./itemDetail.module.css";

import ItemImg from "./itemImg";
import PopUp2 from "../../elements/popUp2";
import { Flex, Text, Image, Icon } from "../../elements/index";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { actionCreators as imgActions } from "../../redux/modules/image";

import { timeForToday } from "../../shared/functions";
import { getInfo, getData, deleteAction } from "../../shared/axios";
import ItemNav from "./itemNav";
import PriceList from "./priceList";

const ItemDetail = ({ history }) => {
  const dispatch = useDispatch();

  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  // 해당 아이템 데이터 받아오기
  const [itemData, setItemData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    const getItemDetail = getInfo(`items/${itemId}`);
    getItemDetail.then((result) => {
      setItemData(result);

      if (result.isOwner) {
        setIsOwner(true);
      }
    });
  }, []);

  const [showWriterPopup, setShowWriterPopup] = useState(null);
  const hideWriterPopup = () => {
    setShowWriterPopup(false);
  };
  const [showUserPopup, setShowUserPopup] = useState(null);
  const hidePopup = () => {
    setShowUserPopup(false);
  };

  const clickDots = () => {
    if (isOwner) {
      setShowWriterPopup(true);
    } else {
      setShowUserPopup(true);
    }
  };

  // 등록한 아이템 수정
  const editItem = () => {
    // eslint-disable-next-line no-underscore-dangle
    const _itemData = {
      category: itemData.categoryName,
      description: itemData.description,
      gradeStatus: itemData.gradeStatus,
      groupName: itemData.idolMember.groupName,
      memberName: itemData.idolMember.memberName,
      groupId: itemData.idolMember.groupId,
      memberId: itemData.idolMember.memberId,
      name: itemData.name,
      price: itemData.price,
      tradeType: itemData.tradeType,
      images: itemData.images,
      id: itemId,
    };
    dispatch(newItemActions.setItemAction(_itemData));
    // dispatch(imgActions.setItemAction(userId, itemData.images));
  };

  // 등록한 아이템 삭제
  const deleteItem = () => {
    deleteAction(`items/${itemId}`);
    console.log("굿즈 삭제");
    history.replace("/");
  };

  // 판매자/구매자의 마이페이지로 이동
  const clickUser = () => {
    console.log("판매자");
  };

  return (
    <>
      {showWriterPopup && (
        <PopUp2
          text1="수정하기"
          text2="삭제하기"
          _onClick1={() => {
            editItem();
          }}
          _onClick2={() => {
            deleteItem();
          }}
          _onClick3={() => {
            hideWriterPopup();
          }}
        />
      )}
      {showUserPopup && (
        <PopUp2
          text1="신고하기"
          _onClick1={() => {
            console.log("신고");
          }}
          _onClick3={() => {
            hidePopup();
          }}
        />
      )}
      {itemData ? (
        <>
          <ItemImg id={itemId} item={itemData} onClick={() => clickDots()} />
          <InfoBox>
            {/* 타입, 제목 */}
            <Flex justify="flex-start" margin="0 0 10px 0">
              <Text
                size="22px"
                bold
                margin="0 20px 0 0"
                color={itemData.tradeType === "구매" ? "#299bff" : "#e15b5b"}
              >
                {itemData.tradeType}
              </Text>
              <Title>
                <Text size="22px">{itemData.name}</Text>
              </Title>
            </Flex>
            {/* 시간, 조회수, 좋아요 */}
            <Flex justify="flex-start">
              <Flex>
                <Icon
                  width="18px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_clock.svg"
                  alt="upload time"
                  margin="0 5px 0 0"
                />
                <Text size="18px" color="#bbbbbb">
                  {timeForToday(itemData.itemCreatedAt)}
                </Text>
              </Flex>
              <Flex margin="0 20px">
                <Icon
                  width="18px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_eye.svg"
                  alt="views item count"
                  margin="0 5px 0 0"
                />
                <Text size="18px" color="#bbbbbb">
                  {itemData.views}
                </Text>
              </Flex>
              <Flex>
                <Icon
                  width="18px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_like.svg"
                  alt="likes item count"
                  margin="0 5px 0 0"
                />
                <Text size="18px" color="#bbbbbb">
                  {itemData.likesItemCount}
                </Text>
              </Flex>
            </Flex>
            <div className={styles.line} />
            {/* 필터링 버튼 */}
            <Flex is_flex is_wrap justify="flex-start" margin="0 0 20px 0">
              <div className={styles.filteringBtn}>
                {itemData.idolMember.groupName}
              </div>
              <div className={styles.filteringBtn}>
                {itemData.idolMember.memberName}
              </div>
              <div className={styles.filteringBtn}>{itemData.categoryName}</div>
              <div className={styles.filteringBtn}>{itemData.tradeType}</div>
              <div className={styles.filteringBtn}>
                {itemData.gradeStatus}급
              </div>
            </Flex>
            {/* 상품 설명 */}
            <Flex justify="flex-start" padding=" 0 7px">
              <Text>{itemData.description}</Text>
            </Flex>
            <div className={styles.line} />
            {/* 가격 제시 목록 */}
            <Text bold size="18px" margin="0 0 20px 0">
              가격 제시 목록
            </Text>
            <PriceList id={itemId} />
            <div className={styles.line} />
            {/* 글쓴이 정보 */}
            <button
              type="button"
              aria-label="go seller/buyer shop"
              className={styles.btnUserShop}
              onClick={() => clickUser()}
            >
              <Flex justify="space-between">
                <Flex>
                  <Image
                    shape="circle"
                    src={
                      itemData.itemOwner.imageUrl ||
                      "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png"
                    }
                    margin="0 10px 0 0"
                    size="50px"
                  />
                  <Flex is_col align="flex-start">
                    <Image shape="circle" size="20px" />
                    <UserName>
                      <Text size="18px">{itemData.itemOwner.nickName}</Text>
                    </UserName>
                  </Flex>
                </Flex>
                {/* <Flex is_flex>
                판매자의 다른 상품 구경하기
                <Icon
                  width="12px"
                  src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_go.svg"
                  alt="go seller/buyer shop"
                  margin="0 0 5px 10px"
                />
              </Flex> */}
              </Flex>
            </button>
          </InfoBox>

          <div className={styles.line} />
          {/* 가격, 버튼 */}
          <ItemNav item={itemData} id={itemId} isOwner={isOwner} />
        </>
      ) : null}
    </>
  );
};

const Title = styled.div`
  width: 70%;
`;

const UserName = styled.div`
  width: 100px;
  text-align: left;
  margin-top: 5px;
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 16px 16px 0 16px;
`;

export default ItemDetail;
