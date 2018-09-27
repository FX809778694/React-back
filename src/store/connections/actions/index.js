import {
  FILTER_CONNECTIONS,
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
      type: FILTER_CONNECTIONS,
      promise: api.filterData(subreddit, {params: condition}),
    })
  }
}

export function fetchData(subreddit, page, priortime, latertime) {
  return (dispatch) => {
    return dispatch(fetchPosts(subreddit, page, priortime, latertime))

  }
}

export const clearData = () => ({type: CLEAR_DATA})
