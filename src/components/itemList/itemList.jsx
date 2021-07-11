import React, { useState, useEffect } from "react";
import styles from "./itemList.module.css";
import styled from "styled-components";
import Item from "../item/item";

import axios from "axios";
// 지금은 목업 데이터에서 가져오지만, 나중에는 GET으로 받아오기
import { items } from "../../shared/JsonDataItem";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as itemActions } from "../../redux/modules/item";

const ItemList = (props) => {
  //const [items, setItems] = useState([]);
  const isFiltering = useSelector((state) => state.header.click_filtering);

  const handleHeartClick = (id) => {
    console.log(id);
    // id를 보내서 해당 id에 맞는 아이템의 정보를 수정해서 가져옴
    // axios
    //   .post(`${process.env.REACT_APP_BACKEND_LOCALHOST_URL}/likeItem`, {
    //     id: idol.id,
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //     fetchData();
    //   })
    //   .catch((error) => console.log("error", error));
  };

  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_LOCALHOST_URL}/items`
  //       );
  //       setItems(result.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  return (
    <ItemListBox className={isFiltering ? styles.filteringHeader : ""}>
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          item={item}
          onHeartClick={handleHeartClick}
        />
      ))}
    </ItemListBox>
  );
};

const ItemListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-auto-rows: 300px;
  padding: 10px;
`;

export default ItemList;
