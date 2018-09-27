import * as types from '../../../../constants/ActionTypes'

const initialState = {
  items: [],
}

export default function filterData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_ROLEFORGROUP_SUCCESS:
      return {
        ...state,
        items: action.json.data,
      }
    case types.FILTER_ROLEFORGROUP_FAILURE:
      return state
    case types.CLEAR_ROLEFORGROUP_DATA:
      return initialState
    default :
      return state
  }
}
