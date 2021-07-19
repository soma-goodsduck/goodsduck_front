/* eslint-disable prefer-destructuring */
/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemImgUpload.module.css";
import { Flex, Image } from "../../elements/index";

import { actionCreators as imgActions } from "../../redux/modules/image";

const ItemImgUpload = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user);
  const fileList = [];
  const fileObject = {};
  const previewContainer = document.getElementById("preview-container");

  // 이미지 & 프리뷰 삭제
  const deletePreview = (event) => {
    delete fileObject[`${event.target.parentNode.id}`];

    const box = event.target.parentNode;
    previewContainer.removeChild(box);

    const newFileList = Object.values(fileObject);
    dispatch(imgActions.saveImgAction(userId, newFileList));
  };

  // 이미지 & 프리뷰 등록 및 미리보기 보여주기
  const showPreview = (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i += 1) {
      const previewBox = document.createElement("div");
      const preview = document.createElement("img");
      const deleteBtn = document.createElement("button");
      previewBox.id = `${i}`;
      preview.className = `${styles.previewImg}`;
      deleteBtn.className = `${styles.deleteBtn}`;
      deleteBtn.onclick = (event) => {
        deletePreview(event);
      };
      previewBox.append(preview, deleteBtn);
      previewContainer.appendChild(previewBox);

      const reader = new FileReader();
      reader.onload = () => {
        preview.src = reader.result;
      };
      reader.readAsDataURL(files[i]);

      fileList.push(files[i]);
      fileObject[`${i}`] = files[i];
    }

    dispatch(imgActions.saveImgAction(userId, fileList));
  };

  return (
    <>
      <Flex is_flex>
        <form method="post" encType="multipart/form-data">
          <label htmlFor="chooseFile">
            <CameraBox>
              <Image
                src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/icon/icon_camera.svg"
                alt="upload"
                shape="rectangle"
                size="30px"
                pointer
              />
            </CameraBox>
          </label>
          <ImageUploadInput
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            multiple
            onChange={showPreview}
          />
        </form>
        <div id="preview-container" className={styles.previewContainer} />
      </Flex>
    </>
  );
};

const ImageUploadInput = styled.input`
  display: none;
`;
const CameraBox = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
  margin-right: 10px;
  border: 2px solid #dddddd;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ItemImgUpload;
