import nookies from "nookies";

const ACCESS_TOKEN_KEY = 'VJI-U3BWRkHd3WxGcjpGiA';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  saveToken(accessToken, ctx = null){
    // sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    console.log(ctx);
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
    nookies.destroy(ctx, ACCESS_TOKEN_KEY);
  }
}
