import React from "react";
import { Image, Flex } from "../../../elements/index";

const PostImg = ({ images }) => {
  const screen = window.screen.width;

  return (
    <>
      <Flex is_col>
        {images.map((image) => (
          <Image
            shape="normal"
            src={image.url}
            width={screen >= 415 ? "375px" : "90vw"}
            borderRadius="10px"
            margin="0 0 10px 0"
            key={image.url}
          />
        ))}
      </Flex>
    </>
  );
};

export default PostImg;
