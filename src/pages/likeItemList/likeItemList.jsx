import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import ItemRow from "../../components/itemRow/itemRow";
import PopUp from "../../elements/popUp";

import { actionCreators as userActions } from "../../redux/modules/user";

import { getData } from "../../shared/axios";

const LikeItemList = ({ history }) => {
  const dispatch = useDispatch();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const showPopup = useSelector((state) => state.user.show_popup);

  useEffect(() => {
    const getLikeItemList = getData("like/item");
    getLikeItemList.then((result) => {
      setFavoriteItems(result);

      if (result === "login") {
        dispatch(userActions.showPopupAction());
      }
    });
  }, []);

  return (
    <div>
      {showPopup && (
        <PopUp
          is_bold
          width="250px"
          height="120px"
          text1="👉 로그인 하러가기"
          text2="그냥 둘러볼게요"
          _onClick={() => {
            history.replace("/");
          }}
        />
      )}
      <HeaderInfo text="찜" padding="0 16px" />
      {favoriteItems !== [] && (
        <Box>
          {favoriteItems.map((favoriteItem) => (
            <ItemRow key={favoriteItem.itemId} item={favoriteItem} isBtn />
          ))}
        </Box>
      )}
    </div>
  );
};

const Box = styled.div`
  margin-top: 65px;
  padding: 0 16px;
`;

export default LikeItemList;
