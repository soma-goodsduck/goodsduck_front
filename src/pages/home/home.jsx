import React from "react";
import styled from "styled-components";

import TestHeader from "../../components/test_header";
import Header from "../../components/haeder/header";
import ItemList from "../../components/itemList/itemList";
import { Grid } from "../../elements";
//import FilteringIdol from "../../components/idolFiltering/idolGroupFiltering";
//import Filtering from "../../components/filtering/filtering";

const Home = (props) => {
  return (
    <Grid margin="100px 0 0 0">
      <TestHeader></TestHeader>
      <Header></Header>
      {/* <FilteringIdol></FilteringIdol>
      <Filtering></Filtering> */}
      <ItemList></ItemList>
    </Grid>
  );
};

export default Home;
