import * as types from '../../constants/ActionTypes'

const initialState = {
  tasks: { data: [], meta: {} },
  translateHope: { data: [], meta: {} },
  translateAudit: { data: [], meta: {} },
  detail: {}
}

export default function filterTranslatesData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_TASKS_SUCCESS:
      return {
        ...state,
        tasks: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_TASKS_FAILURE:
      return state
    case types.FILTER_TRANSLATE_HOPE_SUCCESS:
      return {
        ...state,
        translateHope: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_TRANSLATE_HOPE_FAILURE:
      return state
    case types.FILTER_TRANSLATE_AUDIT_SUCCESS:
      return {
        ...state,
        translateAudit: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_TRANSLATE_AUDIT_FAILURE:
      return state
    case types.FILTER_TRANSLATE_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.json.data
      }
    case types.FILTER_TRANSLATE_DETAIL_FAILURE:
      return state
    case types.CLEAR_TRANSLATE_DETAIL:
      return {
        ...state,
        detail: {}
      }
    default :
      return state
  }
}
