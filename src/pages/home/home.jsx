import React, { useEffect } from "react";

import Header from "../../components/haeder/header";
import ItemList from "../../components/itemList/itemList";
import { Grid } from "../../elements";
import Nav from "../../components/nav/nav";

import { requestPublicData } from "../../shared/axios";

const Home = (props) => {
  const likeIdolGroupsLS = localStorage.getItem("likeIdolGroups");

  useEffect(() => {
    if (!likeIdolGroupsLS) {
      const getUserData = requestPublicData("v1/users/look-up");
      getUserData.then((result) => {
        if (result) {
          const likeIdolGroups = [];
          result.likeIdolGroups.forEach((idolGroup) => {
            likeIdolGroups.push(idolGroup.idolGroupId);
          });
          localStorage.setItem("likeIdolGroups", likeIdolGroups);
        }
      });
    }
  }, []);

  return (
    <Grid>
      <Header />
      <ItemList />
      <Nav />
    </Grid>
  );
};

export default Home;
