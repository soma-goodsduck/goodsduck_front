/* eslint-disable import/no-cycle */
import React from "react";
import styled from "styled-components";
import { grayBorder } from "../shared/colors";
import { Text, Grid } from "./index";

const Input = (props) => {
  const {
    type,
    label,
    placeholder,
    width,
    borderRadius,
    border,
    size,
    center,
    bold,
    _onChange,
  } = props;

  const styles = { width, borderRadius, border, size, center, bold };
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
  padding: 10px 8px;
  font-size: ${(props) => props.size};
  ${(props) => (props.center ? "text-align: center;" : "")}
  ${(props) => (props.bold ? "font-weight: 600;" : "")}
`;

export default Input;
