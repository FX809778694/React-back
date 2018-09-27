import {CLEAR_DATA, FILTER_REPORT, FILTER_REPORT_DETAIL} from "../../../../constants/ActionTypes"
import api from '../../../../api/index'
import {Notification} from '../../../../other/ShowMsg'


function fetchPosts(subreddit, page, id, sorter) {
  return dispatch => {
    const condition = {
      'page[number]': page,
    }
    id && (condition['filter[id]'] = id)
    sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
    return dispatch({
      type: FILTER_REPORT,
      promise: api.filterData(subreddit, {params: condition}),
    })
  }
}

export function fetchData(subreddit, page, id, title, sorter) {
  return (dispatch) => {
    return dispatch(fetchPosts(subreddit, page, id, title, sorter))
  }
}

export function fetchDataByKey(subreddit) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_REPORT_DETAIL,
      promise: api.filterDetail(subreddit)
    })
  }
}


export const deleteReportData = (id) => {
  return () => {
    console.log(id)
    return api.deleteReportData(id)
      .then(response => ({status: response.status}))
      .then(({status}) => {
        if (status === 204) {
          Notification('success', '信息删除成功！')
        }
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log(`错误信息描述：${error.response.data.errors[0].detail}`)
          Notification('error', '信息删除失败！', `错误信息描述：${error.response.data.errors[0].detail}`)
        }
      })
  }
}

export const clearData = () => ({type: CLEAR_DATA})
