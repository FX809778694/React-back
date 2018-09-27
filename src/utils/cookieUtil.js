/**
 * Created by Freeman on 2017/10/19.
 */
import cookie from 'react-cookie'
import {COOKIE_DOMAIN} from './config'
const cookieConfig = {
  path:'/',
  domain: COOKIE_DOMAIN
}

export const expires = new Date('2049-01-01T00:00:00.000Z')

export function getCookie(name) {
  return cookie.load(name)
}

export function setCookie(name, value,opt) {
  cookie.save(name, value, {...cookieConfig,...opt})
}

export function removeCookie(name) {
  cookie.remove(name, cookieConfig)
}
