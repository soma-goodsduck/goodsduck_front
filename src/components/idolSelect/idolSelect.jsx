/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "./idolSelect.module.css";

const Idol = ({ idol, onCheck, onUncheck }) => {
  const likeIdolGroupsLS = localStorage.getItem("likeIdolGroups");
  const [checked, setChecked] = useState(false);

  const checkedItemHandler = (id, isChecked) => {
    if (!isChecked) {
      onUncheck(id);
    } else if (isChecked) {
      onCheck(id);
    }
  };

  const checkHandler = ({ target }) => {
    setChecked(!checked);
    checkedItemHandler(idol.id, target.checked);
  };

  useEffect(() => {
    let likeIdolGroups;

    if (likeIdolGroupsLS) {
      likeIdolGroups = likeIdolGroupsLS.split(",").map(Number);
      likeIdolGroups.forEach((idolId) => {
        if (idol.id === idolId) {
          setChecked(true);
          checkedItemHandler(idol.id, true);
        }
      });
    }
  }, []);

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
        {idol.name}
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
