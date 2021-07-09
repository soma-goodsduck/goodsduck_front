import React from "react";
import styled from "styled-components";

import TestHeader from "../../components/test_header";
import Header from "../../components/haeder/header";
import Item from "../../components/item/item";
import { Grid } from "../../elements";
import FilteringIdol from "../../components/idolFiltering/idolGroupFiltering";

const Main = (props) => {
  return (
    <Grid>
      <TestHeader></TestHeader>
      <Header></Header>
      <FilteringIdol></FilteringIdol>
      <ItemList>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ItemList>
    </Grid>
  );
};

const ItemList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-auto-rows: 300px;
  padding: 10px;
`;

export default Main;
