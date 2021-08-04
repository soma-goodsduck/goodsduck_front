/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./mypage.module.css";

import EditIdolGroup from "./editIdolGroup";
import { Image } from "../../elements/index";
import HeaderInfo from "../../components/haeder/headerInfo";
import { grayBorder, yellow } from "../../shared/colors";

import { actionCreators as userActions } from "../../redux/modules/user";
import { getData, putAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const EditProfilePage = (props) => {
  const dispatch = useDispatch();

  const likeIdolGroupsLS = localStorage.getItem("likeIdolGroups");
  const [user, setUser] = useState(null);
  const nickRef = useRef();
  const [nick, setNick] = useState("");
  const [img, setImg] = useState(
    "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png",
  );
  const [imgFile, setImgFile] = useState();
  const idols = useSelector((state) => state.user.favIdolGroups);

  useEffect(() => {
    const idolsFromUser = [];
    const getUserData = getData("users/look-up");
    getUserData.then((result) => {
      setUser(result);
      setNick(result.nickName);
      if (result.imageUrl !== null) {
        setImg(result.imageUrl);
      }
      result.likeIdolGroups.forEach((idolId) => {
        idolsFromUser.push(idolId.idolGroupId);
        dispatch(userActions.setFavIdolGroups([...idols, idolId.idolGroupId]));
      });
      dispatch(userActions.setFavIdolGroups(idolsFromUser));
    });
  }, []);

  const updateImg = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    setImgFile(file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  const updateProfile = () => {
    const formData = new FormData();
    // 프로필 이미지 수정
    if (imgFile) {
      formData.append("multipartFile", imgFile);
    }

    if (likeIdolGroupsLS) {
      if (idols.length > 0) {
        const newIdols = Array.from(new Set(idols));
        // 닉네임 & 좋아하는 아이돌 수정
        const profileDto = {
          nickName: nick,
          likeIdolGroupsId: newIdols,
        };
        formData.append("stringProfileDto", JSON.stringify(profileDto));
        localStorage.setItem("likeIdolGroups", newIdols);

        putAction("users/profile", formData);
        history.replace("/my-profile");
        history.go(0);
      }
    }
  };

  const updateIdols = (isCheck, idolId) => {
    if (isCheck) {
      dispatch(userActions.setFavIdolGroups([...idols, idolId]));
    } else {
      const newIdols = idols.filter((idol) => idol !== idolId);
      dispatch(userActions.setFavIdolGroups(newIdols));
    }
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
                    <Image shape="circle" size="130px" src={img} />
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
              <EditIdolGroup onUpdate={updateIdols} />
            </IdolBox>
          </div>
          <SaveBtn
            onClick={() => {
              updateProfile();
            }}
          >
            저장
          </SaveBtn>
        </MyProfileBox>
      )}
    </>
  );
};

const MyProfileBox = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
`;

const ProfileBox = styled.div`
  margin-top: 65px;
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
  margin-top: 30px;
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
  margin-bottom: 15px;
`;

export default EditProfilePage;
