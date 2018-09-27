import {FILTER_TRANSLATE_DETAIL, FILTER_TRANSLATE_HOPE, FILTER_TRANSLATE_AUDIT} from "../../../constants/ActionTypes";
import api from "../../../api";
import * as types from "../../../constants/ActionTypes";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchTranslateHopeData = (page, id, title, sorter, filByState) => dispatch => {
  const condition = {
    'page[size]': 10
  }
  page && (condition['page[number]'] = page)
  id && (condition['filter[id]'] = id)
  title && (condition['filter[topicId]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByState && (condition['filter[state]'] = filByState)
  return dispatch({
    type: FILTER_TRANSLATE_HOPE,
    promise: api.fetchTranslateHopeData({params: condition})
  })
}

export const fetchTranslateHopeDetail = (id) => dispatch => {
  return dispatch({
    type: FILTER_TRANSLATE_DETAIL,
    promise: api.fetchTranslateHopeDetail(id)
  })
}

export const feedBackData = (id, data) => dispatch  => {
  api.feedBackData(id, data)
    .then(res => {
      Notification('success', '信息驳回成功！')
      window.history.back()
    }).catch((err) => {
    errorAction(err)
    })
}

export const fetchTranslateAuditData = (page, sorter, filByState) => dispatch => {
  const condition = {
    'page[size]': 10
  }
  page && (condition['page[number]'] = page)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByState && (condition['filter[state]'] = filByState)
  return dispatch({
    type: FILTER_TRANSLATE_AUDIT,
    promise: api.fetchTranslateAuditData({params: condition})
  })
}

export const fetchTranslateAuditDetail = (id) => dispatch => {
  return dispatch({
    type: FILTER_TRANSLATE_DETAIL,
    promise: api.fetchTranslateAuditDetail(id)
  })
}

export const AuditData = (id, data) => dispatch  => {
  api.AuditData(id, data)
    .then(res => {
      Notification('success', '审核信息成功！')
      window.history.back()
    }).catch((err) => {
      errorAction(err)
    })
}

export const clearTranslateDetail = () => ({type: types.CLEAR_TRANSLATE_DETAIL})
