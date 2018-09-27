import {CLEAR_DATA, FILTER_EXTENDINFOMATION, FILTER_EXTENDINFOMATION_DETAIL} from "../../../constants/ActionTypes"
import api from '../../../api/index'
import {Notification} from '../../../other/ShowMsg'


function fetchPosts(subreddit, page, id, title) {
  return dispatch => {
    const condition = {
      'page[number]': page,
    }
    id && (condition['filter[id]'] = id)
    title && (condition['filter[nickname]'] = title)
    return dispatch({
      type: FILTER_EXTENDINFOMATION,
      promise: api.filterData(subreddit, {params: condition}),
    })
  }
}

export function fetchData(subreddit, page, id, title) {
  return (dispatch) => {
    return dispatch(fetchPosts(subreddit, page, id, title))
  }
}

export function fetchDataByKey(subreddit) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_EXTENDINFOMATION_DETAIL,
      promise: api.filterDetail(subreddit)
    })
  }
}


export const EditExtendInfomationData = (data, id) => {
  return () => {
    console.log(data)
    return api.editExtendInfomationData(data, id)
      .then(response => ({status: response.status}))
      .then(({status}) => {
        if (status === 200) {
          console.log('信息修改成功！')
          Notification('success', '信息修改成功！')
          window.history.back()
        }
      }).catch((error) => {
        if (error.response && error.response.status === 401) {
          Notification('error', '信息修改失败！', `错误信息描述：${error.response.data.errors[0].detail}`)
          console.log(`错误信息描述：${error.response.data.errors[0].detail}`)
        }
      })
  }
}

export const clearData = () => ({type: CLEAR_DATA})
