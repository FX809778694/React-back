import {CLEAR_CONFIGS_DETAIL, FILTER_BOOST, FILTER_CONFIGS_DETAIL} from "../../../constants/ActionTypes";
import api from "../../../api";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchBoostData = (page, id, title, sorter, filByEnabled) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: FILTER_BOOST,
    promise: api.fetchBoostData({params: condition}),
  })
}

export const fetchBoostDetail = id => dispatch => {
  return dispatch({
    type: FILTER_CONFIGS_DETAIL,
    promise: api.fetchBoostDetail(id)
  })
}

export const addBoostData = data => dispatch  => {
  api.addBoostData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const editBoostData = (data, id) => dispatch => {
  api.editBoostData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteBoostData = (id, getData) => dispatch => {
  return api.deleteBoostData(id)
    .then(res => {
      Notification('success', '信息删除成功！')
      getData()
    }).catch(err => {
      errorAction(err)
    })
}

export const clearConfigsDetail = () => ({type: CLEAR_CONFIGS_DETAIL})
