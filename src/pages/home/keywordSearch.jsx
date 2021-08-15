/* eslint-disable react/destructuring-assignment */
import React from "react";
import styled from "styled-components";

import { Grid } from "../../elements";
import Nav from "../../components/nav/nav";
import HeaderInfo from "../../components/haeder/headerInfo";
import ItemList from "../../components/itemList/itemList";

const KeywordSearch = (props) => {
  const keyword = props.match.params.name;

  return (
    <>
      <Grid>
        <HeaderInfo text={keyword} />
        <ItemListBox>
          <ItemList keyword={keyword} />
        </ItemListBox>
        <Nav />
      </Grid>
    </>
  );
};

const ItemListBox = styled.div`
  margin-top: 50px;
`;

export default KeywordSearch;
