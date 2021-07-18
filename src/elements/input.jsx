/* eslint-disable import/no-cycle */
import React from "react";
import styled from "styled-components";
import { grayBorder } from "../shared/color";
import { Text, Grid } from "./index";

const Input = (props) => {
  const { type, label, placeholder, width, borderRadius, border, _onChange } =
    props;

  const styles = { width, borderRadius, border };
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
  label: "",
  placeholder: "텍스트를 입력해주세요.",
  width: "100%",
  borderRadius: "",
  border: `2px solid ${grayBorder}`,
  _className: "",
  _onChange: () => {},
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.border};
  padding: 12px 8px;
`;

export default Input;
