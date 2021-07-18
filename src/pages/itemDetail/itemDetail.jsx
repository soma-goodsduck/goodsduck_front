import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemDetail.module.css";

import { actionCreators as itemActions } from "../../redux/modules/item";

import { Flex, Text, Image, Icon } from "../../elements/index";
// 현재로는 로컬 데이터로 보여주기
import itemData from "../../shared/JsonDataItemDetail.json";

import { timeForToday, numberWithCommas } from "../../shared/functions";
import PopUp2 from "../../elements/popUp2";
import ItemImg from "./itemImg";

const Item = () => {
  // 아이템 아이디
  const href = window.location.href.split("/");
  const itemId = href[href.length - 1];

  // 해당 아이템 데이터 받아오기
  // const [itemData, setItemData] = useState([]);
  // const fetchData = async () => {
  //   try {
  //     const result = await axios.get(
  //       `${process.env.REACT_APP_BACK_URL}/api/v1/item/${itemId}`,
  //     );
  //     setItemData(result.data);
  //     console.log(itemData);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // TODO
  // 팝업 보여주기 => 수정, 삭제
  const [showPopup, setShowPopup] = useState(false);
  const hidePopup = () => {
    setShowPopup(false);
  };
  const editItem = () => {
    console.log("editItem");
  };
  const deleteItem = () => {
    console.log("deleteItem");
  };

  const clickDots = () => {
    setShowPopup(true);
  };

  // 판매자/구매자의 마이페이지로 이동
  const clickUser = () => {
    console.log("판매자");
  };

  return (
    <Flex is_col className={styles.container}>
      {showPopup && (
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
            hidePopup();
          }}
        />
      )}
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
              margin="0 5px 3px 0"
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
              margin="0 5px 3px 0"
            />
            <Text size="18px" color="#bbbbbb">
              {/* {itemData.views_item_count} */}
              678
            </Text>
          </Flex>
          <Flex>
            <Icon
              width="18px"
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_like.svg"
              alt="likes item count"
              margin="0 5px 3px 0"
            />
            <Text size="18px" color="#bbbbbb">
              {/* {itemData.likes_item_count} */}
              119
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
          <div className={styles.filteringBtn}>{itemData.gradeStatus}급</div>
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
                  <Text is_long>{itemData.user.nickname}</Text>
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
          <Text bold size="22px">
            {numberWithCommas(itemData.price)}원
          </Text>
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
        </Flex>
      </InfoBox2>
    </Flex>
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

const ImgInput = styled.input`
  display: none;
`;

export default Item;
