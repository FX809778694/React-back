import * as types from "../../../constants/ActionTypes";
import api from "../../../api";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";
import {CLEAR_CONFIGS_DETAIL} from "../../../constants/ActionTypes";

export const fetchTopicsData = (page, id, title, sorter, filByForumId, filByEnabled) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByForumId && (condition['filter[forumId]'] = filByForumId)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: types.FILTER_TOPICS,
    promise: api.filterArticlesData({params: condition}),
  })
}

export const fetchTopicsDetail = id => dispatch => {
  return dispatch({
    type: types.FILTER_CONFIGS_DETAIL,
    promise: api.filterArticlesDetail(id)
  })
}

export const editTopicsData = (data, id) => dispatch => {
  api.editTopicsData(data, id)
    .then(res => {
      Notification('success', '修改信息成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const addTopicIndex = data => dispatch => {
  api.addTopicIndex(data)
    .then(res => {
      Notification('success', '索引添加成功！')
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteTopicIndex = (id, getData) => dispatch => {
  api.deleteTopicIndex(id)
    .then(res => {
      Notification('success', '索引删除成功！')
      getData()
    }).catch(err => {
    errorAction(err)
  })
}

export const clearConfigsDetail = () => ({type: CLEAR_CONFIGS_DETAIL})
