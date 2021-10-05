import React, { useEffect, useState } from "react";

import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import ItemRow from "../../components/itemRow/itemRow";
import { LoginPopUp, Spinner } from "../../elements";

import { requestAuthData } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const LikeItemList = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requestLikeItemList = async () => {
    const result = await requestAuthData("v2/items/like");
    return result;
  };
  const fnEffect = async () => {
    setIsLoading(true);

    const getLikeItemList = await requestLikeItemList();

    if (getLikeItemList < 0) {
      if (getLikeItemList === -201) {
        setShowPopup(true);
        return;
      }
      history.push("/error");
      return;
    }

    setIsLoading(false);
    setFavoriteItems(getLikeItemList);
  };
  useEffect(fnEffect, []);

  return (
    <>
      {showPopup && <LoginPopUp />}
      <div>
        <HeaderInfo text="찜" padding="0 16px" />
        {isLoading && <Spinner />}
        {favoriteItems.length === 0 && (
          <Notice>
            <Text>아직 찜한 굿즈가 없습니다!</Text>
          </Notice>
        )}
        {favoriteItems !== [] && (
          <Box>
            {favoriteItems.map((favoriteItem) => (
              <ItemRow key={favoriteItem.itemId} item={favoriteItem} isBtn />
            ))}
          </Box>
        )}
      </div>
    </>
  );
};

const Box = styled.div`
  overflow-y: auto;
  height: 95vh;
  margin-top: 40px;
  padding: 0 16px;
`;

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;
const Text = styled.div`
  padding: 7px 0;
  font-weight: 500;
`;

export default LikeItemList;
