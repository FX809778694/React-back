import {
  CLEAR_DATA,
  CLEAR_ROLEFORGROUP_DATA,
  CLEAR_ROLES_DATA,
  FILTER_GROUPS,
  FILTER_GROUPS_DETAIL,
  FILTER_ROLEFORGROUP,
  FILTER_ROLES,
  FILTER_SITES
} from "../../../../constants/ActionTypes"
import api from '../../../../api/index'
import {Message, Notification} from '../../../../other/ShowMsg'
import {userRolesUrl, userSitesUrl} from "../../../../api/url";

function fetchPosts(subreddit, page, id, title, enabled) {
  return dispatch => {
    const condition = {
      'page[number]': page
    }
    id && (condition['filter[siteId]'] = id)
    title && (condition['filter[groupName]'] = title)
    enabled && (condition['filter[enabled]'] = enabled)
    return dispatch({
      type: FILTER_GROUPS,
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
      type: FILTER_GROUPS_DETAIL,
      promise: api.filterDetail(subreddit)
    })
  }
}


export const editGroupsData = (id, data) => {
  return () => {
    console.log(data)
    return api.editGroupsData(id, data)
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

export const addGroupsData = (data) => {
  return () => {
    console.log(data)
    return api.addGroupsData(data)
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

export const getRolesForGroup = (groupId) => {
  return dispatch => {
    return dispatch({
      type: FILTER_ROLEFORGROUP,
      promise: api.getRolesForGroup(groupId),
    })
  }
}

export const addRolesForGroup = (groupId, data) => {
  return () => {
    console.log(groupId, data)
    return api.addRolesForGroup(groupId, data)
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
export const clearRoleForGroupData = () => ({type: CLEAR_ROLEFORGROUP_DATA})

