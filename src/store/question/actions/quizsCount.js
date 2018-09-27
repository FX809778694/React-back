import api from "../../../api";
import {FILTER_QUIZSCOUNT, CLEAR_QUESTION_DETAIL, FILTER_QUESTION_DETAIL} from "../../../constants/ActionTypes";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchQuizsCountData = (page, id, title, sorter, filByState, filByEnabled) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[quizId]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByState && (condition['filter[state]'] = filByState)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: FILTER_QUIZSCOUNT,
    promise: api.fetchQuizsCountData({params: condition}),
  })
}

export const fetchQuizsCountDetail = id => dispatch => {
  return dispatch({
    type: FILTER_QUESTION_DETAIL,
    promise: api.fetchQuizsCountDetail(id)
  })
}

export const addQuizsCountData = data => dispatch  => {
  api.addQuizsCountData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const editQuizsCountData = (data, id) => dispatch => {
  api.editQuizsCountData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteQuizsCountData = (id, getData) => dispatch => {
  return api.deleteQuizsCountData(id)
    .then(res => {
      Notification('success', '信息删除成功！')
      getData()
    }).catch(err => {
      errorAction(err)
    })
}

export const clearQuestionsDetail = () => ({type: CLEAR_QUESTION_DETAIL})
