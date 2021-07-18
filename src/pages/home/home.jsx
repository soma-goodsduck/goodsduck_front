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
        <PopUp text="로그인 하러가기 👉" _onClick={() => handleClick()} />
      )}
      <ItemList />
      <Nav />
    </Grid>
  );
};

export default Home;
