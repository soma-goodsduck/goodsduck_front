import React from "react";
import { Grid, Text, Button } from "../elements";
import { NAVER_AUTH_URL, KAKAO_AUTH_URL } from "../shared/OAuth";
// import { actionCreators as userActions } from "../redux/modules/user";
// import { useDispatch } from "react-redux";

const Login = (props) => {
  // const dispatch = useDispatch();

  // const login = () => {
  //   dispatch(userActions.login({ user_name: "perl" }));
  // };

  return (
    <Grid is_flex>
      <a href={NAVER_AUTH_URL}>
        <Button
          width="50px"
          height="50px"
          borderRadius="50%"
          margin="0 20px 0 0"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEUAxzz///8AxjcAxCZQ0Gjc9N/m9+jR8dbQ9Ntp2YMAxjgAxCwAxTAAxTP7//3p+Osfy01R1HC068Hx/PTL8tVIz2O77cfF7ct/3pXX9d8Awx+L4aA70F+Y5KlJ0mqn6LcszVWh5rB024yH4Jtg2oBa1Xau6bwozVMQgS/cAAACxklEQVR4nO3c7W7aQBBG4Vm7QPGabwqBkBSSpr3/O6yUKi0EbK8NjTKvzvPbWnHixWInks0AAAAAAAAAAAAAAAAAAAAAAAAAQEORJ4kJS8WbrXRLxbdFP8FknjcuFVeTlJXWH5yYfQlphmXTUvnXpIV6zX+rm0ouHE+LhqW8F4Zl0010XxjuGhL9FzbtU/+FYbOtXUqgMNzXPugVCsMuq1lKonAzqllKojA81OxTjcLwWH0XRQr78oXhe+UHVCkMs6q7KFM4sYqfNjKFYV7xPNUprDoqChUuLu9TocKwuvgTXKkwPF3ap1KFF4+KUoVheeF5qlUY7s4TxQrH+7Ojolhh2JzdRLXC85GGXOHZSEOvsPfuJuoVhsNpomDhu6OiYmE/O/5po1h4OtKQLDzZp5qFx0dFzcLjkYZo4dFIQ7Xw3z5VLQzrt08sW/h3pKFb+DbS0C0My1y9MDxH9cLx61FRuTBsSvXC15GGdmHYZ+qF/VK9MByiemGYbdUL+87v4aT5ksPSdeGPRfM1CZd85sKXtOv8Fg63P9ULS0v4KrouHI0e1QstP6gXWt5XL8x26oUWH9QLrdyoF2a7sXihxWf1wtRjruPCwq7dp5+90Mon9UKLa/XCYpp2DvRbaOVQvdDyuXphMbpmn3ootNE1Iw0XhRavGGn4KCyy7kdFH4U2mqkXXjHS8FJoses+dVPYeaThptDivXqhld2Oio4KO440HBV2HGl4KrRt2n8MHRd2Gmm4Kuw00vBVaHGlXthhpOGssMNIw1th+5GGu8Iia7lP3RW2Pir6K2x7VHRYWBStjooOC1vuU4+FFg/qhRZ76oXZL/XCNiMNp4UtRhpeC7N96lHRa6HFO/VCyxNHGh9dWOx6gwSbl7r3ev5ZaZqy0GBQ9TK0/ybxjeWNgTd99zkAAAAAAAAAAAAAAAAAAAAAAAAACb8BlaxF0SY61+4AAAAASUVORK5CYII="
        />
      </a>

      <a href={KAKAO_AUTH_URL}>
        <Button
          width="50px"
          height="50px"
          borderRadius="50%"
          margin="0 20px 0 0"
          src="https://t1.daumcdn.net/cfile/tistory/99DD44345F33780309"
        />
      </a>
    </Grid>
  );
};

export default Login;
