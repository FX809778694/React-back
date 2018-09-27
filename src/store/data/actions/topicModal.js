import {FILTER_TOPICMODEL, FILTER_DATACENTER_DETAIL, CLEAR_DATACENTER_DETAIL} from "../../../constants/ActionTypes";
import api from "../../../api";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchTopicModelData = (page, sorter, filByState) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByState && (condition['filter[modelStatus]'] = filByState)
  return dispatch({
    type: FILTER_TOPICMODEL,
    promise: api.fetchTopicModelData({params: condition}),
  })
}

export const fetchTopicModelDetail = id => dispatch => {
  return dispatch({
    type: FILTER_DATACENTER_DETAIL,
    promise: api.fetchTopicModalDetail(id)
  })
}

export const addTopicsModelData = data => dispatch => {
  api.addTopicsModelData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
      errorAction(err)
    })
}

export const editTopicsModelData = (data, id, getData) => dispatch => {
  api.editTopicsModelData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      getData()
    }).catch(err => {
      if(err.status === 400 || err.status === 500){
        errorAction(err)
      }
    })
}

export const deleteTopicsModelData = (id, getData) => dispatch => {
  api.deleteTopicsModelData(id)
    .then(res => {
      getData()
      Notification('success', '信息删除成功！')
    }).catch(err => {
    errorAction(err)
  })
}

export const clearDataCenterData = () => ({type: CLEAR_DATACENTER_DETAIL})
