import React, { useState } from "react";
import { Grid, Text, Input, Button } from "../../elements";
//import IdolGroups from "../../components/idolGroups";
import { actionCreators as userActions } from "../../redux/modules/user";
import { useSelector, useDispatch } from "react-redux";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nick, setNick] = useState("");
  const type = useSelector((state) => state.user.type);
  const id = useSelector((state) => state.user.id);
  const user = { email, nick, phone, id, type };

  const emailCheck = (email) => {
    const regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email !== "" && email !== "undefined" && regex.test(email);
  };

  const phCheck = (phone) => {
    const regex = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
    return phone !== "" && phone !== "undefined" && regex.test(phone);
  };

  const signup = () => {
    if (email === "" || phone === "" || nick === "") {
      window.alert("이메일, 핸드폰 번호, 닉네임을 모두 입력해주세요");
      return;
    }

    if (!emailCheck(email)) {
      window.alert("이메일을 확인해주세요");
      return;
    }

    if (!phCheck(phone)) {
      window.alert("핸드폰 번호를 확인해주세요");
      return;
    }

    dispatch(userActions.signupAction(user));
  };

  return (
    <>
      <Grid is_flex_col>
        <Text bold size="32px">
          GOODSDUCK
        </Text>
      </Grid>
      <Grid padding="16px 0px">
        <Input
          type="email"
          label="이메일"
          placeholder="이메일을 입력하세요."
          value={email}
          _onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Grid>
      <Grid padding="16px 0px">
        <Input
          label="핸드폰 번호"
          placeholder="핸드폰 번호를 입력하세요."
          value={phone}
          _onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </Grid>
      <Input
        label="닉네임"
        placeholder="닉네임을 입력하세요"
        value={nick}
        _onChange={(e) => {
          setNick(e.target.value);
        }}
      />
      {/* <Text size="14px">좋아하는 아이돌</Text>
      <IdolGroups></IdolGroups> */}
      <Button
        text="NEXT"
        padding="10px"
        _onClick={() => {
          signup();
        }}
      ></Button>
    </>
  );
};

export default Signup;
