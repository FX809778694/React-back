import * as types from '../../../constants/ActionTypes'

const initialState = {
  items: [],
}

export default function filterData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_CHANNELSELECT_SUCCESS:
      return {
        ...state,
        items: action.json.data,
      }
    case types.FILTER_CHANNELSELECT_FAILURE:
      return state
    default :
      return state
  }
}
