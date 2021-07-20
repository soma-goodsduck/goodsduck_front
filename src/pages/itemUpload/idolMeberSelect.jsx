/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Flex } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";

import { getInfo } from "../../shared/axios";

const IdolMemberSelect = ({ history }) => {
  const dispatch = useDispatch();
  const idolValue = useSelector((state) => state.newItem.idol_member_id);

  // 아이돌 멤버 데이터 가져오기
  const groupId = useSelector((state) => state.newItem.idol_group_id);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getIdolMember = getInfo(`/idol/${groupId}/member`);
    getIdolMember.then((result) => {
      setMembers(result);
    });
  }, []);

  if (!members) {
    return null;
  }

  // 아이돌 멤버 선택
  const [memberId, setMemberId] = useState(0);
  const [nextOK, setNextOK] = useState(false);

  useEffect(() => {
    if (memberId) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [memberId]);

  const checkMemberHandler = (id, name) => {
    console.log(id, name);
    setMemberId(id);
    dispatch(newItemActions.setIdolMemberAction(id, name));
  };

  const selectFin = () => {
    if (!memberId) {
      return;
    }
    history.push("/new");
  };

  return (
    <>
      <HeaderInfo text="아이돌 그룹" padding="0 16px" />
      <IdolContainer>
        <div>
          <div className={styles.detailText}>전체 아이돌 멤버</div>
          <Flex is_flex is_wrap>
            {members.map((member) => (
              <IdolMemberBox key={member.id}>
                <IdolMemberInput
                  id={member.id}
                  type="radio"
                  checked={idolValue === member.id}
                  onChange={() => checkMemberHandler(member.id, member.name)}
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
          </Flex>
        </div>
        <ButtonBox>
          <button
            className={nextOK ? styles.nextOKBtn : styles.nextBtn}
            type="button"
            onClick={() => {
              selectFin();
            }}
          >
            다음
          </button>
        </ButtonBox>
      </IdolContainer>
    </>
  );
};

const IdolContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const IdolMemberBox = styled.div`
  width: 90px;
  height: 120px;
  padding: 5px;
  text-align: center;
`;
const IdolMemberInput = styled.input`
  display: none;
`;
const ButtonBox = styled.div`
  width: 100%;
  padding: 0 16px;
`;

export default IdolMemberSelect;
