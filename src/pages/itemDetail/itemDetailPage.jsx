import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./itemDetail.module.css";

import ItemImg from "./itemImg";
import { Flex, Text, Image, Icon, PopUp2, PopUp3 } from "../../elements/index";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { actionCreators as homeActions } from "../../redux/modules/home";

import { timeForToday } from "../../shared/functions";
import { requestPublicData, deleteAction } from "../../shared/axios";
import ItemNav from "./itemNav";
import PriceList from "./priceList";

const ItemDetailPage = ({ history }) => {
  const dispatch = useDispatch();

  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  // 해당 아이템 데이터 받아오기
  const [itemData, setItemData] = useState(null);
  const [itemOwnerId, setItemOwnerId] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [color, setColor] = useState("");
  const [tradeType, setTradeType] = useState("");
  const [descData, setDescData] = useState("");
  const [descHeight, setDescHegiht] = useState(0);

  useEffect(() => {
    const getItemDetail = requestPublicData(`v1/items/${itemId}`);
    getItemDetail.then((result) => {
      console.log(result);
      setItemData(result);
      setItemOwnerId(result.itemOwner.bcryptId);
      setDescData(result.description);

      const findEnter = result.description.match(/[\n]/g);
      if (findEnter) {
        const NumOfEnter = findEnter.length;
        setDescHegiht(NumOfEnter);
      }

      if (result.isOwner) {
        setIsOwner(true);
      }

      if (result.tradeStatus === "SELLING") {
        setColor("#e15b5b");
        setTradeType("판매");
      } else if (result.tradeStatus === "BUYING") {
        setColor("#299bff");
        setTradeType("구매");
      } else if (result.tradeStatus === "RESERVING") {
        setColor("#222222");
        setTradeType("예약");
      } else if (result.tradeStatus === "COMPLETE") {
        setColor("#222222");
        setTradeType("완료");
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
    const imgUrls = [];
    itemData.images.forEach((image) => imgUrls.push(image.url));

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
      images: imgUrls,
      id: itemId,
    };
    dispatch(newItemActions.setItemAction(_itemData));
  };

  // 등록한 아이템 삭제
  const deleteItem = () => {
    const deleteItemAction = deleteAction(`v1/items/${itemId}`);
    deleteItemAction.then((result) => {
      if (result.success) {
        dispatch(homeActions.deleteItem(itemId));
        history.replace("/");
      } else {
        window.alert("굿즈 삭제에 실패했습니다.");
      }
    });
  };

  // 판매자/구매자의 마이페이지로 이동
  const clickUser = () => {
    if (isOwner) {
      history.push("/my-profile");
    } else {
      history.push(`/profile/${itemOwnerId}`);
    }
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
        <PopUp3
          text="신고하기"
          _onClick1={() => {
            history.push(`/report/${itemOwnerId}`);
          }}
          _onClick2={() => {
            hidePopup();
          }}
        />
      )}
      {itemData && (
        <>
          <ItemImg id={itemId} item={itemData} onClick={() => clickDots()} />
          <InfoBox>
            {/* 타입, 제목 */}
            <Flex justify="flex-start" margin="0 0 10px 0">
              <Text size="22px" bold color={color}>
                {tradeType}
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
              <DescBox
                value={descData}
                readOnly
                style={{ height: `${30 + descHeight * 25}px` }}
              />
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
              </Flex>
            </button>
          </InfoBox>

          <div className={styles.line} />
          {/* 가격, 버튼 */}
          <ItemNav
            item={itemData}
            id={itemId}
            isOwner={isOwner}
            tradeType={tradeType}
          />
        </>
      )}
    </>
  );
};

const Title = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const UserName = styled.div`
  text-align: left;
  margin-top: 5px;
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 16px 16px 0 16px;
`;

const DescBox = styled.textarea`
  width: 100%;
  resize: none;
  line-height: 1.5;
`;

export default ItemDetailPage;
