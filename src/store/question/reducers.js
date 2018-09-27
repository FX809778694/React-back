import * as types from '../../constants/ActionTypes'

const initialState = {
  quizs: { data: [], meta: {} },
  quizsCount: { data: [], meta: {} },

  detail: {},
  backImg: {}
}

export default function filterQuestionsData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_QUIZS_SUCCESS:
      return {
        ...state,
        quizs: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_QUIZS_FAILURE:
      return state
    case types.FILTER_QUIZSCOUNT_SUCCESS:
      return {
        ...state,
        quizsCount: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_QUIZSCOUNT_FAILURE:
      return state


    //详情数据
    case types.FILTER_QUESTION_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.json.data,
      }
    case types.FILTER_QUESTION_DETAIL_FAILURE:
      return state
    //248上传图片
    case types.UPLOAD_BACKIMG_SUCCESS:
      return {
        ...state,
        backImg: action.json,
      }
    case types.CLEAR_QUESTION_DETAIL:
      return {
        ...state,
        detail: {},
        backImg: {}
      }
    default :
      return state
  }
}
