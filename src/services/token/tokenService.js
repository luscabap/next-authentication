import nookies from "nookies";

const ACCESS_TOKEN_KEY = 'ACESS_TOKEN';
const REFRESH_TOKEN_NAME = 'REFRESH_TOKEN_NAME'

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  saveToken(accessToken, ctx = null){
    globalThis?.localStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
    globalThis?.sessionStorage?.setItem(ACCESS_TOKEN_KEY, accessToken);
    nookies.set(ctx, ACCESS_TOKEN_KEY, accessToken, {
      maxAge: ONE_YEAR,
      path: '/'
    });
  },
  getToken(ctx = null){
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_KEY] || '';
  },
  deleteToken(ctx = null){
    globalThis?.localStorage?.removeItem(ACCESS_TOKEN_KEY && REFRESH_TOKEN_NAME);
    globalThis?.sessionStorage?.removeItem(ACCESS_TOKEN_KEY && REFRESH_TOKEN_NAME);
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, REFRESH_TOKEN_NAME);
  }
}
