import api from "../../../api/index";
import {FILTER_PRODUPREMOVAL} from "../../../constants/ActionTypes";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchProDupRemovalData = (page, topicId, targetId) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  topicId && (condition['filter[topicId]'] = topicId)
  targetId && (condition['filter[targetId]'] = targetId)
  return dispatch({
    type: FILTER_PRODUPREMOVAL,
    promise: api.fetchProDupRemovalData({params: condition})
  })
}

export const addProDupRemovalData = (data,getData) => dispatch  => {
  api.addProDupRemovalData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      getData()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteProDupRemovalData = (id, getData) => dispatch => {
  api.deleteProDupRemovalData(id)
    .then(res => {
      Notification('success', '状态修改成功！')
      getData()
    }).catch(err => {
    errorAction(err)
  })
}
