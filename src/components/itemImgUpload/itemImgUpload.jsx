/* eslint-disable prefer-destructuring */
/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Image } from "../../elements/index";

import { actionCreators as imgActions } from "../../redux/modules/image";

const ItemImgUpload = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user);
  const fileList = [];

  const showPreview = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(imgActions.setPreview(reader.result));
    };
  };

  const onSaveFiles = (e) => {
    const uploadFiles = Array.prototype.slice.call(e.target.files);
    console.log(uploadFiles);

    uploadFiles.forEach((uploadFile) => {
      fileList.push(uploadFile);
    });

    dispatch(imgActions.saveImgAction(userId, fileList));

    showPreview(e);
  };

  return (
    <>
      <Flex is_flex>
        <form method="post" encType="multipart/form-data">
          <label htmlFor="chooseFile">
            <Image
              src="https://goodsduck-s3.s3.ap-northeast-2.amazonaws.com/itemUpload.png"
              alt="upload"
              shape="rectangle"
              size="100px"
              pointer
            />
          </label>
          <ImageUploadInput
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            multiple
            onChange={onSaveFiles}
          />
        </form>
      </Flex>
    </>
  );
};

const ImageUploadInput = styled.input`
  display: none;
`;

export default ItemImgUpload;
