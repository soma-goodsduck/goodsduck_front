import React from "react";

import TestHeader from "../../components/test_header";
import Header from "../../components/haeder/header";
import ItemList from "../../components/itemList/itemList";
import { Grid } from "../../elements";

const Home = (props) => {
  return (
    <Grid margin={window.screen.width < 415 ? "600px 0 0 0" : "100px 0 0 0"}>
      <TestHeader />
      <Header />
      <ItemList />
    </Grid>
  );
};

export default Home;
