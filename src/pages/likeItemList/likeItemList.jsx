import React, { useEffect, useState } from "react";

import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import ItemRow from "../../components/itemRow/itemRow";
import LoginPopUp from "../../elements/loginPopUp";

import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const LikeItemList = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const requestLikeItemList = async () => {
    const result = await requestAuthData("v2/items/like");
    return result;
  };
  const fnEffect = async () => {
    const getLikeItemList = await requestLikeItemList();

    if (getLikeItemList < 0) {
      if (getLikeItemList === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    setFavoriteItems(getLikeItemList);
  };
  useEffect(fnEffect, []);

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <div>
          <HeaderInfo text="찜" padding="0 16px" />
          {favoriteItems !== [] && (
            <Box>
              {favoriteItems.map((favoriteItem) => (
                <ItemRow key={favoriteItem.itemId} item={favoriteItem} isBtn />
              ))}
            </Box>
          )}
        </div>
      )}
    </>
  );
};

const Box = styled.div`
  overflow-y: auto;
  height: 95vh;
  margin-top: 40px;
  padding: 0 16px;
`;

export default LikeItemList;
