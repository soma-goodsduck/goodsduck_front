/* eslint-disable prefer-destructuring */
/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemImgUpload.module.css";
import { Flex, Image } from "../../elements/index";

import { actionCreators as imgActions } from "../../redux/modules/image";

const ItemImgUpload2 = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user);
  const [fileList, setFileList] = useState([]);
  const previewContainer = document.getElementById("preview-container");

  // const showPreview = (e) => {
  //   // const reader = new FileReader();
  //   // const file = e.target.files[0];
  //   // reader.readAsDataURL(file);
  //   // reader.onloadend = () => {
  //   //   dispatch(imgActions.setPreview(reader.result));
  //   // };
  // };

  // const onSaveFiles = (files) => {
  //   const uploadFiles = Array.prototype.slice.call(files);
  //   console.log(uploadFiles);

  //   uploadFiles.forEach((uploadFile) => {
  //     fileList.push(uploadFile);
  //   });

  //   dispatch(imgActions.saveImgAction(userId, fileList));
  // };

  const deletePreview = (event) => {
    const box = event.target.parentNode;
    const newFileList = fileList.filter(
      (file) => file.name !== event.target.parentNode.id,
    );
    setFileList(newFileList);
    console.log(newFileList);
    dispatch(imgActions.saveImgAction(userId, fileList));
    previewContainer.removeChild(box);
  };

  const showPreview = (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i += 1) {
      const previewBox = document.createElement("div");
      const preview = document.createElement("img");
      const deleteBtn = document.createElement("button");
      preview.className = `${styles.previewImg}`;
      // previewBox.id = `preview_${i}`;
      deleteBtn.className = `${styles.deleteBtn}`;
      deleteBtn.onclick = (event) => {
        deletePreview(event);
      };
      previewBox.append(preview, deleteBtn);
      previewContainer.appendChild(previewBox);

      const reader = new FileReader();
      reader.onload = () => {
        preview.src = reader.result;
        previewBox.id = files[i].name;
      };
      reader.readAsDataURL(files[i]);

      fileList.push(files[i]);
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

export default ItemImgUpload2;
