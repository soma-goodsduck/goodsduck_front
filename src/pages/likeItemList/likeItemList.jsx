import React, { useEffect, useState } from "react";

import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import ItemRow from "../../components/itemRow/itemRow";
import LoginPopUp from "../../elements/loginPopUp";

import { requestAuthData } from "../../shared/axios";

const LikeItemList = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getLikeItemList = requestAuthData("v2/items/like");
    getLikeItemList.then((result) => {
      if (result === "login") {
        setShowPopup(true);
      } else {
        setFavoriteItems(result);
      }
    });
  }, []);

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
  margin-top: 65px;
  padding: 0 16px;
`;

export default LikeItemList;
