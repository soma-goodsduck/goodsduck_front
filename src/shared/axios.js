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

const verifyLogin = (error) => {
  if (error !== null && error.status === 401) {
    // 로그인 만료
    return "login";
  }
};

// 무한 스크롤 (홈 데이터)
export const getItems = async (path, itemId) => {
  const jwt = verifyJwt();

  const result = await axios.get(
    `${process.env.REACT_APP_BACK_URL}/api/v3/${path}?itemId=${itemId}`,
    {
      headers: { jwt },
    },
  );

  return result.data;
};

// 무한 스크롤 - 아이돌 필터링(홈 데이터)
export const getItemsByIdol = async (path, itemId, idolGroupId) => {
  const jwt = verifyJwt();

  const result = await axios.get(
    `${process.env.REACT_APP_BACK_URL}/api/v3/${path}?idolGroup=${idolGroupId}&itemId=${itemId}`,
    {
      headers: { jwt },
    },
  );

  return result.data;
};

// 무한 스크롤 - 검색 필터링(홈 데이터)
export const getItemsBySearch = async (path, itemId, keyword) => {
  const jwt = verifyJwt();

  const result = await axios.get(
    `${process.env.REACT_APP_BACK_URL}/api/v1/${path}?itemId=${itemId}&keyword=${keyword}`,
    {
      headers: { jwt },
    },
  );

  return result.data;
};

// JWT를 리턴하지 않는 데이터 (비회원 가능)
export const requestPublicData = async (path) => {
  const jwt = verifyJwt();

  const result = await axios.get(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    {
      headers: { jwt },
    },
  );

  return result.data.response;
};

// JWT를 리턴하는 데이터 (회원 전용)
export const requestAuthData = async (path) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const result = await axios.get(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    {
      headers: { jwt },
    },
  );
  if (verifyLogin(result.data.error) === "login") {
    return "login";
  }
  updateJwt(result.headers.jwt);

  return result.data.response;
};

// 회원인지, 비회원인지 체크
export const checkLoginWithData = async (path) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const result = await axios.get(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    {
      headers: { jwt },
    },
  );
  if (verifyLogin(result.data.error) === "login") {
    return "login";
  }
  updateJwt(result.headers.jwt);

  return result.data;
};

// get 요청
export const getAction = async (path) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const result = await axios.get(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    {
      headers: { jwt },
    },
  );
  if (verifyLogin(result.data.error) === "login") {
    return "login";
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

  const result = await axios.delete(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    {
      headers: { jwt },
    },
  );
  if (verifyLogin(result.data.error) === "login") {
    return "login";
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

  const result = await axios.post(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    JSON.stringify(json),
    {
      headers: { jwt, "Content-Type": "application/json" },
    },
  );
  if (verifyLogin(result.data.error) === "login") {
    return "login";
  }
  updateJwt(result.headers.jwt);

  return result.data;
};

// post 요청 (비회원)
export const postActionForNonUser = async (path, json) => {
  const result = await axios.post(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    JSON.stringify(json),
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  return result.data;
};

// post(image) 요청
export const postImgAction = async (path, file) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const result = await axios.post(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    file,
    {
      headers: { jwt },
    },
  );
  if (verifyLogin(result.data.error) === "login") {
    return "login";
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

  if (verifyLogin(result.data.error) === "login") {
    return "login";
  }
  updateJwt(result.headers.jwt);

  return result.data;
};

// patch 요청
export const patchAction = async (path, json) => {
  const jwt = verifyJwt();
  if (jwt === "login") {
    return "login";
  }

  const result = await axios.patch(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    {
      headers: { jwt },
    },
  );
  if (verifyLogin(result.data.error) === "login") {
    return "login";
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

  const result = await axios.patch(
    `${process.env.REACT_APP_BACK_URL}/api/${path}`,
    JSON.stringify(json),
    {
      headers: { jwt, "Content-Type": "application/json" },
    },
  );
  if (verifyLogin(result.data.error) === "login") {
    return "login";
  }
  updateJwt(result.headers.jwt);

  return result.data;
};
