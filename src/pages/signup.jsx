import React, { useState } from "react";
import { Grid, Text, Input, Button } from "../elements";
import IdolGroups from "../components/idolGroups";

const Signup = (props) => {
  const [nick, setNick] = useState("");
  const onChangeNick = (e) => {
    setNick(e.target.value);
  };
  return (
    <>
      <Grid is_flex_col>
        <Text bold size="32px">
          GOODSDUCK
        </Text>
      </Grid>
      <Input
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        value={nick}
        onChange={onChangeNick}
      />
      <Text size="14px">좋아하는 아이돌</Text>
      <IdolGroups></IdolGroups>
      <Button text="NEXT" padding="10px"></Button>
    </>
  );
};

export default Signup;
