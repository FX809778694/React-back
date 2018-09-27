import {
  FILTER_CHANNELSELECT,
  FILTER_CREATORSELECT,
  FILTER_SEEDSELECT,
  CLEAR_SEEDSELECT_DATA
} from "../../constants/ActionTypes"
import api from '../../api/index'
import {articleChannelsUrl} from "../../api/url";

export function fetchChannelsData() {
  return dispatch => {
    const condition = {
      'page[size]': 1000,
      'filter[channelType]': 4,
      'filter[enabled]': 1,
      // 'filter[channelName:like]': '%25测试%25',
    }
    return dispatch({
      type: FILTER_CHANNELSELECT,
      promise: api.filterData(articleChannelsUrl, {params: condition}),
    })
  }
}

export function fetchCreatorData() {
  return dispatch => {
    const condition = {
      'page[size]': 1000,
      'filter[channelType]': 3,
      'filter[enabled]': 1,
      // 'filter[channelName:like]': '%25测试%25',
    }
    return dispatch({
      type: FILTER_CREATORSELECT,
      promise: api.filterData(articleChannelsUrl, {params: condition}),
    })
  }
}

export function fetchSeedsData(id) {
  return dispatch => {
    return dispatch({
      type: FILTER_SEEDSELECT,
      promise: api.filterData(`${articleChannelsUrl}/${id}/seeds`),
    })
  }
}

export const clearSeedSelectData = () => ({type: CLEAR_SEEDSELECT_DATA})
