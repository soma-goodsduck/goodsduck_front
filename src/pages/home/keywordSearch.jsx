/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Grid } from "../../elements";
import Nav from "../../components/nav/nav";
import HeaderInfo from "../../components/haeder/headerInfo";

const KeywordSearch = (props) => {
  const keyword = props.match.params.name;

  return (
    <>
      <Grid>
        <HeaderInfo text={keyword} />
        <Nav />
      </Grid>
    </>
  );
};

export default KeywordSearch;
