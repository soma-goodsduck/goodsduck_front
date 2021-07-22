import React from "react";
import { useSelector } from "react-redux";

import Header from "../../components/haeder/header";
import ItemList from "../../components/itemList/itemList";
import { Grid, LoginPopUp } from "../../elements";
import Nav from "../../components/nav/nav";

const Home = (props) => {
  const showPopup = useSelector((state) => state.user.show_popup);

  return (
    <Grid>
      <Header />
      {showPopup && <LoginPopUp />}
      <ItemList />
      <Nav />
    </Grid>
  );
};

export default Home;
