import React from "react";
import styled from "styled-components";
import Item from "./item";
import { Text } from "../../elements";
import { grayBtnText } from "../../shared/colors";

const ItemList = ({ items, itemCount }) => {
  return (
    <ItemListBox>
      <Header>
        <Text bold>거래상품 {itemCount}개</Text>
        <TextLink>전체보기</TextLink>
      </Header>
      <Grid>
        {items && items.map((item) => <Item key={item.itemId} item={item} />)}
      </Grid>
    </ItemListBox>
  );
};

const ItemListBox = styled.div`
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TextLink = styled.button`
  color: ${grayBtnText};
  font-size: 14px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 34%);
  justify-self: start;
`;

export default ItemList;
