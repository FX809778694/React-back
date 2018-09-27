import * as types from '../../../../constants/ActionTypes'

const initialState = {
  items: [],
  meta: []
}

export default function filterData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_ROLES_SUCCESS:
      return {
        ...state,
        items: action.json.data,
        meta: action.json.meta,
      }
    case types.FILTER_ROLES_FAILURE:
      return state
    case types.CLEAR_ROLES_DATA:
      return initialState
    default :
      return state
  }
}
