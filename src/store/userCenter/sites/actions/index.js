import {CLEAR_DATA, FILTER_SITES, FILTER_SITES_DETAIL} from "../../../../constants/ActionTypes"
import api from '../../../../api/index'
import {Message, Notification} from '../../../../other/ShowMsg'

function fetchPosts(subreddit, page, name, enabled) {
  return dispatch => {
    const condition = {
      'page[number]': page
    }
    name && (condition['filter[name]'] = name)
    enabled && (condition['filter[enabled]'] = enabled)
    return dispatch({
      type: FILTER_SITES,
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
      type: FILTER_SITES_DETAIL,
      promise: api.filterDetail(subreddit)
    })
  }
}


export const editSitesData = (id, data) => {
  return () => {
    console.log(data)
    return api.editSitesData(id, data)
      .then(response => ({status: response.status}))
      .then(({status}) => {
        if (status === 200) {
          console.log('信息修改成功！')
          Notification('success', '信息修改成功！')
          window.history.back()
        }
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          Message('error', `修改失败，错误信息描述： ${error.response.data.errors[0].detail}！`)
          console.log(`错误信息描述：${error}`)
        }
      })
  }
}

export const addSitesData = (data) => {
  return () => {
    console.log(data)
    return api.addSitesData(data)
      .then(response => ({status: response.status}))
      .then(({status}) => {
        if (status === 201) {
          console.log('信息添加成功！')
          Notification('success', '信息添加成功！')
          window.history.back()
        }
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          Message('error', `添加失败，错误信息描述： ${error.response.data.errors[0].detail}！`)
        }
      })
  }
}

export const clearData = () => ({type: CLEAR_DATA})

