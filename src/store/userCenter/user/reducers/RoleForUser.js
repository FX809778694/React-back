import * as types from '../../../../constants/ActionTypes'

const initialState = {
  items: [],
}

export default function filterData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_ROLEFORUSER_SUCCESS:
      return {
        ...state,
        items: action.json.data,
      }
    case types.FILTER_ROLEFORUSER_FAILURE:
      return state
    case types.CLEAR_ROLEFORUSER_DATA:
      return initialState
    default :
      return state
  }
}
