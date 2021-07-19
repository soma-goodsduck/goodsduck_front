import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../../components/haeder/header";
import ItemList from "../../components/itemList/itemList";
import { Grid, PopUp } from "../../elements";
import Nav from "../../components/nav/nav";

import { history } from "../../redux/configureStore";
import { actionCreators as userActions } from "../../redux/modules/user";

const Home = (props) => {
  const dispatch = useDispatch();
  const showPopup = useSelector((state) => state.user.show_popup);

  const handleClick = () => {
    history.replace("/");
    dispatch(userActions.noShowPopupAction());
  };

  return (
    <Grid>
      <Header />
      {showPopup && (
        <PopUp
          is_bold
          width="250px"
          height="120px"
          text1="👉 로그인 하러가기"
          text2="그냥 둘러볼게요"
          _onClick={() => handleClick()}
        />
      )}
      <ItemList />
      <Nav />
    </Grid>
  );
};

export default Home;
