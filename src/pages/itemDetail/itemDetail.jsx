import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./itemDetail.module.css";

import ItemImg from "./itemImg";
import PopUp2 from "../../elements/popUp2";
import { Flex, Text, Image, Icon } from "../../elements/index";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { actionCreators as imgActions } from "../../redux/modules/image";

import { timeForToday, numberWithCommas } from "../../shared/functions";
import { getInfo, getData, deleteAction } from "../../shared/axios";

const ItemDetail = ({ history }) => {
  const screen = window.screen.width;
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (screen < 415) {
      setIsMobile(true);
    }
  }, [screen]);

  const dispatch = useDispatch();

  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = Number(href[href.length - 1]);

  // 해당 아이템 데이터 받아오기
  const [itemData, setItemData] = useState(null);
  useEffect(() => {
    const getItemDetail = getInfo(`item/${itemId}`);
    getItemDetail.then((result) => {
      setItemData(result);
    });
  }, []);

  // 아이템 글쓴이인지 확인
  const [isWriter, setIsWriter] = useState(false);
  useEffect(() => {
    const checkWriter = () => {
      const getIsWriter = getData(`item/edit/${itemId}`);
      getIsWriter.then((result) => {
        if (result === 1) {
          setIsWriter(true);
        }
      });
    };
    checkWriter();
  }, []);

  const [showWriterPopup, setShowWriterPopup] = useState(null);
  const hideWriterPopup = () => {
    setShowWriterPopup(false);
  };
  const [showPopup, setShowPopup] = useState(null);
  const hidePopup = () => {
    setShowPopup(false);
  };

  const clickDots = () => {
    if (isWriter) {
      setShowWriterPopup(true);
    } else {
      setShowPopup(true);
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

  // 등록한 아이템 삭제 => 아직 안되는듯
  const deleteItem = () => {
    deleteAction(`item/${itemId}`);
    console.log("굿즈 삭제");
    history.replace("/home");
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
      {showPopup && (
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
            {/* 가격 제안 목록 */}
            <Text bold size="18px">
              가격 제안 목록
            </Text>
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
                    src="https://i.pinimg.com/originals/a8/7b/5d/a87b5da556f38ab9c7f7e143fbcb8201.jpg"
                    // src={itemData.user.userImage}
                    margin="0 7px 0 0"
                    size="50px"
                  />
                  <Flex is_col align="flex-start">
                    <Image shape="circle" size="15px" margin="0 0 5px 0" />
                    <UserName>
                      <Text is_long>{itemData.user.nickName}</Text>
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
          <InfoBox2>
            <Flex justify="space-between">
              <Text bold size={isMobile ? "20px" : "25px"}>
                {numberWithCommas(itemData.price)}원
              </Text>
              {isWriter ? (
                <Button className={styles.btnRePrice}>가격 제안 보기</Button>
              ) : (
                <Flex>
                  <Button className={styles.btnChat}>
                    <Icon
                      width="18px"
                      src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_goChat.svg"
                      alt="go chat"
                      margin="0 5px 2px 0"
                    />
                    즉시 판매 가능
                  </Button>
                  <Button className={styles.btnPrice}>가격 제시하기</Button>
                </Flex>
              )}
            </Flex>
          </InfoBox2>
        </>
      ) : null}
    </>
  );
};

const Title = styled.div`
  width: 70%;
`;

const UserName = styled.div`
  width: 65px;
`;

const InfoBox = styled.div`
  width: 100%;
  padding: 16px 16px 0 16px;
`;

const InfoBox2 = styled.div`
  width: 100%;
  padding: 0 16px 20px 16px;
`;

const Button = styled.div`
  font-weight: bold;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
`;

export default ItemDetail;
