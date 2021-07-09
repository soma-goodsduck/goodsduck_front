import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  const { type, label, placeholder, width, _className, _onChange } = props;

  const styles = { width: width };
  return (
    <React.Fragment>
      <Grid>
        <Text margin="0px">{label}</Text>
        <ElInput
          {...styles}
          type={type}
          placeholder={placeholder}
          className={_className}
          onChange={_onChange}
        />
      </Grid>
    </React.Fragment>
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
