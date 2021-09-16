/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import styled from "styled-components";
import styles from "./myProfilePage.module.css";

import EditIdolGroup from "./editIdolGroup";
import { Image, Text, DoubleCheckModal } from "../../elements/index";
import HeaderInfo from "../../components/haeder/headerInfo";
import { grayBorder, red } from "../../shared/colors";

import { actionCreators as userActions } from "../../redux/modules/user";
import { requestAuthData, putAction, postAction } from "../../shared/axios";
import { history } from "../../redux/configureStore";

const EditProfilePage = (props) => {
  const dispatch = useDispatch();

  const likeIdolGroupsLS = localStorage.getItem("likeIdolGroups");
  const [user, setUser] = useState(null);
  const nickRef = useRef();
  const [nick, setNick] = useState("");
  const [isUsedNick, setIsUsedNick] = useState(false);
  const [canUpdateNick, setCanUpdateNick] = useState(true);
  const [isNickUpdated, setIsNickUpdated] = useState(false);
  const [img, setImg] = useState(
    "https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/sample_goodsduck.png",
  );
  const [imgFile, setImgFile] = useState();
  const idols = useSelector((state) => state.user.favIdolGroups);
  const [nextOK, setNextOK] = useState(false);
  const [showDoubleCheck, setShowDoubleCheck] = useState(false);

  const reqUserData = async () => {
    const result = await requestAuthData("v1/users/look-up");
    return result;
  };
  const fnEffect = async () => {
    const idolsFromUser = [];
    const getUserData = await reqUserData();

    if (getUserData < 0) {
      history.push("/error");
      return;
    }

    setUser(getUserData);
    setNick(getUserData.nickName);
    if (getUserData.imageUrl !== null) {
      setImg(getUserData.imageUrl);
    }
    getUserData.likeIdolGroups.forEach((idolId) => {
      idolsFromUser.push(idolId.idolGroupId);
      dispatch(userActions.setFavIdolGroups([...idols, idolId.idolGroupId]));
    });
    dispatch(userActions.setFavIdolGroups(idolsFromUser));
  };
  useEffect(fnEffect, []);

  useEffect(() => {
    if (nick !== "" && !isUsedNick && canUpdateNick) {
      setNextOK(true);
    } else {
      setNextOK(false);
    }
  }, [nick, isUsedNick, canUpdateNick]);

  const updateImg = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    setImgFile(file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  // 닉네임 중복체크
  const reqNickCheckPost = async (_nick) => {
    const result = await postAction("v1/users/nickname-check", {
      nickName: _nick,
    });
    return result;
  };
  const nickCheckPost = _.debounce(async (_nick) => {
    const _nickCheckPost = await reqNickCheckPost(_nick);
    console.log(_nickCheckPost.response);

    if (_nickCheckPost < 0) {
      history.push("/error");
      return;
    }

    if (_nickCheckPost.response.isSame) {
      setIsUsedNick(true); // 이미 사용중인 닉네임
    } else {
      setIsUsedNick(false); // 닉네임 사용 가능
    }

    const today = new Date();
    const updatedTime = new Date(_nickCheckPost.response.updatedAt);
    const betweenTime = Math.floor(
      (today.getTime() - updatedTime.getTime()) / 1000 / 60,
    );
    if (Math.floor(betweenTime / 60 / 24) < 30) {
      setCanUpdateNick(false); // 한 달 안에 닉네임을 바꾼 적이 있음
    } else {
      setCanUpdateNick(true);
    }

    setIsNickUpdated(true);
  }, 500);
  const nickCheck = useCallback(nickCheckPost, []);

  const updateIdols = (isCheck, idolId) => {
    if (isCheck) {
      dispatch(userActions.setFavIdolGroups([...idols, idolId]));
    } else {
      const newIdols = idols.filter((idol) => idol !== idolId);
      dispatch(userActions.setFavIdolGroups(newIdols));
    }
  };

  const reqUpdateProfile = async (formData) => {
    const result = await putAction("v1/users/profile", formData);
    return result;
  };
  const updateProfile = async () => {
    if (!nextOK) {
      return;
    }

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

        let _img = img;
        if (imgFile) {
          const reader = new FileReader();
          reader.readAsDataURL(imgFile);
          reader.onloadend = () => {
            _img = reader.result;
          };
        }
        dispatch(userActions.setUserInfo(nick, _img));

        const _updateProfile = await reqUpdateProfile(formData);
        if (_updateProfile < 0) {
          history.push("/error");
          return;
        }
        history.replace("/my-profile");
        dispatch(userActions.setShowNotification(true));
        dispatch(userActions.setNotificationBody("프로필을 수정했습니다."));
      }
    }
  };

  return (
    <>
      {showDoubleCheck && (
        <DoubleCheckModal
          text1="닉네임 수정은 한 달에 1번만 가능합니다."
          text2="프로필을 수정하시겠습니까?"
          onOkClick={() => {
            updateProfile();
          }}
          onNoClick={() => {
            setShowDoubleCheck(false);
          }}
        />
      )}
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
                  nickCheck(e.target.value);
                }}
              />
              {isUsedNick && (
                <Text color={red} bold height="3">
                  이미 존재하는 닉네임입니다.
                </Text>
              )}
              {!canUpdateNick && (
                <Text color={red} bold height="3">
                  한 달 이내에 닉네임을 변경한 적이 있습니다.
                </Text>
              )}
            </NicknameBox>
            <IdolBox>
              <LabelText>좋아하는 아이돌</LabelText>
              <EditIdolGroup onUpdate={updateIdols} />
            </IdolBox>
          </div>
          <button
            className={nextOK ? styles.nextOKBtn : styles.nextBtn}
            type="button"
            onClick={() => {
              if (isNickUpdated && nextOK) {
                setShowDoubleCheck(true);
              } else {
                updateProfile();
              }
            }}
          >
            저장
          </button>
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

export default EditProfilePage;
