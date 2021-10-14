/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

import styled from "styled-components";
import styles from "./signup.module.css";
import { Grid, Flex, Text } from "../../elements";
import HeaderInfo from "../../components/haeder/headerInfo";
import IdolGroups from "./idolGroups";
import Timer from "./timer";
import AgreementOfTerms from "./agreementOfTerms";

import { actionCreators as userActions } from "../../redux/modules/user";
import { postActionForNonUser } from "../../shared/axios";
import {
  red,
  green,
  grayBorder,
  gray,
  grayBtnBorder,
} from "../../shared/colors";

import { history } from "../../redux/configureStore";
import NoticePopup from "../../elements/NoticeForSignupPopup"; // sms 인증 초과했을 때 공지사항

const Signup = () => {
  localStorage.removeItem("likeIdolGroups");
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [isEmailOk, setIsEmailOk] = useState(true);
  const [isUsedEmail, setIsUsedEmail] = useState(false); // email 가입 여부 체크

  const [pw, setPw] = useState("");
  const pwRef = useRef();
  const [isPwOk, setIsPwOk] = useState(true); // pw 체크
  const pw2Ref = useRef();
  const [pw2, setPw2] = useState("");
  const [isPw2Ok, setIsPw2Ok] = useState(true); // pw 더블 체크

  const [phone, setPhone] = useState("");
  const [isPhoneOk, setIsPhoneOk] = useState(false); // ph 유효성 체크
  const [isUsedPhone, setIsUsedPhone] = useState(false); // ph 가입 여부 체크
  // const [snsType, setSnsType] = useState(""); // 이전에 가입한 적 있다면 어떤 sns로 가입했는지
  const [showSmsValidateBtn, setShowSmsValidateBtn] = useState(false); // 인증 요청 버튼을 눌러서 인증번호를 확인받을 수 있는 창을 보여줌
  const [showTimer, setShowTimer] = useState(false); // 인증 요청과 동시에 타이머 시작
  const [smsCode, setSmsCode] = useState(""); // 인증번호를 입력 받음
  const [isValidated, setisValidated] = useState(false); // 인증번호가 맞는지 확인
  const [isResignedUser, setIsResignedUser] = useState(false); // 탈퇴한 유저인지 확인

  const [nick, setNick] = useState("");
  const [isUsedNick, setIsUsedNick] = useState(false);

  // const idol = useSelector((state) => state.user.idolsForSignup);
  // const [isIdolSelected, setIsIdolSelected] = useState(false);

  // 이용약관, 개인정보, 마케팅 정보 동의
  const [isServiceAgree, setIsServiceAgree] = useState(false);
  const [isPrivacyAgree, setIsPrivacyAgree] = useState(false);
  const [isMarketingAgree, setIsMarketingAgree] = useState(false);

  // const type = useSelector((state) => state.user.type);
  // const id = useSelector((state) => state.user.id);
  const [nextOK, setNextOK] = useState(false);

  // sms 인증 초과했을 때 공지사항
  // const userAgent = window.navigator.userAgent;
  // const isApp = userAgent.indexOf("APP");
  // const [showNoticePopup, setShowNoticePopup] = useState(false);
  // const showNoticeTimeLS = localStorage.getItem("showNoticeTime");

  // useEffect(() => {
  //   if (showNoticeTimeLS) {
  //     // 하루에 한 번
  //     if (new Date(showNoticeTimeLS).getDate() !== new Date().getDate()) {
  //       setShowNoticePopup(true);
  //     }
  //   } else {
  //     setShowNoticePopup(true);
  //   }
  // }, []);

  useEffect(() => {
    if (
      isEmailOk &&
      !isUsedEmail &&
      pw !== "" &&
      pw2 !== "" &&
      nick !== "" &&
      !isUsedNick &&
      // isIdolSelected &&
      isValidated &&
      isServiceAgree &&
      isPrivacyAgree
    ) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [
    isEmailOk,
    isUsedEmail,
    pw,
    pw2,
    nick,
    isUsedNick,
    // isIdolSelected,
    isValidated,
    isServiceAgree,
    isPrivacyAgree,
  ]);

  // 이메일 중복 체크
  const reqUsedEmailCheckPost = async (_email) => {
    const result = await postActionForNonUser("v1/users/email-check", {
      email: _email,
    });
    return result;
  };
  const usedEmailCheckPost = _.debounce(async (_email) => {
    const _usedEmailCheckPost = await reqUsedEmailCheckPost(_email);

    if (_usedEmailCheckPost < 0) {
      history.push("/error");
      return;
    }
    if (_usedEmailCheckPost.response) {
      setIsUsedEmail(false); // 사용 가능한 이메일
    } else {
      setIsUsedEmail(true); // 이미 사용중인 이메일
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

  const handleTimeOut = () => {
    setShowTimer(false);
    setShowSmsValidateBtn(false);
  };

  // 본인 인증 - 전송된 문자를 통해 인증 코드 검증
  const reqCheckSmsCode = async () => {
    const result = await postActionForNonUser("v1/sms/authentication", {
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

  // 이전에 (다른 SNS을 통해) 가입한 적이 있는 휴대폰 번호인지 확인
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

    if (
      // _usedPhCheckPost.response === "NAVER" ||
      // _usedPhCheckPost.response === "KAKAO" ||
      // _usedPhCheckPost.response === "APPLE" ||
      _usedPhCheckPost.response === "GOODSDUCK"
    ) {
      setIsUsedPhone(true); // 이미 가입한 적 있는 번호
      setIsPhoneOk(false);
      setIsResignedUser(false);
      // setSnsType(_usedPhCheckPost.response);
    } else if (_usedPhCheckPost.response === "RESIGNED") {
      setIsUsedPhone(true);
      setIsResignedUser(true); // 탈퇴한 유저
    } else {
      setIsUsedPhone(false); // 휴대폰 번호 가입한 적 없음
      setIsPhoneOk(true); // 가입한 적 없으므로 인증 요청 가능
      setIsResignedUser(false);
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

  const reqNickCheckPost = async (_nick) => {
    const result = await postActionForNonUser(
      "v1/users/nickname-check-register",
      {
        nickName: _nick,
      },
    );
    return result;
  };
  const nickCheckPost = _.debounce(async (_nick) => {
    const _nickCheckPost = await reqNickCheckPost(_nick);

    if (_nickCheckPost < 0) {
      history.push("/error");
      return;
    }

    if (_nickCheckPost.response) {
      setIsUsedNick(false); // 닉네임 사용 가능
    } else {
      setIsUsedNick(true); // 이미 사용중인 닉네임
    }
  }, 500);
  const nickCheck = useCallback(nickCheckPost, []);

  // const updateIdols = () => {
  //   setIsIdolSelected(true);
  // };

  const handleAgreeAllClick = () => {
    setIsServiceAgree(true);
    setIsPrivacyAgree(true);
    setIsMarketingAgree(true);
  };
  const handleAgreeServiceClick = () => {
    setIsServiceAgree(!isServiceAgree);
  };
  const handleAgreePrivacyClick = () => {
    setIsPrivacyAgree(!isPrivacyAgree);
  };
  const handleAgreeMarketingClick = () => {
    setIsMarketingAgree(!isMarketingAgree);
  };

  const signup = () => {
    if (!nextOK) {
      return;
    }

    // const idols = [Number(idol)];
    const idols = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ];
    const user = { email, pw, nick, phone, idols, isMarketingAgree };
    dispatch(userActions.signupAction(user));

    // 소셜 로그인했을 때 회원가입
    // const user = { email, nick, phone, id, type, idols };
    // dispatch(userActions.socialSignupAction(user));
  };

  return (
    <>
      {/* sms 인증 초과했을 때 공지사항 */}
      {/* {showNoticePopup && (
        <NoticePopup
          handleExitClick={() => {
            setShowNoticePopup(false);
          }}
        />
      )} */}
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
                  value={email}
                  onChange={(e) => {
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
              <LabelText>비밀번호</LabelText>
              <Flex is_col>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
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
              <LabelText>비밀번호 확인</LabelText>
              <Flex is_col>
                <Input
                  type="password"
                  placeholder="비밀번호를 한번 더 입력해주세요."
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
            <Grid padding="16px 0px">
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
              {isUsedPhone && !isResignedUser && (
                <Text color={red} bold height="1.5" margin="10px 0 0 0">
                  {/* {snsType}를 통해 이미 가입한 적 있는 번호입니다. */}
                  이미 가입된 번호입니다.
                </Text>
              )}
              {isUsedPhone && isResignedUser && (
                <Text color={red} bold height="1.5" margin="10px 0 0 0">
                  탈퇴한 유저의 번호입니다. 탈퇴한지 30일 후에 재가입 할 수
                  있습니다.
                </Text>
              )}
              {/* 이전에 가입한 적이 없다면 SMS 인증 진행 */}
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
            <Grid padding="16px 0px">
              <LabelText>닉네임</LabelText>
              <Flex is_col>
                <Input
                  placeholder="닉네임을 입력해주세요"
                  value={nick}
                  onChange={(e) => {
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
              <Text color={grayBtnBorder} size="15px" margin="0 0 5px 0">
                회원가입 후 홈, 마이페이지에서 선택할 수 있습니다.
              </Text>
              {/* <IdolGroups onUpdate={updateIdols} /> */}
              <IdolGroups onlyRead />
            </Grid>
          </Box>
          <Grid padding="16px 0px">
            <LabelText>GOODSDUCK 이용을 위한 약관 동의</LabelText>
            <AgreementOfTerms
              onAllClick={handleAgreeAllClick}
              onServiceClick={handleAgreeServiceClick}
              onPrivacyClick={handleAgreePrivacyClick}
              onMarketingClick={handleAgreeMarketingClick}
            />
          </Grid>
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
    </>
  );
};

const SignUpBox = styled.div`
  display: flex;
  flex-direction: column;
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

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${grayBorder};
  padding: 10px 8px;
`;

export default Signup;
