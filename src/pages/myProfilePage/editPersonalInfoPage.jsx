import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./myProfilePage.module.css";

import HeaderInfo from "../../components/haeder/headerInfo";
import { Text } from "../../elements";

import { requestAuthData, postAction, putJsonAction } from "../../shared/axios";
import { actionCreators as userActions } from "../../redux/modules/user";
import { history } from "../../redux/configureStore";
import { grayBtnBorder } from "../../shared/colors";

const EditPersonalInfoPage = (props) => {
  const dispatch = useDispatch();

  const addressRef = useRef();
  const nameRef = useRef();
  const phRef = useRef();
  const bankAccountRef = useRef();
  const bankNameRef = useRef();
  const bankUserNameRef = useRef();
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [isNewAccount, setIsNewAccount] = useState(false);

  const { _address, _name, _phNum, _bankAccount, _bankName, _bankUserName } =
    useSelector((state) => ({
      _address: state.user.address,
      _name: state.user.name,
      _phNum: state.user.phNum,
      _bankAccount: state.user.bankAccount,
      _bankName: state.user.bankName,
      _bankUserName: state.user.bankUserName,
    }));

  const reqAddress = async () => {
    const result = await requestAuthData("v1/users/address");
    return result;
  };
  const reqAccount = async () => {
    const result = await requestAuthData("v1/users/account");
    return result;
  };
  const fnEffect = async () => {
    const getAddress = await reqAddress();
    const getAccount = await reqAccount();

    if (getAddress < 0 || getAccount < 0) {
      if (getAddress === -101) {
        setIsNewAddress(true);
      }
      if (getAccount === -101) {
        setIsNewAccount(true);
      }

      if (getAddress === -999 || getAccount === -999) {
        history.push("/error");
        return;
      }
    }

    dispatch(userActions.setAddress(getAddress.detailAddress));
    dispatch(userActions.setName(getAddress.name));
    dispatch(userActions.setPhNum(getAddress.phoneNumber));
    dispatch(userActions.setBankAccount(getAccount.accountNumber));
    dispatch(userActions.setBankName(getAccount.bank));
    dispatch(userActions.setBankUserName(getAccount.name));
  };
  useEffect(fnEffect, []);

  // ????????? ?????? ?????? & ??????
  const reqSaveAddress = async () => {
    const json = {
      detailAddress: String(_address),
      name: String(_name),
      phoneNumber: String(_phNum),
    };
    const result = await postAction("v1/users/address", json);
    return result;
  };
  const reqEditAddress = async () => {
    const json = {
      detailAddress: String(_address),
      name: String(_name),
      phoneNumber: String(_phNum),
    };
    const result = await putJsonAction("v1/users/address", json);
    return result;
  };
  const handleAddress = async () => {
    if (isNewAddress) {
      const _saveAddress = await reqSaveAddress();
      if (_saveAddress < 0) {
        history.push("/error");
      }
      if (_saveAddress.response) {
        setIsNewAddress(false);
        dispatch(userActions.setShowNotification(true));
        dispatch(
          userActions.setNotificationBody("????????? ????????? ??????????????????."),
        );
      }
    } else {
      const _editAddress = await reqEditAddress();
      if (_editAddress < 0) {
        history.push("/error");
      }
      if (_editAddress.response) {
        dispatch(userActions.setShowNotification(true));
        dispatch(
          userActions.setNotificationBody("????????? ????????? ??????????????????."),
        );
      }
    }
  };

  // ???????????? ?????? & ??????
  const reqSaveAccount = async () => {
    const json = {
      accountNumber: _bankAccount,
      bank: _bankName,
      name: _bankUserName,
    };
    const result = await postAction("v1/users/account", json);
    return result;
  };
  const reqEditAccount = async () => {
    const json = {
      accountNumber: _bankAccount,
      bank: _bankName,
      name: _bankUserName,
    };
    const result = await putJsonAction("v1/users/account", json);
    return result;
  };
  const handleAccount = async () => {
    if (isNewAccount) {
      const _saveAccount = await reqSaveAccount();
      if (_saveAccount < 0) {
        history.push("/error");
      }
      if (_saveAccount.response) {
        setIsNewAccount(false);
        dispatch(userActions.setShowNotification(true));
        dispatch(userActions.setNotificationBody("??????????????? ??????????????????."));
      }
    } else {
      const _editAccount = await reqEditAccount();
      if (_editAccount < 0) {
        history.push("/error");
      }
      if (_editAccount.response) {
        dispatch(userActions.setShowNotification(true));
        dispatch(userActions.setNotificationBody("??????????????? ??????????????????."));
      }
    }
  };

  return (
    <>
      <HeaderInfo text="????????? ?????? ??? ?????? ??????" isSetting />
      <InfoContainer>
        <div style={{ margin: "0 0 10px 0" }}>
          <Text bold size="18px" margin="0 0 10px 0" color="#222222">
            ????????? ??????
          </Text>
          <InputBox
            className={_address ? "" : styles.inputText}
            ref={addressRef}
            value={_address || ""}
            placeholder="??????"
            onChange={() => {
              dispatch(userActions.setAddress(addressRef.current.value));
            }}
          />
          <InputBox
            className={_phNum ? "" : styles.inputText}
            ref={phRef}
            value={_phNum || ""}
            placeholder="????????? ??????"
            onChange={() => {
              dispatch(userActions.setPhNum(phRef.current.value));
            }}
          />
          <InputBox
            className={_name ? "" : styles.inputText}
            ref={nameRef}
            value={_name || ""}
            placeholder="??????"
            onChange={() => {
              dispatch(userActions.setName(nameRef.current.value));
            }}
          />
          <EditBtn
            onClick={() => {
              handleAddress();
            }}
          >
            {isNewAddress ? "????????? ?????? ??????" : "????????? ?????? ??????"}
          </EditBtn>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Text bold size="18px" margin="0 0 10px 0" color="#222222">
            ????????????
          </Text>
          <InputBox
            className={_bankName ? "" : styles.inputText}
            ref={bankNameRef}
            value={_bankName || ""}
            placeholder="?????????"
            onChange={() => {
              dispatch(userActions.setBankName(bankNameRef.current.value));
            }}
          />
          <InputBox
            className={_bankAccount ? "" : styles.inputText}
            ref={bankAccountRef}
            value={_bankAccount || ""}
            placeholder="????????????"
            onChange={() => {
              dispatch(
                userActions.setBankAccount(bankAccountRef.current.value),
              );
            }}
          />
          <InputBox
            className={_bankUserName ? "" : styles.inputText}
            ref={bankUserNameRef}
            value={_bankUserName || ""}
            placeholder="??????"
            onChange={() => {
              dispatch(
                userActions.setBankUserName(bankUserNameRef.current.value),
              );
            }}
          />
          <EditBtn
            onClick={() => {
              handleAccount();
            }}
          >
            {isNewAccount ? "???????????? ??????" : "???????????? ??????"}
          </EditBtn>
        </div>
      </InfoContainer>
    </>
  );
};

const InfoContainer = styled.div`
  padding: 20px;
  margin-top: 60px;
`;
const InputBox = styled.input`
  width: 100%;
  padding: 10px 0;
`;
const EditBtn = styled.button`
  width: 100%;
  border-radius: 5px;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid ${grayBtnBorder};
  color: #666666;
`;

export default EditPersonalInfoPage;
