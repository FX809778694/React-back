import * as types from '../../constants/ActionTypes'

const initialState = {
  proDupRemoval: { data: [], meta: {} },
  topics: { data: [], meta: {} },
  channels: { data: [], meta: {} },
  seeds: { data: [], meta: {} },
  links: { data: [], meta: {} },
  categories: { data: [], meta: {} },
  dictionaries: { data: [], meta: {} },
  boost: { data: [], meta: {} },
  labelQuery: { data: [], meta: {} },
  detail: {},
  uploadImage: {},
}

export default function filterConfigsData(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_PRODUPREMOVAL_SUCCESS:
      return {
        ...state,
        proDupRemoval: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_PRODUPREMOVAL_FAILURE:
      return state

    case types.FILTER_TOPICS_SUCCESS:
      return {
        ...state,
        topics: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_TOPICS_FAILURE:
      return state

    case types.FILTER_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_CHANNELS_FAILURE:
      return state
    case types.FILTER_SEEDS_SUCCESS:
      return {
        ...state,
        seeds: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_SEEDS_FAILURE:
      return state
    case types.FILTER_LINKS_SUCCESS:
      return {
        ...state,
        links: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_LINKS_FAILURE:
      return state
    case types.FILTER_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_CATEGORIES_FAILURE:
      return state
    case types.FILTER_DICTIONARY_SUCCESS:
      return {
        ...state,
        dictionaries: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_DICTIONARY_FAILURE:
      return state
    case types.FILTER_BOOST_SUCCESS:
      return {
        ...state,
        boost: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_BOOST_FAILURE:
      return state
    case types.FILTER_LABELQUERY_SUCCESS:
      return {
        ...state,
        labelQuery: { data: action.json.data, meta: action.json.meta }
      }
    case types.FILTER_LABELQUERY_FAILURE:
      return state
    //详情数据
    case types.FILTER_CONFIGS_DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.json.data,
      }
    case types.FILTER_CONFIGS_DETAIL_FAILURE:
      return state
    //248上传图片
    case types.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploadImage: action.json,
      }
    case types.CLEAR_CONFIGS_DETAIL:
      return {
        ...state,
        detail: {},
        uploadImage: {}
      }
    default :
      return state
  }
}
