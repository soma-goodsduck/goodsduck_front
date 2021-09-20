/* eslint-disable no-useless-escape */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import styled from "styled-components";

import HeaderInfo from "../../components/haeder/headerInfo";
import { Text, Grid, Flex, DoubleCheckModal2 } from "../../elements";
import { red, grayBorder } from "../../shared/colors";

import { requestAuthData, postAction } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";

const EditUserAccountPage = (props) => {
  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.email);
  const pwOriginRef = useRef();
  const pwRef = useRef();
  const pw2Ref = useRef();
  const [pw, setPw] = useState("");
  const [pwOrigin, setPwOrigin] = useState("");
  const [pw2, setPw2] = useState("");
  const [isPwOk, setIsPwOk] = useState(true); // pw 체크
  const [isPw2Ok, setIsPw2Ok] = useState(true); // pw 더블 체크
  const [doubleCheckMessage, setDoubleCheckMessage] = useState("");
  const [showDoubleCheckModal, setShowDoubleCheckModal] = useState(false);

  const reqUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    return result;
  };
  const fnEffect = async () => {
    const userData = await reqUserData();
    if (userData < 0) {
      history.push("/error");
      return;
    }
    dispatch(userActions.setEmail(userData.email));
  };
  useEffect(() => {
    if (email === "") {
      fnEffect();
    }
  }, []);

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

  const reqCheckPwOrigin = async () => {
    const json = {
      email,
      nowPassword: pwOrigin,
      newPassword: pw2,
    };
    const result = await postAction("v1/users/reset-password-member", json);
    return result;
  };
  const handleChangePw = async () => {
    if (pwOrigin === "" || pw === "" || pw2 === "") {
      dispatch(userActions.setShowNotification(true));
      dispatch(
        userActions.setNotificationBody(
          "현재 비밀번호와 새 비밀번호, 새 비밀번호 확인을 모두 입력해주세요.",
        ),
      );
      return;
    }

    const _handleChangePw = await reqCheckPwOrigin();
    if (_handleChangePw < 0) {
      setDoubleCheckMessage("문제가 발생했습니다. 다시 시도해주세요.");
      setShowDoubleCheckModal(true);
    } else if (!_handleChangePw.response) {
      setDoubleCheckMessage("현재 비밀번호가 일치하지 않습니다.");
      setShowDoubleCheckModal(true);
    }

    if (_handleChangePw.response) {
      dispatch(userActions.setShowNotification(true));
      dispatch(userActions.setNotificationBody("비밀번호를 재설정했습니다."));
      history.replace("/setting");
    }
  };

  const handleReset = () => {
    setPwOrigin("");
    setPw("");
    setPw2("");
    setIsPwOk(true);
    setIsPw2Ok(true);
    setShowDoubleCheckModal(false);
  };

  return (
    <>
      {showDoubleCheckModal && (
        <DoubleCheckModal2
          text={doubleCheckMessage}
          onOkClick={() => {
            handleReset();
          }}
        />
      )}
      <HeaderInfo text="계정 관리" />
      <UserAccountBox>
        <Grid padding="16px 0px">
          <LabelText>이메일</LabelText>
          <Flex is_col>
            <Input
              type="email"
              value={email}
              readOnly
              style={{ height: "40px" }}
            />
          </Flex>
        </Grid>
        <Grid padding="16px 0px">
          <LabelText>현재 비밀번호</LabelText>
          <Flex is_col>
            <Input
              type="password"
              placeholder="현재 비밀번호를 입력해주세요."
              ref={pwOriginRef}
              value={pwOrigin}
              onChange={(e) => {
                setPwOrigin(e.target.value);
              }}
            />
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
      </UserAccountBox>
    </>
  );
};

const LabelText = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
  color: #222222;
`;

const UserAccountBox = styled.div`
  margin-top: 50px;
  padding: 0 20px;
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
    width: 375px;
  }
`;

export default EditUserAccountPage;
