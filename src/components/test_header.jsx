import React, { useEffect } from "react";
import axios from "axios";
import { Grid, Text, Button } from "../elements";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
//import { getLS } from "../shared/localStorage";

const Header = () => {
  const is_login = useSelector((state) => state.user.is_login);
  const dispatch = useDispatch();
  //const jwt = getLS("jwt");
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACK_LOCALHOST_URL_T}/api/v1/login?token=${jwt}`
      )
      .then(function (result) {
        if (result.data.role === "USER") {
          console.log(result.data);
          dispatch(userActions.loginAction(jwt));
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  if (is_login) {
    return (
      <React.Fragment>
        <Grid is_flex>
          <Grid>
            <Text margin="0px" size="24px" bold>
              GOODSDUCK
            </Text>
          </Grid>

          <Grid is_flex>
            <Button text="내정보"></Button>
            <Button text="알림"></Button>
            <Button
              text="로그아웃"
              _onClick={() => {
                dispatch(userActions.logOut({}));
              }}
            ></Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else if (!is_login) {
    return (
      <React.Fragment>
        <Grid is_flex>
          <Grid>
            <Text margin="0px" size="24px" bold>
              GOODSDUCK
            </Text>
          </Grid>

          <Grid is_flex>
            <Link to="/" style={{ width: "50%" }}>
              <Button text="로그인" padding="10px"></Button>
            </Link>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};

Header.defaultProps = {};

export default Header;
