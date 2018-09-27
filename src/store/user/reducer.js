// @flow
import type { CurrentUser } from 'common/types'
import { getInfoFromToken, getJwt } from '../../utils/auth'
import {
  SIGN_IN_SUCCESFULL,
  SIGN_OUT,
  SET_CURRENT_USER,
  LOGIN,
} from './actions'

const token = getJwt()
const initialState: CurrentUser = {
  id: null,
  email: null,
  name: null,
  username: null,
  avatarUrl: null,
  jwt: token,
  subscription: null,
  badges: [],
  roles: token ? getInfoFromToken(token).roles : [],
}

export default (state: CurrentUser = initialState, action: Object) => {
  switch (action.type) {
    case SIGN_IN_SUCCESFULL:
      return {
        ...state,
        jwt: action.jwt,
        roles: getInfoFromToken(action.jwt).roles || [],
      }
    case SIGN_OUT:
      return {
        ...initialState,
        jwt: null,
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        ...action.data,
      }
    default: {
      return state
    }
  }
};

const initialLoginState = {
  err_count: 0,
  captchaName: ''
}

export function login (state = initialLoginState, action) {
  switch (action.type) {
    case LOGIN.SUCCESS:
      return {
        ...state,
        ...initialLoginState
      }
    case LOGIN.FAILURE:
      return {
        ...state,
        ...action.json
      }
    default :
      return state
  }
}
