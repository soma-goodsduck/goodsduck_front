import React from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./test_header.module.css";
import { Grid, Text, Button } from "../elements";

import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";

// eslint-disable-next-line consistent-return
const Header = () => {
  const isLogin = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();

  if (isLogin) {
    return (
      <div className={styles.header}>
        <Grid is_flex>
          <Text margin="0px" size="24px" bold>
            GOODSDUCK
          </Text>

          <Grid is_flex>
            <Button
              text="로그아웃"
              width="50%"
              padding="10px"
              _onClick={() => {
                dispatch(userActions.logOut({}));
              }}
            />
            <Button
              text="굿즈등록"
              width="50%"
              padding="10px"
              _onClick={() => history.push("/new")}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
  if (!isLogin) {
    return (
      <div className={styles.header}>
        <Grid is_flex>
          <Text margin="0px" size="24px" bold>
            GOODSDUCK
          </Text>

          <Grid is_flex>
            <Button
              text="로그인"
              width="50%"
              padding="10px"
              _onClick={() => history.push("/")}
            />
            <Button
              text="굿즈등록"
              width="50%"
              padding="10px"
              _onClick={() => history.push("/new")}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Header;
