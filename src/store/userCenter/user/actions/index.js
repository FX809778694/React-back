import {
  CLEAR_DATA,
  CLEAR_GROUPFORUSER_DATA,
  CLEAR_GROUPS_DATA,
  CLEAR_ROLEFORUSER_DATA,
  CLEAR_ROLES_DATA,
  FILTER_GROUPFORUSER,
  FILTER_GROUPS,
  FILTER_ROLEFORUSER,
  FILTER_ROLES,
  FILTER_SITES,
  FILTER_USER,
  FILTER_USER_DETAIL
} from "../../../../constants/ActionTypes"
import api from '../../../../api/index'
import {Message, Notification} from '../../../../other/ShowMsg'
import {userGroupsUrl, userRolesUrl, userSitesUrl} from "../../../../api/url";

function fetchPosts(subreddit, page, username, enabled) {
  return dispatch => {
    const condition = {
      'page[number]': page
    }
    username && (condition['filter[username]'] = username)
    enabled && (condition['filter[enabled]'] = enabled)
    return dispatch({
      type: FILTER_USER,
      promise: api.filterData(subreddit, {params: condition}),
    })
  }
}

export function fetchData(subreddit, page, id, title) {
  return (dispatch) => {
    return dispatch(fetchPosts(subreddit, page, id, title))

  }
}

export function fetchSubData(subreddit, page, id) {
  return dispatch => {
    const condition = {
      'page[number]': page
    }
    id && (condition['filter[userId]'] = id)
    return dispatch({
      type: FILTER_USER,
      promise: api.filterData(subreddit, {params: condition}),
    })
  }
}

export function fetchDataByKey(subreddit) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_USER_DETAIL,
      promise: api.filterDetail(subreddit)
    })
  }
}


export const editUserData = (id, data) => {
  return () => {
    console.log(data)
    return api.editUserData(id, data)
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

export const addUserData = (data) => {
  return () => {
    console.log(data)
    return api.addUserData(data)
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

export const getSites = () => {
  return dispatch => {
    const condition = {
      'filter[enabled]': 1
    }
    return dispatch({
      type: FILTER_SITES,
      promise: api.filterData(userSitesUrl, {params: condition}),
    })
  }
}

export const getSites_Roles = (siteId) => {
  return dispatch => {
    const condition = {
      'filter[enabled]': 1,
      'filter[siteId]': siteId,
    }
    return dispatch({
      type: FILTER_ROLES,
      promise: api.filterData(userRolesUrl, {params: condition}),
    })
  }
}

export const getRolesForUser = (siteId, userId) => {
  return dispatch => {
    return dispatch({
      type: FILTER_ROLEFORUSER,
      promise: api.getRolesForUser(siteId, userId),
    })
  }
}

export const addRolesForUser = (siteId, userId, data) => {
  return () => {
    console.log(siteId, userId, data)
    return api.addRolesForUser(siteId, userId, data)
      .then(response => ({status: response.status}))
      .then(({status}) => {
        if (status === 200) {
          console.log('信息保存成功！')
          Message('success', '信息保存成功！')
        }
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          Message('warning', `保存失败，错误信息描述： 您未更新权限信息！`)
          console.log(error.response)
        }
      })
  }
}

export const getSites_Groups = (siteId) => {
  return dispatch => {
    const condition = {
      'filter[enabled]': 1,
      'filter[siteId]': siteId,
    }
    return dispatch({
      type: FILTER_GROUPS,
      promise: api.filterData(userGroupsUrl, {params: condition}),
    })
  }
}

export const getGroupsForUser = (siteId, userId) => {
  return dispatch => {
    return dispatch({
      type: FILTER_GROUPFORUSER,
      promise: api.getGroupsForUser(siteId, userId),
    })
  }
}

export const addGroupsForUser = (siteId, userId, data) => {
  return () => {
    console.log(siteId, userId, data)
    return api.addGroupsForUser(siteId, userId, data)
      .then(response => ({status: response.status}))
      .then(({status}) => {
        if (status === 200) {
          console.log('信息保存成功！')
          Message('success', '信息保存成功！')
        }
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          Message('error', `保存失败，错误信息描述： ${error.response.data.errors[0].detail}！`)
        }
      })
  }
}
export const clearRolesData = () => ({type: CLEAR_ROLES_DATA})
export const clearRoleForUserData = () => ({type: CLEAR_ROLEFORUSER_DATA})
export const clearGroupsData = () => ({type: CLEAR_GROUPS_DATA})
export const clearGroupForUserData = () => ({type: CLEAR_GROUPFORUSER_DATA})
