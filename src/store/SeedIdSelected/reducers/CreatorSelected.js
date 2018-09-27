import * as types from '../../../constants/ActionTypes'

const initialState = {
  items: [],
}

export default function filterData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_CREATORSELECT_SUCCESS:
      return {
        ...state,
        items: action.json.data,
      }
    case types.CLEAR_DATA:
      return initialState
    case types.FILTER_CREATORSELECT_FAILURE:
      return state
    default :
      return state
  }
}
