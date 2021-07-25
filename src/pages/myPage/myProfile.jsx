/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import styles from "./mypage.module.css";

import { Image } from "../../elements/index";
import HeaderInfo from "../../components/haeder/headerInfo";
import { grayBorder, yellow } from "../../shared/colors";

import { getData, postAction } from "../../shared/axios";

const MyProfile = (props) => {
  // 해당 유저 데이터 받아오기
  const [user, setUser] = useState(null);
  const nickRef = useRef();
  const [nick, setNick] = useState("");
  const [img, setImg] = useState();

  useEffect(() => {
    const getUserData = getData("users/look-up");
    getUserData.then((result) => {
      setUser(result);
      setNick(result.nickName);
    });
  }, []);

  const updateImg = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    console.log(file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(reader.result);
      setImg(reader.result);
    };
  };

  const updateProfile = () => {
    const formData = new FormData();
    formData.append("multipartFiles", img);
    const profileDto = {
      nickName: nick,
    };
    formData.append("stringProfileDto", JSON.stringify(profileDto));

    // const postProfileInfo = postAction("profile", profileDto);
    // postProfileInfo.then((result) => {
    //     console.log(result);
    //     if (result.success === true) {
    //       console.log("프로필 수정에 성공했습니다");
    //       history.push("/myPage");
    //     } else {
    //       console.log("프로필 수정에 실패했습니다");
    //     }
    //   });
  };

  return (
    <>
      <HeaderInfo text="프로필 수정" />
      {user && (
        <MyProfileBox>
          <div>
            <ProfileBox>
              <form method="post" encType="multipart/form-data">
                <label htmlFor="chooseFile">
                  <ImgBox>
                    <Image
                      shape="circle"
                      size="130px"
                      src="https://pbs.twimg.com/media/D99mKq1UYAE5eP9.jpg"
                    />
                    <div className={styles.cameraBtnBox}>
                      <CameraBtn />
                    </div>
                  </ImgBox>
                </label>
                <ImageUploadInput
                  type="file"
                  id="chooseFile"
                  name="chooseFile"
                  accept="image/*"
                  onChange={updateImg}
                />
              </form>
            </ProfileBox>
            <NicknameBox>
              <LabelText>닉네임</LabelText>
              <InputBox
                ref={nickRef}
                borderRadius="5px"
                value={nick}
                onChange={(e) => {
                  setNick(e.target.value);
                }}
              />
            </NicknameBox>
            <IdolBox>
              <LabelText>좋아하는 아이돌</LabelText>
            </IdolBox>
          </div>
          <SaveBtn>저장</SaveBtn>
        </MyProfileBox>
      )}
    </>
  );
};

const MyProfileBox = styled.div`
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
`;

const ProfileBox = styled.div`
  margin-top: 80px;
`;

const ImgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;

const CameraBtn = styled.div`
  z-index: 3;
  width: 45px;
  height: 45px;
  background-image: url("https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_camera2.svg");
  background-size: cover;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const LabelText = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
  color: #222222;
`;

const NicknameBox = styled.div`
  margin-top: 40px;
`;

const InputBox = styled.input`
  type: "text";
  width: 100%;
  border: 2px solid ${grayBorder};
  border-radius: 5px;
  padding: 18px 8px;
`;

const IdolBox = styled.div`
  margin-top: 40px;
`;

const SaveBtn = styled.button`
  width: 100%;
  padding: 15px;
  background-color: ${yellow};
  border-radius: 10px;
`;

export default MyProfile;
