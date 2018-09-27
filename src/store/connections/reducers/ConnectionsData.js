import * as types from '../../../constants/ActionTypes'

const initialState = {
  items: [],
  // meta: []
}

export default function filterData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_CONNECTIONS_SUCCESS:
      return {
        ...state,
        items: action.json.data,
        // meta: action.json.meta,
      }
    case types.FILTER_CONNECTIONS_FAILURE:
      return state
    default :
      return state
  }
}
