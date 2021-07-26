/* eslint-disable consistent-return */
import axios from "axios";
// import * as Sentry from "@sentry/react";

// 무한 스크롤 (홈 데이터)
export const getList = async (path, pageNumber) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/api/v1/${path}?pageNumber=${pageNumber}`,
      {
        headers: { jwt: `${jwt}` },
      },
    );
    if (result.headers.jwt) {
      localStorage.setItem("jwt", result.headers.jwt);
    }

    return result.data;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};

// JWT를 리턴하지 않는 데이터 (비회원 가능)
export const getInfo = async (path) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/api/v1/${path}`,
      {
        headers: { jwt: `${jwt}` },
      },
    );
    if (result.headers.jwt) {
      localStorage.setItem("jwt", result.headers.jwt);
    }

    return result.data.response;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};

// JWT를 리턴하는 데이터 (회원 전용)
export const getData = async (path) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/api/v1/${path}`,
      {
        headers: { jwt: `${jwt}` },
      },
    );
    if (result.data.error !== null) {
      if (result.data.error.status === 401) {
        // 로그인 만료
        return "login";
      }
    }
    if (result.headers.jwt) {
      localStorage.setItem("jwt", result.headers.jwt);
    }

    return result.data.response;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};

// 회원인지, 비회원인지 체크
export const checkLoginWithData = async (path) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/api/v1/${path}`,
      {
        headers: { jwt: `${jwt}` },
      },
    );
    if (result.data.error !== null) {
      if (result.data.error.status === 401) {
        // 로그인 만료
        return "login";
      }
    }
    if (result.headers.jwt) {
      localStorage.setItem("jwt", result.headers.jwt);
    }

    return result.data;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};

// get 요청
export const getAction = async (path) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BACK_URL}/api/v1/${path}`,
      {
        headers: { jwt: `${jwt}` },
      },
    );
    if (result.data.error !== null) {
      if (result.data.error.status === 401) {
        // 로그인 만료
        return "login";
      }
    }

    if (result.headers.jwt) {
      localStorage.setItem("jwt", result.headers.jwt);
    }

    return result.data.response;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};

// delete 요청
export const deleteAction = async (path) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const result = await axios.delete(
      `${process.env.REACT_APP_BACK_URL}/api/v1/${path}`,
      {
        headers: { jwt: `${jwt}` },
      },
    );
    if (result.data.error !== null) {
      if (result.data.error.status === 401) {
        // 로그인 만료
        return "login";
      }
    }

    if (result.headers.jwt) {
      localStorage.setItem("jwt", result.headers.jwt);
    }

    return result.data;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};

// post 요청
export const postAction = async (path, json) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BACK_URL}/api/v1/${path}`,
      JSON.stringify(json),
      {
        headers: { jwt: `${jwt}`, "Content-Type": "application/json" },
      },
    );
    if (result.data.error !== null) {
      if (result.data.error.status === 401) {
        // 로그인 만료
        return "login";
      }
    }

    if (result.headers.jwt) {
      localStorage.setItem("jwt", result.headers.jwt);
    }

    return result.data;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};

// patch 요청
export const patchAction = async (path, json) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_BACK_URL}/api/v1/${path}`,
      {
        headers: { jwt: `${jwt}` },
      },
    );
    if (result.data.error !== null) {
      if (result.data.error.status === 401) {
        // 로그인 만료
        return "login";
      }
    }

    if (result.headers.jwt) {
      localStorage.setItem("jwt", result.headers.jwt);
    }

    return result.data;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};

// patch JSON 요청
export const patchJsonAction = async (path, json) => {
  const jwt = localStorage.getItem("jwt");

  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_BACK_URL}/api/v1/${path}`,
      JSON.stringify(json),
      {
        headers: { jwt: `${jwt}`, "Content-Type": "application/json" },
      },
    );
    if (result.data.error !== null) {
      if (result.data.error.status === 401) {
        // 로그인 만료
        return "login";
      }
    }

    if (result.headers.jwt) {
      localStorage.setItem("jwt", result.headers.jwt);
    }

    return result.data;
  } catch (error) {
    console.log("error", error);
    // Sentry.captureException(error);
  }
};
