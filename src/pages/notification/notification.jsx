import React from "react";
import { Icon } from "../../elements";

const Notification = ({ history }) => {
  const goBack = () => {
    console.log("back");
    history.goBack();
  };

  return (
    <div>
      <Icon
        src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_back_b.svg"
        _onClick={() => {
          goBack();
        }}
      />
      <h1>Notification</h1>
    </div>
  );
};

export default Notification;
