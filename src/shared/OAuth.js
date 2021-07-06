const KAKAO_REDIRECT_URI = `${process.env.REACT_APP_FRONT_LOCALHOST_URL}/auth/kakao/callback`;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

const NAVER_REDIRECT_URI = `${process.env.REACT_APP_FRONT_LOCALHOST_URL}/auth/naver/callback`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_NAVER_STATE}`;
