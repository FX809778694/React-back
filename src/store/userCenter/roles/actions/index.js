import {
  CLEAR_DATA,
  CLEAR_ROLE_AUTH_DATA,
  FILTER_ROLE_AUTH,
  FILTER_ROLES,
  FILTER_ROLES_DETAIL
} from "../../../../constants/ActionTypes"
import api from '../../../../api/index'
import {Message, Notification} from '../../../../other/ShowMsg'

function fetchPosts(subreddit, page, id, title, enabled) {
  return dispatch => {
    const condition = {
      'page[number]': page,
      'page[size]': 10
    }
    id && (condition['filter[siteId]'] = id)
    title && (condition['filter[name]'] = title)
    enabled && (condition['filter[enabled]'] = enabled)
    return dispatch({
      type: FILTER_ROLES,
      promise: api.filterData(subreddit, {params: condition}),
    })
  }
}

export function fetchData(subreddit, page, id, title, enabled) {
  return (dispatch) => {
    return dispatch(fetchPosts(subreddit, page, id, title, enabled))
  }
}

export function fetchDataByKey(subreddit) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_ROLES_DETAIL,
      promise: api.filterDetail(subreddit)
    })
  }
}

export function fetchRoleAuthData(subreddit) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_ROLE_AUTH,
      promise: api.filterData(subreddit)
    })
  }
}


export const editRolesData = (id, data) => {
  return () => {
    console.log(data)
    return api.editRolesData(id, data)
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

export const addRolesData = (data) => {
  return () => {
    console.log(data)
    return api.addRolesData(data)
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
export const clearRoleAuthData = () => ({type: CLEAR_ROLE_AUTH_DATA})

