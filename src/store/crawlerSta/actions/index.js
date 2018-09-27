import {
  FILTER_CRAWLERSTA,
  FILTER_CRAWLERSTA_DETAIL,
  CLEAR_DATA
} from "../../../constants/ActionTypes"
import api from '../../../api/index'



function fetchPosts(subreddit, page, priortime, latertime) {
  return dispatch => {
    const condition = {
      'page[number]': page,
    }
    priortime && (condition['filter[priortime]'] = priortime)
    latertime && (condition['filter[latertime]'] = latertime)
    return dispatch({
      type: FILTER_CRAWLERSTA,
      promise: api.filterData(subreddit, {params: condition}),
    })
  }
}

export function fetchData(subreddit, page, priortime, latertime) {
  return (dispatch) => {
    return dispatch(fetchPosts(subreddit, page, priortime, latertime))

  }
}

export function fetchDataByKey(subreddit) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_CRAWLERSTA_DETAIL,
      promise: api.filterDetail(subreddit)
    })
  }
}

export const clearData = () => ({type: CLEAR_DATA})
