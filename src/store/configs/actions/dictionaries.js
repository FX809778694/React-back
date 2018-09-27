import api from "../../../api";
import {CLEAR_CONFIGS_DETAIL, FILTER_CONFIGS_DETAIL, FILTER_DICTIONARY} from "../../../constants/ActionTypes";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchDictionariesData = (page, id, title, sorter, filByEnabled) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: FILTER_DICTIONARY,
    promise: api.fetchDictionariesData({params: condition}),
  })
}

export const fetchDictionariesDetail = id => dispatch => {
  return dispatch({
    type: FILTER_CONFIGS_DETAIL,
    promise: api.fetchDictionariesDetail(id)
  })
}

export const addDictionariesData = data => dispatch  => {
  api.addDictionariesData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const editDictionariesData = (data, id) => dispatch => {
  api.editDictionariesData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteDictionariesData = (id, getData) => dispatch => {
  return api.deleteDictionariesData(id)
    .then(res => {
      Notification('success', '信息删除成功！')
      getData()
    }).catch(err => {
      errorAction(err)
    })
}

export const clearConfigsDetail = () => ({type: CLEAR_CONFIGS_DETAIL})
