/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import styled from "styled-components";
import styles from "./signup.module.css";
import { Grid, Input, Flex, Text } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import IdolGroups from "../../components/idolSelect/idolGroupSelect";
import { actionCreators as userActions } from "../../redux/modules/user";
import { postActionForNonUser } from "../../shared/axios";
import { red } from "../../shared/colors";

const Signup = () => {
  localStorage.removeItem("likeIdolGroups");
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nick, setNick] = useState("");
  const type = useSelector((state) => state.user.type);
  const id = useSelector((state) => state.user.id);
  let idols = [];
  const user = { email, nick, phone, id, type, idols };
  const [isEmailOk, setIsEmailOk] = useState(true);
  const [isPhoneOk, setIsPhoneOk] = useState(true);
  const [isUsedNick, setIsUsedNick] = useState(false);
  const [isIdolSelected, setIsIdolSelected] = useState(false);
  const [nextOK, setNextOK] = useState(false);

  useEffect(() => {
    if (isEmailOk && isPhoneOk && !isUsedNick && isIdolSelected) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [isEmailOk, isPhoneOk, isUsedNick, isIdolSelected]);

  const emailCheck = (_email) => {
    const regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (_email !== "" && _email !== "undefined" && regex.test(_email)) {
      setIsEmailOk(true);
    } else {
      setIsEmailOk(false);
    }
  };

  const phCheck = (_phone) => {
    const regex = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;

    if (_phone !== "" && _phone !== "undefined" && regex.test(_phone)) {
      setIsPhoneOk(true);
    } else {
      setIsPhoneOk(false);
    }
  };

  const nickCheckPost = _.debounce(async (_nick) => {
    console.log(_nick);
    try {
      const postNick = await postActionForNonUser("v1/users/nickname-check", {
        nickName: _nick,
      });
      console.log(postNick);
      if (postNick.response) {
        setIsUsedNick(false); // 닉네임 사용 가능
      } else {
        setIsUsedNick(true); // 이미 사용중인 닉네임
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);
  const nickCheck = useCallback(nickCheckPost, []);

  const updateIdols = (isCheck, idolId) => {
    if (isCheck) {
      idols.push(idolId);
      setIsIdolSelected(true);
    } else {
      idols = idols.filter((idol) => idol !== idolId);
      if (idols.length === 0) {
        setIsIdolSelected(false);
      }
    }
    console.log(idols);
  };

  const signup = () => {
    if (!nextOK || !isUsedNick || !isEmailOk || !isPhoneOk) {
      return;
    }

    dispatch(userActions.signupAction(user));
  };

  return (
    <SignUpBox>
      <div>
        <HeaderInfo text="회원가입" />
        <Box>
          <Grid padding="16px 0px">
            <LabelText>이메일</LabelText>
            <Flex is_col>
              <Input
                type="email"
                placeholder="이메일을 입력해주세요."
                borderRadius="5px"
                value={email}
                _onChange={(e) => {
                  setEmail(e.target.value);
                  emailCheck(e.target.value);
                }}
              />
              {!isEmailOk && (
                <Text color={red} bold height="2">
                  이메일을 확인해주세요
                </Text>
              )}
            </Flex>
          </Grid>
          <Grid padding="16px 0px">
            <LabelText>핸드폰 번호</LabelText>
            <Flex is_col>
              <Input
                type="number"
                placeholder="핸드폰 번호를 입력해주세요 ex.01012345678"
                borderRadius="5px"
                value={phone}
                _onChange={(e) => {
                  const value = e.target.value.replace(
                    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
                    "$1-$2-$3",
                  );
                  setPhone(value);
                  phCheck(value);
                }}
              />
              {!isPhoneOk && (
                <Text color={red} bold height="2">
                  핸드폰 번호를 확인해주세요 ex.01012345678
                </Text>
              )}
            </Flex>
          </Grid>
          <Grid padding="16px 0px">
            <LabelText>닉네임</LabelText>
            <Flex is_col>
              <Input
                placeholder="닉네임을 입력해주세요"
                borderRadius="5px"
                value={nick}
                _onChange={(e) => {
                  setNick(e.target.value);
                  nickCheck(e.target.value);
                }}
              />
              {isUsedNick && (
                <Text color={red} bold height="3">
                  이미 존재하는 닉네임입니다.
                </Text>
              )}
            </Flex>
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
