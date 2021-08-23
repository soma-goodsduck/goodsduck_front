import React, { useState } from "react";

import styled from "styled-components";

import LoginPopUp from "../../elements/loginPopUp";
import IdolGroups from "../idolSelect/idolGroupSelect";
import { putAction } from "../../shared/axios";

const IdolEdit = ({ _onClick }) => {
  const [showPopup, setShowPopup] = useState(false);
  const likeIdolGroupsLS = localStorage.getItem("likeIdolGroups");
  let idols = [];
  const updateIdols = (isCheck, idolId) => {
    if (isCheck) {
      idols.push(idolId);
    } else {
      idols = idols.filter((idol) => idol !== idolId);
    }
  };

  const onEdit = () => {
    if (likeIdolGroupsLS && likeIdolGroupsLS.split(",").map(Number) !== idols) {
      if (idols.length > 0) {
        putAction("v1/users/idol-groups", { likeIdolGroupsId: idols });
        localStorage.setItem("likeIdolGroups", idols);
      }
    }
    window.location.reload();
  };

  return (
    <>
      {showPopup && <LoginPopUp />}
      {!showPopup && (
        <Screen>
          <IdolEditBox>
            <Info>
              <ExitBtn onClick={_onClick} />
              <IdolGroups onUpdate={updateIdols} />
            </Info>
            <EditBtn
              onClick={() => {
                onEdit();
              }}
            >
              수정하기
            </EditBtn>
          </IdolEditBox>
        </Screen>
      )}
    </>
  );
};

const Screen = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  color: #222222;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const IdolEditBox = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 30%;
`;

const Info = styled.div`
  position: relative;
  height: 400px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 5px;
  padding-top: 35px;
  border-radius: 10px;
`;

const EditBtn = styled.button`
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  transition: transform 200ms ease-in;

  &:hover {
    transform: scale(1.05);
  }
`;

const ExitBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 22px;
  height: 22px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_delete.svg");
  background-size: cover;
  cursor: pointer;
`;

export default IdolEdit;
