/* eslint-disable max-len */
const KAKAO_REDIRECT_URI = `${process.env.REACT_APP_FRONT_URL}/auth/kakao/callback`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const NAVER_REDIRECT_URI = `${process.env.REACT_APP_FRONT_URL}/auth/naver/callback`;
export const NAVER_AUTH_URL_PROD = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID_PROD}&redirect_uri=${NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_NAVER_STATE}`;
export const NAVER_AUTH_URL_DEV = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID_DEV}&redirect_uri=${NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_NAVER_STATE}`;

const APPLE_REDIRECT_URI = `${process.env.REACT_APP_FRONT_URL}/auth/apple/callback`;
export const APPLE_AUTH_URL = `https://appleid.apple.com/auth/authorize?client_id=${process.env.REACT_APP_APPLE_CLIENT_ID}&redirect_uri=${APPLE_REDIRECT_URI}&response_type=code id_token&state=${process.env.REACT_APP_APPLE_STATE}&nonce=nonce&response_mode=fragment`;
