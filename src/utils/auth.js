import jwtDecode from 'jwt-decode'
import moment from 'moment'
import store from 'store/dist/store.modern'
import { API_TOKEN, CACHE_LAST_USE_LOGIN_PHONE, USER_INFO } from './config'
import {getCookie, setCookie, removeCookie} from './cookieUtil'

/**
 * 从token中解析用户信息
 * @param token
 * @return userInfo
 */
const getInfoFromToken = (token) => {
  return jwtDecode(token)
}

function checkTokenExpDiff (token) {
  let tokenPayload = getInfoFromToken(token)
  let expiry = moment.unix(tokenPayload.exp)
  return expiry.diff(moment(), 'seconds')
}

/**
 *
 * @param apiToken
 * @return {boolean} token有效返回true，否则返回false
 */
const isExp = function (apiToken) {
  return checkTokenExpDiff(apiToken) > 0
}

/**
 * 设置最后一次使用的手机号
 */
const storageLastUsePhone = function (phone) {
  return store.set(CACHE_LAST_USE_LOGIN_PHONE, phone || '')
}

/**
 * 存储用户信息到localStorage
 * @param apiToken
 */
const storageUserInfo = function (apiToken: string) {
  //const apiToken = data.access_token
  //localStorage.setItem(constants.API_TOKEN, apiToken)
  const userInfo = getInfoFromToken(apiToken)
  const maxAge = userInfo.exp - userInfo.created / 1000
  setCookie(API_TOKEN, apiToken, {maxAge})
  setCookie(USER_INFO, userInfo, {maxAge})
  storageLastUsePhone(userInfo.user_name)
}



function getJwt () {
  return getCookie(API_TOKEN);
}

function resetJwt () {
  //document.cookie = `${API_TOKEN}=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  return removeCookie(API_TOKEN);
}
export {
  isExp,
  getJwt,
  resetJwt,
  storageUserInfo,
  getInfoFromToken,
}
