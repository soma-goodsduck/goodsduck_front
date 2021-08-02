/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import styles from "./signup.module.css";
import { Grid, PopUp, Input } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import IdolGroups from "../../components/idolSelect/idolGroupSelect";
import { actionCreators as userActions } from "../../redux/modules/user";

const Signup = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nick, setNick] = useState("");
  const type = useSelector((state) => state.user.type);
  const id = useSelector((state) => state.user.id);
  let idols = [];
  const user = { email, nick, phone, id, type, idols };
  const [nextOK, setNextOK] = useState(false);
  const [showEmailPopUp, setEmailShowPopUp] = useState(false);
  const [showPhonePopUp, setPhoneShowPopUp] = useState(false);

  useEffect(() => {
    if (email && phone && nick && idols) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [email, phone, nick, idols]);

  useEffect(() => {
    setTimeout(() => {
      setEmailShowPopUp(false);
      setPhoneShowPopUp(false);
    }, 2000);
  }, [showEmailPopUp, showPhonePopUp]);

  const emailCheck = (_email) => {
    const regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return _email !== "" && _email !== "undefined" && regex.test(_email);
  };

  const phCheck = (_phone) => {
    const regex = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
    return _phone !== "" && _phone !== "undefined" && regex.test(_phone);
  };

  const updateIdols = (isCheck, idolId) => {
    if (isCheck) {
      idols.push(idolId);
    } else {
      idols = idols.filter((idol) => idol !== idolId);
    }
    console.log(idols);
  };

  const signup = () => {
    if (!nextOK) {
      return;
    }

    if (!emailCheck(email)) {
      setEmailShowPopUp(true);
      return;
    }

    if (!phCheck(phone)) {
      setPhoneShowPopUp(true);
      return;
    }

    dispatch(userActions.signupAction(user));
  };

  return (
    <SignUpBox>
      {showEmailPopUp && <PopUp width="250px" text1="이메일을 확인해주세요" />}
      {showPhonePopUp && (
        <PopUp width="250px" text1="핸드폰 번호를 확인해주세요" />
      )}
      <div>
        <HeaderInfo text="회원가입" />
        <Box>
          <Grid padding="16px 0px">
            <LabelText>이메일</LabelText>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요."
              borderRadius="5px"
              value={email}
              _onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid padding="16px 0px">
            <LabelText>핸드폰 번호</LabelText>
            <Input
              type="number"
              placeholder="핸드폰 번호를 입력해주세요 ex.01012345678"
              borderRadius="5px"
              value={phone}
              _onChange={(e) => {
                setPhone(
                  e.target.value.replace(
                    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                    "$1-$2-$3",
                  ),
                );
              }}
            />
          </Grid>
          <Grid padding="16px 0px">
            <LabelText>닉네임</LabelText>
            <Input
              placeholder="닉네임을 입력해주세요"
              borderRadius="5px"
              value={nick}
              _onChange={(e) => {
                setNick(e.target.value);
              }}
            />
          </Grid>
          <Grid padding="16px 0px">
            <LabelText>좋아하는 아이돌</LabelText>
            <IdolGroups onUpdate={updateIdols} />
          </Grid>
        </Box>
      </div>
      <button
        className={nextOK ? styles.nextOKBtn : styles.nextBtn}
        type="button"
        onClick={() => {
          signup();
        }}
      >
        다음
      </button>
    </SignUpBox>
  );
};

const SignUpBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
`;

const Box = styled.div`
  margin-top: 50px;
`;

const LabelText = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
  color: #222222;
`;

export default Signup;
