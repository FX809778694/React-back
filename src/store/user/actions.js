// @flow
import { push } from 'react-router-redux'
import { signInUrl } from '@/utils/url-generator'
import { createAPIActions, doRequest } from '../api/actions'

import openPopup from './utils/popup'
import { getInfoFromToken, getJwt, resetJwt, storageUserInfo } from '../../utils/auth'
import {jwtSelector} from './selectors'
import { SubmissionError } from 'redux-form'

import {AUTH_TOKEN_KEY} from '../../utils/config'
import api from '../../api/index'
import {profilesUrl} from "../../api/url";


export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_SUCCESFULL = 'SIGN_IN_SUCCESFULL'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SIGN_OUT = 'SIGN_OUT'

export const SIGN_OUT_API = createAPIActions('SIGN_OUT_API', 'DELETE')
export const GET_CURRENT_USER_API = createAPIActions('CURRENT_USER', 'FETCH')

const signOut = (apiRequest = true) => async (dispatch: Function) => {
  if (apiRequest) {
    await dispatch(
      doRequest(SIGN_OUT_API, 'oauth/logout', {
        method: 'GET',
      }),
    )
  }

  await resetJwt()
  dispatch({
    type: SIGN_OUT,
  })
  dispatch(push('/login'))
}

const getCurrentUser = () => async (dispatch: Function, getState: Function) => {
  const jwt = jwtSelector(getState()) || getJwt()
  if (jwt) {

    const id = getInfoFromToken(jwt).user_id
    try {
      const {data} = await dispatch(
        doRequest(GET_CURRENT_USER_API, `${profilesUrl}/${id}`),
      )

      dispatch({type: SET_CURRENT_USER, data})
      return data
    } catch (e) {

    }
  }
}

const signIn = () => (dispatch: Function) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: SIGN_IN,
    })
    const popup = openPopup(signInUrl(), 'sign in')

    window.addEventListener('message', function (e) {
      if (e.data.type === 'signin') {
        const jwt = e.data.data.jwt
        storageUserInfo(jwt)
        window.removeEventListener('message', this)
        popup.close()

        if (jwt) {
          dispatch({
            type: SIGN_IN_SUCCESFULL,
            jwt,
          })
          resolve(dispatch(getCurrentUser()))
        } else {
          reject()
        }
      }
    })
  })

export const LOGIN = createAPIActions('LOGIN', 'FETCH')
/**
 *  201  用户不存在
 *  300  图形验证码不正确，或未能获取验证码！
 *  402  密码验证失败
 * @param values
 */
const loginAction = (values) => {
  return api.login(values)
    .then(response => response.data)
    .catch(err => {
      const data = err.response.data
      let _error = {}
      for (let $error of data.errors) {
        if (/^20\d$/i.test($error.code) || /username$/i.test($error.code)) {
          _error = {..._error, username: $error.detail}
        } else if (/^40\d$/i.test($error.code) || /password$/i.test($error.code)) {
          _error = {..._error, password: $error.detail}
        } else if (/^30\d$/i.test($error.code)) {
          _error = {..._error, verifyCode: $error.detail}
        }
      }
      throw new SubmissionError({
        ..._error,
        err_count: err.response.data.meta.err_count,
        captchaName: values.username
      })
    })
}

/**
 * 登录成功后的回调
 * @param result
 * @param dispatch
 * @param props
 */
const loginSuccess = (result, dispatch, props) => {
  const jwt = result.data[AUTH_TOKEN_KEY]
  storageUserInfo(jwt)
  dispatch({
    type: SIGN_IN_SUCCESFULL,
    jwt,
  })
  dispatch(getCurrentUser())
  const params = new URLSearchParams(props.search)
  const back = params.get('back') // bar
  dispatch(push(back ? back : '/'))
}
/**
 * 登录失败后的回调
 * @param errors
 * @param dispatch
 * @param submitError
 */
const loginFail = (errors, dispatch, submitError) => {
  dispatch({
    type: LOGIN.FAILURE,
    json: errors
  })
}

const logout = () => {
  return (dispatch) => {
    api.logout()
      .then(() => {
        //dispatch(showTip('退出成功'))
        dispatch(push('/login'))
        dispatch({
        type: SIGN_OUT,
      })
    })
  }
}

export default {
  signOut,
  signIn,
  getCurrentUser,
  loginAction,
  loginFail,
  loginSuccess,
  logout
}
