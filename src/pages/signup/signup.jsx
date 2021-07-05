import React, { useState } from "react";
import { Grid, Text, Input, Button } from "../../elements";
import IdolGroups from "../../components/idolGroups";
import { actionCreators as userActions } from "../../redux/modules/user";
import { useDispatch } from "react-redux";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nick, setNick] = useState("");

  const signup = () => {
    dispatch(userActions.signupAction({ user_name: nick }));
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
          label="Email"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Grid>
      <Grid padding="16px 0px">
        <Input
          label="Phone Number"
          placeholder="핸드폰 번호를 입력하세요."
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </Grid>
      <Input
        label="닉네임"
        placeholder="닉네임을 입력하세요"
        value={nick}
        onChange={(e) => {
          setNick(e.target.value);
        }}
      />
      <Text size="14px">좋아하는 아이돌</Text>
      <IdolGroups></IdolGroups>
      <Button
        text="NEXT"
        padding="10px"
        onClick={() => {
          signup();
        }}
      ></Button>
    </>
  );
};

export default Signup;
