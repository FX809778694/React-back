import * as types from '../../../constants/ActionTypes'

const initialState = {
  items: [],
}

export default function filterData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_SEEDSELECT_SUCCESS:
      return {
        ...state,
        items: action.json.data,
      }
    case types.CLEAR_SEEDSELECT_DATA:
      return initialState
    case types.FILTER_SEEDSELECT_FAILURE:
      return state
    default :
      return state
  }
}
