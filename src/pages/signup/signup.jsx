/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import styled from "styled-components";
import styles from "./signup.module.css";
import { Grid, Input, Flex, Text } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";

import { actionCreators as userActions } from "../../redux/modules/user";
import { postActionForNonUser } from "../../shared/axios";
import { red, green } from "../../shared/colors";
import Timer from "./timer";

import IdolGroups from "./idolGroups";

const Signup = () => {
  localStorage.removeItem("likeIdolGroups");
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isEmailOk, setIsEmailOk] = useState(true);
  const [isUsedEmail, setIsUsedEmail] = useState(false); // email 가입 여부 체크

  const [phone, setPhone] = useState("");
  const [isPhoneOk, setIsPhoneOk] = useState(false); // ph 유효성 체크
  const [isUsedPhone, setIsUsedPhone] = useState(false); // ph 가입 여부 체크
  const [snsType, setSnsType] = useState(""); // 이전에 가입한 적 있다면 어떤 sns로 가입했는지
  const [showSmsValidateBtn, setShowSmsValidateBtn] = useState(false); // 인증 요청 버튼을 눌러서 인증번호를 확인받을 수 있는 창을 보여줌
  const [showTimer, setShowTimer] = useState(false); // 인증 요청과 동시에 타이머 시작
  const [smsCode, setSmsCode] = useState(""); // 인증번호를 입력 받음
  const [isValidated, setisValidated] = useState(false); // 인증번호가 맞는지 확인

  const [nick, setNick] = useState("");
  const [isUsedNick, setIsUsedNick] = useState(false);

  const idol = useSelector((state) => state.user.idolsForSignup);
  const [isIdolSelected, setIsIdolSelected] = useState(false);

  const type = useSelector((state) => state.user.type);
  const id = useSelector((state) => state.user.id);
  const [nextOK, setNextOK] = useState(false);

  useEffect(() => {
    if (
      !isUsedEmail &&
      nick !== "" &&
      !isUsedNick &&
      isIdolSelected &&
      isValidated
    ) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [isUsedEmail, nick, isUsedNick, isIdolSelected, isValidated]);

  // 이메일 중복 체크
  const usedEmailCheckPost = _.debounce(async (_email) => {
    try {
      const postEmail = await postActionForNonUser("v1/users/email-check", {
        email: _email,
      });
      if (postEmail.response) {
        setIsUsedEmail(false); // 사용 가능한 이메일
      } else {
        setIsUsedEmail(true); // 이미 사용중인 이메일
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);
  const usedEmailCheck = useCallback(usedEmailCheckPost, []);

  const emailCheck = (_email) => {
    const regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (_email !== "" && _email !== "undefined" && regex.test(_email)) {
      setIsEmailOk(true);
      usedEmailCheck(_email);
    } else {
      setIsEmailOk(false);
    }
  };

  const handleTimeOut = () => {
    setShowTimer(false);
    setShowSmsValidateBtn(false);
  };

  // 본인 인증 - 전송된 문자를 통해 인증 코드 검증
  const checkSmsCode = async () => {
    const postSmsCode = postActionForNonUser("v1/sms/authentication", {
      phoneNumber: phone,
      authenticationNumber: smsCode,
    });
    postSmsCode.then((result) => {
      if (result.response) {
        setisValidated(true); // code가 일치하다면 OK
      } else {
        setShowTimer(false);
        setShowSmsValidateBtn(false);
        setIsPhoneOk(true);
        window.alert("휴대폰 본인 인증에 실패했습니다. 다시 시도해주세요.");
      }
    });
  };
  // 문자 전송
  const sendSmsCode = () => {
    const postSms = postActionForNonUser("v1/sms", {
      phoneNumber: phone,
    });
    postSms.then((result) => {
      if (result.response) {
        setIsPhoneOk(false);
        setShowSmsValidateBtn(true);
        setisValidated(false);
        setShowTimer(true);
      } else {
        setShowSmsValidateBtn(false);
        window.alert("인증 문자 발송에 실패했습니다.");
      }
    });
  };

  // 이전에 다른 SNS을 통해 가입한 적이 있는 휴대폰 번호인지 확인
  const usedPhCheckPost = _.debounce(async (_ph) => {
    try {
      const postPhone = await postActionForNonUser(
        "v1/users/phone-number-check",
        {
          phoneNumber: _ph,
        },
      );
      if (postPhone.response === "NAVER" || postPhone.response === "KAKAO") {
        setIsUsedPhone(true); // 이미 가입한 적 있는 번호
        setIsPhoneOk(false);
        setSnsType(postPhone.response);
      } else {
        setIsUsedPhone(false); // 휴대폰 번호 가입한 적 없음
        setIsPhoneOk(true); // 가입한 적 없으므로 인증 요청 가능
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);
  const usedPhCheck = useCallback(usedPhCheckPost, []);

  const phCheck = (_phone) => {
    const value = _phone.split("-").join("");
    const regex = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;

    if (regex.test(value)) {
      usedPhCheck(_phone);
    } else {
      setIsPhoneOk(false);
    }
  };

  const nickCheckPost = _.debounce(async (_nick) => {
    try {
      const postNick = await postActionForNonUser("v1/users/nickname-check", {
        nickName: _nick,
      });
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

  const updateIdols = () => {
    setIsIdolSelected(true);
  };

  const signup = () => {
    if (!nextOK) {
      return;
    }

    const idols = [Number(idol)];
    const user = { email, nick, phone, id, type, idols };
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
              {isUsedEmail && (
                <Text color={red} bold height="2">
                  이미 사용 중인 이메일입니다.
                </Text>
              )}
            </Flex>
          </Grid>
          <Grid padding="16px 0px">
            <LabelText>핸드폰 번호</LabelText>
            {/* 이전에 가입한 적 있는 핸드폰 번호인지 확인 */}
            <Flex>
              <Input
                type="number"
                placeholder="ex.01012345678"
                borderRadius="5px"
                value={phone}
                _onChange={(e) => {
                  setPhone(e.target.value);
                  phCheck(e.target.value);
                  setShowSmsValidateBtn(false);
                  setisValidated(false);
                  setShowTimer(false);
                }}
              />
              <button
                className={isPhoneOk ? styles.nextSmsBtn : styles.smsBtn}
                type="button"
                onClick={() => {
                  if (isPhoneOk) {
                    sendSmsCode();
                  }
                }}
              >
                인증 요청
              </button>
            </Flex>
            {phone !== "" && !isPhoneOk && !isUsedPhone && !showTimer && (
              <Text color={red} bold height="1.5" margin="10px 0 0 0">
                휴대폰 번호(- 없이)를 다시 한 번 확인해주세요.
              </Text>
            )}
            {isUsedPhone && (
              <Text color={red} bold height="1.5" margin="10px 0 0 0">
                {snsType}를 통해 이미 가입한 적 있는 번호입니다.
              </Text>
            )}
            {/* 이전에 가입한 적이 없다면 SMS 인증 진행 */}
            {!isValidated && showSmsValidateBtn && (
              <Flex margin="10px 0 0 0">
                <Input
                  type="number"
                  placeholder="인증 번호를 입력해주세요"
                  borderRadius="5px"
                  value={smsCode}
                  _onChange={(e) => {
                    setSmsCode(e.target.value);
                  }}
                />
                <button
                  className={styles.nextSmsBtn}
                  type="button"
                  onClick={() => {
                    if (smsCode !== "") {
                      checkSmsCode();
                    }
                  }}
                >
                  인증 확인
                </button>
              </Flex>
            )}
            {!isValidated && showTimer && (
              <Timer
                onTimeOut={() => {
                  handleTimeOut();
                }}
              />
            )}
            {isValidated && (
              <Text color={green} bold height="1.5" margin="10px 0 0 0">
                휴대폰 인증이 완료되었습니다.
              </Text>
            )}
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
