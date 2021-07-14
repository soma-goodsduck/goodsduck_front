/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Flex, Button } from "../../elements";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";
import { history } from "../../redux/configureStore";

import members from "../../shared/IdolMemberData.json";

const IdolMemberSelect = () => {
  const dispatch = useDispatch();

  const groupId = useSelector((state) => state.newItem.idol_group_id);
  const groupIdIdx = groupId - 1;
  const [memberId, setMemberId] = useState(0);

  const checkMemberHandler = (id) => {
    console.log(id, memberId);
    setMemberId(id);
    dispatch(newItemActions.setIdolMemberAction(id));
  };

  const selectFin = () => {
    if (!memberId) {
      window.alert("아이돌 그룹과 멤버를 선택해주세요");
      return;
    }
    history.push("/new");
  };

  return (
    <Flex is_flex is_wrap>
      {members[groupIdIdx][groupId].map((member) => (
        <IdolMemberBox key={member.id}>
          <IdolMemberInput
            id={member.id}
            type="radio"
            checked={memberId === member.id}
            onChange={() => checkMemberHandler(member.id)}
          />
          <label
            htmlFor={member.id}
            className={
              memberId === member.id
                ? styles.clickIdolGroupBtn
                : styles.idolGroupBtn
            }
          >
            <img
              className={styles.idolGroupImg}
              src={member.imageUrl}
              alt="Idol Member"
            />
            {member.name}
          </label>
        </IdolMemberBox>
      ))}
      <Button
        text="아이돌 선택 완료"
        padding="10px"
        margin="30px 0 0 0 "
        _onClick={() => {
          selectFin();
        }}
      />
    </Flex>
  );
};

const IdolMemberBox = styled.div`
  width: 90px;
  height: 140px;
  padding: 10px;
  text-align: center;
`;
const IdolMemberInput = styled.input`
  display: none;
`;

export default IdolMemberSelect;
