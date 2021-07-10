import React from "react";
import styles from "./test_header.module.css";
import { Grid, Text, Button } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";

const Header = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();

  if (is_login) {
    return (
      <div className={styles.header}>
        <Grid is_flex>
          <Grid>
            <Text margin="0px" size="24px" bold>
              GOODSDUCK
            </Text>
          </Grid>

          <Grid is_flex>
            <Button
              text="로그아웃"
              width="50%"
              padding="10px"
              _onClick={() => {
                dispatch(userActions.logOut({}));
              }}
            ></Button>
          </Grid>
        </Grid>
      </div>
    );
  } else if (!is_login) {
    return (
      <div className={styles.header}>
        <Grid is_flex>
          <Grid>
            <Text margin="0px" size="24px" bold>
              GOODSDUCK
            </Text>
          </Grid>

          <Grid is_flex>
            <Button
              text="로그인"
              width="50%"
              padding="10px"
              _onClick={() => history.push("/")}
            ></Button>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Header;
