/* eslint-disable prefer-destructuring */
/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import styles from "./itemImgUpload.module.css";
import { Flex, Image } from "../../elements/index";

import { actionCreators as imgActions } from "../../redux/modules/image";
import { actionCreators as newItemActions } from "../../redux/modules/newItem";

const ItemImgUpload = (props) => {
  const dispatch = useDispatch();
  const { itemId, imgUrls, addedImg, isNotice } = useSelector((state) => ({
    itemId: state.newItem.item_id,
    imgUrls: state.newItem.images,
    addedImg: state.image.fileList,
    isNotice: state.image.isNotice,
  }));

  // 이미지 & 프리뷰 삭제
  const deletePreview = (_itemId, _imgUrl, event) => {
    const previewContainer = document.getElementById("preview-container");
    const box = event.target.parentNode;

    if (_itemId === 0) {
      // 굿즈 등록
      dispatch(imgActions.deleteImg(event.target.parentNode.id));
    } else {
      // 굿즈 수정
      dispatch(newItemActions.deleteImage(_imgUrl));
    }
    previewContainer.removeChild(box);
  };

  // 이미지 & 프리뷰 등록 및 미리보기 보여주기
  const showPreview = (e) => {
    const previewContainer = document.getElementById("preview-container");

    if (e) {
      dispatch(imgActions.hideImgNotice());
      const files = e.target.files;

      // 처음으로 이미지를 추가하는 경우
      for (let i = 0; i < files.length; i += 1) {
        const previewBox = document.createElement("div");
        const preview = document.createElement("img");
        const deleteBtn = document.createElement("button");
        previewBox.id = `${files[i].name}`;
        preview.className = `${styles.previewImg}`;
        deleteBtn.className = `${styles.deleteBtn}`;
        deleteBtn.onclick = (event) => {
          deletePreview(itemId, "", event);
        };
        previewBox.append(preview, deleteBtn);
        previewContainer.appendChild(previewBox);

        const reader = new FileReader();
        reader.onload = () => {
          preview.src = reader.result;
        };
        reader.readAsDataURL(files[i]);

        dispatch(imgActions.addImg(files[i]));
      }
    } else if (addedImg !== [] && addedImg !== undefined) {
      // 이미지를 추가한 후 다른 정보를 입력하는 중
      for (let i = 0; i < addedImg.length; i += 1) {
        const previewBox = document.createElement("div");
        const preview = document.createElement("img");
        const deleteBtn = document.createElement("button");
        previewBox.id = `${addedImg[i].name}`;
        preview.className = `${styles.previewImg}`;
        deleteBtn.className = `${styles.deleteBtn}`;
        deleteBtn.onclick = (event) => {
          deletePreview(itemId, "", event);
        };
        previewBox.append(preview, deleteBtn);
        previewContainer.appendChild(previewBox);

        const reader = new FileReader();
        reader.onload = () => {
          preview.src = reader.result;
        };
        reader.readAsDataURL(addedImg[i]);
      }
      dispatch(imgActions.saveImg(addedImg));
    }
  };

  // 이미지 수정을 위한 프리뷰
  const showPreviewForEdit = () => {
    const previewContainer = document.getElementById("preview-container");

    for (let i = 0; i < imgUrls.length; i += 1) {
      const previewBox = document.createElement("div");
      const preview = document.createElement("img");
      const deleteBtn = document.createElement("button");
      previewBox.id = `${i}`;
      preview.className = `${styles.previewImg}`;
      preview.src = imgUrls[i];
      deleteBtn.className = `${styles.deleteBtn}`;
      deleteBtn.onclick = (event) => {
        deletePreview(itemId, imgUrls[i], event);
      };
      previewBox.append(preview, deleteBtn);
      previewContainer.appendChild(previewBox);
    }
  };

  useEffect(() => {
    if (itemId !== 0) {
      showPreviewForEdit();
      dispatch(imgActions.hideImgNotice());
    }

    if (addedImg !== []) {
      showPreview();
    }
  }, []);

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
            accept=".jpg, .png, .jpeg"
            multiple
            onChange={showPreview}
          />
        </form>
        {isNotice && <div>⚠️ 정사각형 사이즈로 업로드됩니다!</div>}
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
