/* eslint-disable indent */
/* eslint-disable consistent-return */
import axios from "axios";

const verifyJwt = () => {
  const jwt = localStorage.getItem("jwt");

  try {
    if (!jwt) {
      throw new Error("There is no jwt");
    }
  } catch (error) {
    return "login";
  }

  return jwt;
};

const updateJwt = (newJwt) => {
  localStorage.setItem("jwt", newJwt);
};

const verifyError = (error) => {
  if (error !== null) {
    const statusCode = error.status;

    switch (statusCode) {
      case 401:
        return "login";
      default:
        return "login";
    }
  }
};

// 무한 스크롤 (홈 데이터)
export const getItems = async (path, itemId) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/v3/${path}?itemId=${itemId}`;
  const options = { headers: { jwt } };
  const result = await axios.get(url, options);

  return result.data;
};

// 무한 스크롤 - 아이돌 필터링(홈 데이터)
export const getItemsByIdol = async (itemId, idolGroupId) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/v3/items/filter?idolGroup=${idolGroupId}&itemId=${itemId}`;
  const options = { headers: { jwt } };
  const result = await axios.get(url, options);

  return result.data;
};

// 무한 스크롤 - 상세 필터링(홈 데이터)
export const getItemsByFilter = async (path) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/v3/items/filters?${path}`;
  const options = { headers: { jwt } };
  const result = await axios.get(url, options);

  return result.data;
};

// 무한 스크롤 - 검색 필터링(홈 데이터)
export const getItemsBySearch = async (itemId, keyword) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/v1/items/search?itemId=${itemId}&keyword=${keyword}`;
  const options = { headers: { jwt } };
  const result = await axios.get(url, options);

  return result.data;
};

// JWT를 리턴하지 않는 데이터 (비회원 가능)
export const requestPublicData = async (path) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };

  // try {
  //   const result = await axios.get(url, options);
  //   return result.data.response;
  // } catch (error) {
  //   console.log(error);
  // }

  // return verifyError(err.response.data.error);
  const result = await axios.get(url, options);

  return result.data.response;
};

// JWT를 리턴하는 데이터 (회원 전용)
export const requestAuthData = async (path) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };
  const result = await axios.get(url, options);

  // if (verifyError(result.data.error) === "login") {
  //   return "login";
  // }
  if (result.data.error) {
    return verifyError(result.data.error);
  }
  updateJwt(result.headers.jwt);

  return result.data.response;
};

// delete 요청
export const deleteAction = async (path) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };
  const result = await axios.delete(url, options);

  if (result.data.error) {
    return verifyError(result.data.error);
  }
  updateJwt(result.headers.jwt);

  return result.data;
};

// post 요청
export const postAction = async (path, json) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt, "Content-Type": "application/json" } };
  const result = await axios.post(url, JSON.stringify(json), options);

  if (result.data.error) {
    return verifyError(result.data.error);
  }
  updateJwt(result.headers.jwt);

  return result.data;
};

// post 요청 (비회원)
export const postActionForNonUser = async (path, json) => {
  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { "Content-Type": "application/json" } };
  const result = await axios.post(url, JSON.stringify(json), options);

  return result.data;
};

// post(image) 요청
export const postImgAction = async (path, file) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };
  const result = await axios.post(url, file, options);

  if (result.data.error) {
    return verifyError(result.data.error);
  }
  updateJwt(result.headers.jwt);

  return result.data.response;
};

// put 요청
export const putAction = async (path, data) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };
  const result = await axios.put(url, data, options);

  if (result.data.error) {
    return verifyError(result.data.error);
  }
  updateJwt(result.headers.jwt);

  return result.data;
};

// patch 요청
export const patchAction = async (path) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };
  const result = await axios.patch(url, options);

  if (result.data.error) {
    return verifyError(result.data.error);
  }
  updateJwt(result.headers.jwt);

  return result.data;
};

// patch JSON 요청
export const patchJsonAction = async (path, json) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt, "Content-Type": "application/json" } };
  const result = await axios.patch(url, JSON.stringify(json), options);

  if (result.data.error) {
    return verifyError(result.data.error);
  }
  updateJwt(result.headers.jwt);

  return result.data;
};

// FCM TOKEN 전송
export const sendTokenAction = async (token) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const json = {
    body: token,
  };
  const url = `${process.env.REACT_APP_BACK_URL}/api/v1/users/device`;
  const options = {
    headers: {
      jwt,
      registrationToken: `${token}`,
      "Content-Type": "application/json",
    },
  };
  const result = await axios.post(url, JSON.stringify(json), options);

  if (result.data.error) {
    return verifyError(result.data.error);
  }
  updateJwt(result.headers.jwt);

  return result.data;
};
