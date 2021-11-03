/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemUpload.module.css";
import { Flex, Spinner } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import { actionCreators as newItemActions } from "../../redux/modules/newItem";

import { requestPublicData } from "../../shared/axios";

const IdolMemberSelect = ({ history }) => {
  const dispatch = useDispatch();
  const idolValue = useSelector((state) => state.newItem.idol_member_id);
  const [isLoading, setIsLoading] = useState(true);

  // 아이돌 멤버 데이터 가져오기
  const groupId = useSelector((state) => state.newItem.idol_group_id);
  const [members, setMembers] = useState([]);

  const reqIdolMemeber = async () => {
    const result = await requestPublicData(
      `v1/idol-members/idol-groups/${groupId}`,
    );
    return result;
  };
  const fnEffect = async () => {
    if (groupId === null) {
      history.push("/upload-item");
      return;
    }
    const getIdolMember = await reqIdolMemeber();
    setIsLoading(false);
    if (getIdolMember < 0) {
      history.push("/error");
      return;
    }
    setMembers(getIdolMember);
  };
  useEffect(fnEffect, []);

  if (!members) {
    return null;
  }

  // 아이돌 멤버 선택
  const [memberId, setMemberId] = useState(0);

  const checkMemberHandler = (id, name) => {
    setMemberId(id);
    dispatch(newItemActions.setIdolMember(id, name));
    history.push("/upload-item");
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <HeaderInfo text="아이돌 그룹" padding="0 16px" isUploading />
          <IdolContainer>
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
          </IdolContainer>
        </>
      )}
    </>
  );
};

const IdolContainer = styled.div`
  margin-top: 65px;
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

export default IdolMemberSelect;
