/* eslint-disable indent */
import axios from "axios";
import * as Sentry from "@sentry/react";

const verifyJwt = () => {
  const jwt = localStorage.getItem("jwt");

  try {
    if (!jwt) {
      throw new Error("There is no jwt");
    }
  } catch (error) {
    return -201;
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
      // NotFoundDataException
      case -101:
        return -101;
      // DuplicatedDataException
      case -102:
        return -102;
      // InvalidRequestDataException
      case -103:
        return -103;
      // InvalidStateException
      case -104:
        return -104;
      // InvalidJwtException
      case -201:
        return -201;
      // InvalidUserRoleException
      case -202:
        return -202;
      // UnauthorizedException
      case -203:
        return -203;
      // Oauth2Exception
      case -204:
        return -204;
      // SmsAuthorizationException
      case -205:
        return -205;
      // ImageProcessException
      case -401:
        return -401;
      // InvalidMetadataException
      case -402:
        return -402;
      // UnknownException
      default:
        return -999;
    }
  }
};

// 무한 스크롤 (홈 데이터)
export const getItems = async (path, itemId) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/v3/${path}?itemId=${itemId}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.get(url, options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// 무한 스크롤 - 아이돌 필터링(홈 데이터)
export const getItemsByIdol = async (itemId, idolGroupId) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/v3/items/filter?idolGroup=${idolGroupId}&itemId=${itemId}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.get(url, options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// 무한 스크롤 - 상세 필터링(홈 데이터)
export const getItemsByFilter = async (path) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/v3/items/filters?${path}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.get(url, options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// 무한 스크롤 - 검색 필터링(홈 데이터)
export const getItemsBySearch = async (
  itemId,
  keyword,
  order,
  complete,
  price,
) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/v1/items/search?itemId=${itemId}&keyword=${keyword}&complete=${complete}&order=${order}&price=${price}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.get(url, options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// JWT를 리턴하지 않는 데이터 (비회원 가능)
export const requestPublicData = async (path) => {
  const jwt = verifyJwt();

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.get(url, options);

    if (result?.data.error) {
      return verifyError(result.data.error);
    }

    return result.data.response;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
    // 삭제된 아이템 에러 수정될때까지
    // return verifyError(error.response.data.error);
  }
};

// JWT를 리턴하는 데이터 (회원 전용)
export const requestAuthData = async (path) => {
  const jwt = verifyJwt();
  if (jwt === -201) {
    return -201;
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.get(url, options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }
    updateJwt(result.headers.jwt);

    return result.data.response;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// delete 요청
export const deleteAction = async (path) => {
  const jwt = verifyJwt();
  if (jwt === -201) {
    return -201;
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.delete(url, options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }
    updateJwt(result.headers.jwt);

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// post 요청
export const postAction = async (path, json) => {
  const jwt = verifyJwt();
  if (jwt === -201) {
    return -201;
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt, "Content-Type": "application/json" } };

  try {
    const result = await axios.post(url, JSON.stringify(json), options);
    if (result.data.error) {
      return verifyError(result.data.error);
    }
    updateJwt(result.headers.jwt);

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
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
  if (jwt === -201) {
    return -201;
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.post(url, file, options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }
    updateJwt(result.headers.jwt);

    return result.data.response;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// put 요청
export const putAction = async (path, data) => {
  const jwt = verifyJwt();
  if (jwt === -201) {
    return -201;
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.put(url, data, options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }
    updateJwt(result.headers.jwt);

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// put JSON 요청
export const putJsonAction = async (path, json) => {
  const jwt = verifyJwt();
  if (jwt === -201) {
    return -201;
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt, "Content-Type": "application/json" } };

  try {
    const result = await axios.put(url, JSON.stringify(json), options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }
    updateJwt(result.headers.jwt);

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// patch 요청
export const patchAction = async (path) => {
  const jwt = verifyJwt();
  if (jwt === -201) {
    return -201;
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt } };

  try {
    const result = await axios.patch(url, options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }
    updateJwt(result.headers.jwt);

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// patch JSON 요청
export const patchJsonAction = async (path, json) => {
  const jwt = verifyJwt();
  if (jwt === -201) {
    return -201;
  }

  const url = `${process.env.REACT_APP_BACK_URL}/api/${path}`;
  const options = { headers: { jwt, "Content-Type": "application/json" } };

  try {
    const result = await axios.patch(url, JSON.stringify(json), options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }
    updateJwt(result.headers.jwt);

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};

// FCM TOKEN 전송
export const sendTokenAction = async (token) => {
  const jwt = verifyJwt();
  if (jwt === -201) {
    return -201;
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

  try {
    const result = await axios.post(url, JSON.stringify(json), options);

    if (result.data?.error) {
      return verifyError(result.data.error);
    }
    updateJwt(result.headers.jwt);

    return result.data;
  } catch (error) {
    Sentry.captureException(error);
    return -999;
  }
};
