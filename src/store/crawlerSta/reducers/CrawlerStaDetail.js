import * as types from '../../../constants/ActionTypes'

const initialState = {
  items: [],
  meta: []
}

export default function filterDetail(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_CRAWLERSTA_DETAIL_SUCCESS:
      return {
        ...state,
        items: action.json.data,
        meta: action.json.meta,
      }
    case types.CLEAR_DATA:
      return initialState
    case types.FILTER_CRAWLERSTA_DETAIL_FAILURE:
      return state
    default :
      return state
  }
}
