import * as types from '../../../../constants/ActionTypes'

const initialState = {
  items: []
}

export default function filterData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_ROLE_AUTH_SUCCESS:
      return {
        ...state,
        items: action.json.data,
        meta: action.json.meta,
      }
    case types.FILTER_ROLE_AUTH_FAILURE:
      return state
    case types.CLEAR_ROLE_AUTH_DATA:
      return initialState
    default :
      return state
  }
}
