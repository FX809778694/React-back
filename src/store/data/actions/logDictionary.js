import {CLEAR_DATACENTER_DETAIL, FILTER_DATACENTER_DETAIL, FILTER_LOGDICTIONARY} from "../../../constants/ActionTypes";
import api from "../../../api";
import {errorAction} from "../../../other/errorAction";
import {Notification} from "../../../other/ShowMsg";

export const fetchLogDictionaryData = (page, id, title, sorter, filByEnabled) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: FILTER_LOGDICTIONARY,
    promise: api.fetchLogDictionaryData({params: condition}),
  })
}

export const fetchLogDictionaryDetail = id => dispatch => {
  return dispatch({
    type: FILTER_DATACENTER_DETAIL,
    promise: api.fetchLogDictionaryDetail(id)
  })
}

export const addLogDictionaryData = data => dispatch  => {
  api.addLogDictionaryData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const editLogDictionaryData = (data, id) => dispatch => {
  api.editLogDictionaryData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteLogDictionaryData = (id, getData) => dispatch => {
  return api.deleteLogDictionaryData(id)
    .then(res => {
      Notification('success', '信息删除成功！')
      getData()
    }).catch(err => {
      errorAction(err)
    })
}

export const clearDataCenterData = () => ({type: CLEAR_DATACENTER_DETAIL})
