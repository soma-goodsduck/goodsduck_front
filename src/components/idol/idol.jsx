import React, { useState } from "react";
import styles from "./idol.module.css";
import styled from "styled-components";
import { Text } from "../../elements";

const Idol = ({ idol, onCheck, onUncheck }) => {
  const [checked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    console.log(target);
    setChecked(!checked);
    checkedItemHandler(target.id, target.checked);
  };

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      onCheck(id);
    } else if (!isChecked) {
      onUncheck(id);
    }
  };

  return (
    <IdolBox>
      <IdolInput
        className={styles.input}
        type="checkbox"
        id={idol.engName}
        checked={checked}
        onChange={(e) => checkHandler(e)}
      />
      <label className={styles.label} htmlFor={idol.engName}>
        <IdolImg src={idol.img}></IdolImg>
      </label>
      <Text margin="5px 0 10px 0">{idol.korName}</Text>
    </IdolBox>
  );
};

const IdolBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IdolInput = styled.input`
  display: none;
  type: checkbox;
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const IdolImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  display: flex;
`;

export default Idol;
