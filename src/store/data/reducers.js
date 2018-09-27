import * as types from '../../constants/ActionTypes'

const initialState = {
  rank: { data: [], meta: {} },
  logDictionary: { data: [], meta: {} },
  topicsModel: { data: [], meta: {} },
  outline: { data: [], meta: {} },
  detail: {},
}

export default function dataCenterData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_RANK_SUCCESS:
      return {
        ...state,
        rank: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_RANK_FAILURE:
      return state
    case types.FILTER_LOGDICTIONARY_SUCCESS:
      return {
        ...state,
        logDictionary: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_LOGDICTIONARY_FAILURE:
      return state
    case types.FILTER_OUTLINE_SUCCESS:
      return {
        ...state,
        outline: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_OUTLINE_FAILURE:
      return state
    case types.FILTER_TOPICMODEL_SUCCESS:
      return {
        ...state,
        topicsModel: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_TOPICMODEL_FAILURE:
      return state



    case types.FILTER_DATACENTER_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.json.data,
      }
    case types.FILTER_DATACENTER_DETAIL_FAILURE:
      return state
    case types.CLEAR_DATACENTER_DETAIL:
      return {
        ...state,
        detail: {}
      }
    default :
      return state
  }
}
