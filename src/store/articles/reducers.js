import * as types from '../../constants/ActionTypes'

const initialState = {
  recommends: { data: [], meta: {} },
  products: { data: [], meta: {} },
  brands: { data: [], meta: {} },
  news: { data: [], meta: {} },
  evaluations: { data: [], meta: {} },
  videos: { data: [], meta: {} },
  broadcasts: { data: [], meta: {} },
  tunes: { data: [], meta: {} },
  detail: {},
  subTableData: [],
  subTableDetail: {}
}

export default function filterArticlesData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_PRODUCTS_FAILURE:
      return state

    case types.FILTER_BRANDS_SUCCESS:
      return {
        ...state,
        brands: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_BRANDS_FAILURE:
      return state

    case types.FILTER_NEWS_SUCCESS:
      return {
        ...state,
        news: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_NEWS_FAILURE:
      return state

    case types.FILTER_EVALUATING_SUCCESS:
      return {
        ...state,
        evaluations: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_EVALUATING_FAILURE:
      return state

    case types.FILTER_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_VIDEOS_FAILURE:
      return state

    case types.FILTER_BROADCAST_SUCCESS:
      return {
        ...state,
        broadcasts: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_BROADCAST_FAILURE:
      return state

    case types.FILTER_TUNE_SUCCESS:
      return {
        ...state,
        tunes: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_TUNE_FAILURE:
      return state
    //周刊数据
    case types.FILTER_RECOMMEND_SUCCESS:
      return {
        ...state,
        recommends: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_RECOMMEND_FAILURE:
      return state

    //文章详情
    case types.FILTER_ARTICLES_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.json.data,
      }
    case types.FILTER_ARTICLES_DETAIL_FAILURE:
      return state
    //二级列表
    case types.FILTER_SUB_ARTICLE_SUCCESS:
      return {
        ...state,
        subTableData: action.json.data,
      }
    case types.FILTER_SUB_ARTICLE_FAILURE:
      return state
    //二级详情
    case types.FILTER_SUB_ARTICLE_DETAIL_SUCCESS:
      return {
        ...state,
        subTableDetail: action.json.data,
      }
    case types.FILTER_SUB_ARTICLE_DETAIL_FAILURE:
      return state
    //退出页面时清除数据操作
    case types.CLEAR_ARTICLE_DETAIL:
      return {
        ...state,
        detail: {}
      }
    case types.CLEAR_SUB_ARTICLE:
      return {
        ...state,
        subTableData: []
      }
    case types.CLEAR_SUB_ARTICLE_DETAIL:
      return {
        ...state,
        subTableDetail: {}
      }

    default :
      return state
  }
}
