import {FILTER_TRANSLATE_DETAIL, FILTER_TASKS} from "../../../constants/ActionTypes";
import api from "../../../api";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";
import * as types from "../../../constants/ActionTypes";

export const fetchTasksData = (page, id, title, sorter, filByState, filByEnabled) => dispatch => {
  const condition = {
    'page[size]': 10
  }
  page && (condition['page[number]'] = page)
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByState && (condition['filter[state]'] = filByState)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: FILTER_TASKS,
    promise: api.getTranslateTasks({params: condition})
  })
}

export const fetchTranslateTask = (id) => dispatch => {
  return dispatch({
    type: FILTER_TRANSLATE_DETAIL,
    promise: api.getTranslateTask(id)
  })
}

export const addTranslateTasks = data => dispatch => {
  api.addTranslateTasks(data)
    .then(res => {
      Notification('success', '信息添加成功')
      window.history.back()
    })
    .catch((err) => {
      errorAction(err)
    })
}

export const editTranslateTasks = (id, data) => dispatch => {
  api.editTranslateTasks({data}, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    })
    .catch((err) => {
      errorAction(err)
    })
}

export const deleteTranslateTasks = (id, getData) => dispatch => {
  api.deleteTranslateTasks(id)
    .then(res => {
      Notification('success', '信息删除成功！')
      getData()
    })
    .catch((err) => {
      errorAction(err)
    })
}

export const clearTranslateTasks = () => ({type: types.CLEAR_TRANSLATE_DETAIL})
