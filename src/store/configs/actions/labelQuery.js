import {
  CLEAR_CONFIGS_DETAIL, FILTER_CONFIGS_DETAIL,
  FILTER_LABELQUERY
} from "../../../constants/ActionTypes";
import api from "../../../api";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchLabelQueryData = (page, id, title, sorter, filByEnabled) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: FILTER_LABELQUERY,
    promise: api.fetchLabelQueryData({params: condition}),
  })
}

export const fetchLabelQueryDetail = id => dispatch => {
  return dispatch({
    type: FILTER_CONFIGS_DETAIL,
    promise: api.fetchLabelQueryDetail(id)
  })
}

export const addLabelQueryData = data => dispatch  => {
  api.addLabelQueryData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const editLabelQueryData = (data, id) => dispatch => {
  api.editLabelQueryData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteLabelQueryData = (id, getData) => dispatch => {
  return api.deleteLabelQueryData(id)
    .then(res => {
      Notification('success', '信息删除成功！')
      getData()
    }).catch(err => {
      errorAction(err)
    })
}

export const clearConfigsDetail = () => ({type: CLEAR_CONFIGS_DETAIL})
