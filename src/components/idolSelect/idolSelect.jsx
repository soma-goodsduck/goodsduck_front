/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import styled from "styled-components";
import styles from "./idolSelect.module.css";

const Idol = ({ idol, onCheck, onUncheck }) => {
  const [checked, setChecked] = useState(false);

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      onCheck(id);
    } else if (!isChecked) {
      onUncheck(id);
    }
  };

  const checkHandler = ({ target }) => {
    setChecked(!checked);
    checkedItemHandler(idol.id, target.checked);
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
      <label htmlFor={idol.engName} className={styles.label}>
        <img
          className={styles.idolGroupImg}
          src={idol.imageUrl}
          alt="Idol Group"
        />
        {idol.engName}
      </label>
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
`;

export default Idol;
