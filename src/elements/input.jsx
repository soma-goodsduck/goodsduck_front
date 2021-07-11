/* eslint-disable import/no-cycle */
import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  const { type, label, placeholder, width, _onChange } = props;

  const styles = { width };
  return (
    <>
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElInput
          {...styles}
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
        />
      </Grid>
    </>
  );
};

Input.defaultProps = {
  type: "text",
  label: "텍스트",
  placeholder: "텍스트를 입력해주세요.",
  width: "100%",
  _className: "",
  _onChange: () => {},
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  padding: 12px 4px;
`;

export default Input;
