/* eslint-disable no-useless-escape */
import React, { useState, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import _ from "lodash";

import styled from "styled-components";
import styles from "../signup/signup.module.css";
import { Grid, Flex, Text, Icon } from "../../elements";
import Timer from "../signup/timer";
import { red, green, grayBorder, grayBtnText } from "../../shared/colors";

import { postActionForNonUser } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";

const FindEmailOrPwPage = (props) => {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [isPhoneOk, setIsPhoneOk] = useState(false); // ph 유효성 체크
  const [isUsedPhone, setIsUsedPhone] = useState(false); // ph 가입 여부 체크
  const [showSmsValidateBtn, setShowSmsValidateBtn] = useState(false); // 인증 요청 버튼을 눌러서 인증번호를 확인받을 수 있는 창을 보여줌
  const [showTimer, setShowTimer] = useState(false); // 인증 요청과 동시에 타이머 시작
  const [smsCode, setSmsCode] = useState(""); // 인증번호를 입력 받음
  const [isValidated, setisValidated] = useState(false); // 인증번호가 맞는지 확인

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const pwRef = useRef();
  const [isPwOk, setIsPwOk] = useState(true); // pw 체크
  const pw2Ref = useRef();
  const [pw2, setPw2] = useState("");
  const [isPw2Ok, setIsPw2Ok] = useState(true); // pw 더블 체크

  const handleTimeOut = () => {
    setShowTimer(false);
    setShowSmsValidateBtn(false);
  };

  // 이전에 가입한 적이 있는 휴대폰 번호인지 확인
  const reqUsedPhCheckPost = async (_ph) => {
    const result = await postActionForNonUser("v2/users/phone-number-check", {
      phoneNumber: _ph,
    });
    return result;
  };
  const usedPhCheckPost = _.debounce(async (_ph) => {
    const _usedPhCheckPost = await reqUsedPhCheckPost(_ph);

    if (_usedPhCheckPost < 0) {
      history.push("/error");
      return;
    }

    if (_usedPhCheckPost.response === "GOODSDUCK") {
      setIsUsedPhone(true); // 이미 가입한 적 있는 번호
      setIsPhoneOk(true); // 가입한 적 있으므로 인증 요청 가능
    } else {
      setIsUsedPhone(false); // 휴대폰 번호 가입한 적 없음
      setIsPhoneOk(false);
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

  // 본인 인증 - 전송된 문자를 통해 인증 코드 검증
  const reqCheckSmsCode = async () => {
    const result = await postActionForNonUser("v1/sms/authentication-find", {
      phoneNumber: phone,
      authenticationNumber: smsCode,
    });
    return result;
  };
  const checkSmsCode = async () => {
    const _checkSmsCode = await reqCheckSmsCode();

    if (_checkSmsCode < 0) {
      history.push("/error");
      return;
    }

    if (_checkSmsCode.response) {
      setisValidated(true); // code가 일치하다면 OK
      setEmail(_checkSmsCode.response.email);
    } else {
      setShowTimer(false);
      setShowSmsValidateBtn(false);
      setIsPhoneOk(true);
      window.alert("휴대폰 본인 인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 문자 전송
  const reqSendSmsCode = async () => {
    const result = await postActionForNonUser("v1/sms", {
      phoneNumber: phone,
    });
    return result;
  };
  const sendSmsCode = async () => {
    const _sendSmsCode = await reqSendSmsCode();

    if (_sendSmsCode < 0) {
      history.push("/error");
      return;
    }

    if (_sendSmsCode.response) {
      setIsPhoneOk(false);
      setShowSmsValidateBtn(true);
      setisValidated(false);
      setShowTimer(true);
    } else {
      setShowSmsValidateBtn(false);
      window.alert("인증 문자 발송에 실패했습니다.");
    }
  };

  // 비밀번호 유효성 확인
  const _pwCheck = _.debounce(async (_pw) => {
    const regex1 = /[0-9]/;
    const regex2 = /[a-zA-Z]/;
    const regex3 = /[~!@\#$%<>^&*_-]/;

    if (
      !regex1.test(_pw) ||
      !regex2.test(_pw) ||
      !regex3.test(_pw) ||
      _pw.length < 8 ||
      _pw.length > 20
    ) {
      setIsPwOk(false);
    } else {
      setIsPwOk(true);
    }
  }, 500);
  const pwCheck = useCallback(_pwCheck, []);

  // 비밀번호 더블체크
  const _pwDoubleCheck = _.debounce(async (_pw) => {
    if (pwRef.current.value !== pw2Ref.current.value) {
      setIsPw2Ok(false);
    } else {
      setIsPw2Ok(true);
    }
  }, 500);
  const pwDoubleCheck = useCallback(_pwDoubleCheck, []);

  const reqChangePw = async () => {
    const json = {
      email,
      password: pw2,
    };
    const result = await postActionForNonUser("v1/users/reset-password", json);
    return result;
  };
  const handleChangePw = async () => {
    if (pw !== "" && pw2 !== "" && isPw2Ok) {
      const _handleChangePw = await reqChangePw();
      if (_handleChangePw < 0) {
        window.alert("비밀번호 재설정에 실패했습니다.");
        history.push("/find-email-pw");
        return;
      }
      if (_handleChangePw.response) {
        dispatch(userActions.setShowNotification(true));
        dispatch(
          userActions.setNotificationBody(
            "비밀번호를 재설정했습니다. 다시 로그인해주세요.",
          ),
        );
        history.replace("/login");
      }
    }
  };

  return (
    <Box>
      <BackBtn
        onClick={() => {
          history.push("/login");
        }}
      >
        <Icon
          width="24px"
          margin="0 5px 0 0"
          src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_delete.svg"
        />
      </BackBtn>

      <Logo />
      {!isValidated && (
        <>
          <Text is_center>이메일 또는 비밀번호를 잃어버리셨나요?</Text>
          <Text is_center margin="5px 0">
            가입한 휴대폰 번호를 정확히 입력해 주세요.
          </Text>
          <Text is_center>본인인증 후 이메일, 비밀번호 찾을 수 있어요 :D</Text>
        </>
      )}
      <Grid padding="16px 0px" margin="20px 0 0 0">
        <LabelText>핸드폰 번호</LabelText>
        {/* 이전에 가입한 적 있는 핸드폰 번호인지 확인 */}
        <Flex>
          <Input
            type="number"
            placeholder="ex.01012345678"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              phCheck(e.target.value);
              setShowSmsValidateBtn(false);
              setisValidated(false);
              setShowTimer(false);
            }}
            readOnly={isValidated}
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
        {phone !== "" && !isPhoneOk && !showTimer && (
          <Text color={red} bold height="1.5" margin="10px 0 0 0">
            가입된 휴대폰 번호(- 없이)인지 다시 한 번 확인해주세요.
          </Text>
        )}
        {!isValidated && showSmsValidateBtn && (
          <Flex margin="10px 0 0 0">
            <Input
              type="number"
              placeholder="인증 번호를 입력해주세요"
              value={smsCode}
              onChange={(e) => {
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
      {isValidated && (
        <>
          <Grid padding="16px 0px">
            <LabelText>가입하신 이메일은 다음과 같습니다.</LabelText>
            <Flex is_col>
              <Input type="email" value={email} readOnly />
            </Flex>
          </Grid>
          <Grid padding="16px 0px">
            <LabelText>새 비밀번호</LabelText>
            <Flex is_col>
              <Input
                type="password"
                placeholder="새 비밀번호를 입력해주세요."
                ref={pwRef}
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  pwCheck(e.target.value);
                }}
              />
              {!isPwOk && (
                <Text color={red} bold height="2">
                  숫자, 영문, 특수문자 조합으로 8~16자리인지 확인해주세요.
                </Text>
              )}
            </Flex>
          </Grid>
          <Grid padding="16px 0px">
            <LabelText>새 비밀번호 확인</LabelText>
            <Flex is_col>
              <Input
                type="password"
                placeholder="새 비밀번호를 한번 더 입력해주세요."
                ref={pw2Ref}
                value={pw2}
                onChange={(e) => {
                  setPw2(e.target.value);
                  pwDoubleCheck(e.target.value);
                }}
              />
              {!isPw2Ok && (
                <Text color={red} bold height="2">
                  비밀번호가 일치하지 않습니다.
                </Text>
              )}
            </Flex>
          </Grid>
          <PwBtn
            onClick={() => {
              handleChangePw();
            }}
          >
            비밀번호 재설정하기
          </PwBtn>
          <Flex is_flex justify="space-between" margin="25px 0">
            <Line />
            <Text margin="0 10px" color={grayBorder}>
              OR
            </Text>
            <Line />
          </Flex>
          <PwNextBtn
            onClick={() => {
              history.replace("/login");
            }}
          >
            비밀번호 다음에 변경하기
          </PwNextBtn>
        </>
      )}
      {!isValidated && (
        <CustomerBtn
          onClick={() => {
            document.location.href = "http://pf.kakao.com/_njxaWs";
          }}
        >
          <Text is_center color={grayBtnText}>
            그 외 문의가 있다면 클릭해주세요!
          </Text>
        </CustomerBtn>
      )}
    </Box>
  );
};

const Box = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  @media screen and (min-width: 415px) {
    width: 415px;
  }
`;

const Logo = styled.div`
  width: 80%;
  height: 50px;
  margin-bottom: 20px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/logo.svg");
  background-size: contain;
  background-repeat: no-repeat;
`;

const LabelText = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
  color: #222222;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${grayBorder};
  padding: 10px 8px;
`;

const PwBtn = styled.button`
  width: 100%;
  height: 50px;
  border: 2px solid rgb(255, 226, 0);
  color: #fda61d;
  font-weight: 600;
  border-radius: 5px;
  padding: 10px 8px;
  margin: 10px 0;

  @media screen and (min-width: 415px) {
    width: 380px;
  }
`;

const PwNextBtn = styled.button`
  width: 100%;
  height: 50px;
  background: linear-gradient(
    90deg,
    rgba(255, 226, 0, 1) 0%,
    rgba(255, 141, 41, 0.7) 100%
  );
  color: white;
  font-weight: 600;
  border-radius: 5px;
  padding: 10px 8px;
  margin: 10px 0;

  @media screen and (min-width: 415px) {
    width: 380px;
  }
`;

const Line = styled.div`
  width: 40vw;
  height: 1px;
  background-color: ${grayBorder};

  @media screen and (min-width: 415px) {
    width: 170px;
  }
`;

const CustomerBtn = styled.div`
  position: fixed;
  bottom: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const BackBtn = styled.button`
  position: fixed;
  top: 15px;
  right: 10px;
`;

export default FindEmailOrPwPage;
