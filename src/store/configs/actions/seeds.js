import {CLEAR_CONFIGS_DETAIL, FILTER_CONFIGS_DETAIL, FILTER_SEEDS} from "../../../constants/ActionTypes";
import api from "../../../api";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchSeedsData = (page, id, title, sorter) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  return dispatch({
    type: FILTER_SEEDS,
    promise: api.fetchSeedsData({params: condition}),
  })
}

export const fetchSeedsDetail = id => dispatch => {
  return dispatch({
    type: FILTER_CONFIGS_DETAIL,
    promise: api.fetchSeedsDetail(id)
  })
}

export const addSeedsData = data => dispatch => {
  api.addSeedsData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch((err) => {
    errorAction(err)
  })
}

export const editSeedsData = (data, id) => dispatch => {
  api.editSeedsData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteSeedsData = (id, getData) => dispatch => {
  return api.deleteSeedsData(id)
    .then(res => {
      Notification('success', '信息删除成功！')
      getData()
    }).catch(err => {
      errorAction(err)
    })
}

export const clearConfigsDetail = () => ({type: CLEAR_CONFIGS_DETAIL})
