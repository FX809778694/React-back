import api from "../../../api";
import {FILTER_RANK} from "../../../constants/ActionTypes";
import {errorAction} from "../../../other/errorAction";
import {Notification} from "../../../other/ShowMsg";

export const fetchRanksData = (page, selected) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  selected && (condition['filter[key]'] = selected)
  return dispatch({
    type: FILTER_RANK,
    promise: api.fetchRanksData({params: condition}),
  })
}

export const updateRanksData = () => dispatch => {
  const condition = {
    'filter[key]': 'all_ranking'
  }
  api.updateRanksData({params: condition})
    .then(res => {
      Notification('success', '信息更新成功！')
    }).catch(err => {
    errorAction(err)
  })

}

export const deleteRanksData = (id, selected, getData) => dispatch => {
  const condition = {
    'topicId': id,
    'key': selected
  }
  api.deleteRanksData({params: condition})
    .then(res => {
      getData()
      Notification('success', '信息删除成功！')
    }).catch(err => {
    errorAction(err)
  })
}







