import {CLEAR_DATA, FILTER_VOTES, FILTER_VOTES_DETAIL} from "../../../constants/ActionTypes"
import api from '../../../api/index'
import {Notification} from '../../../other/ShowMsg'


function fetchPosts(subreddit, page, id, title) {
  return dispatch => {
    const condition = {
      'page[number]': page,
    }
    id && (condition['filter[id]'] = id)
    title && (condition['filter[voteText]'] = title)
    return dispatch({
      type: FILTER_VOTES,
      promise: api.filterData(subreddit, {params: condition}),
    })
  }
}

export function fetchData(subreddit, page, id, title) {
  return (dispatch) => {
    return dispatch(fetchPosts(subreddit, page, id, title))
  }
}

export function fetchDataByKey(subreddit) {
  return (dispatch) => {
    return dispatch({
      type: FILTER_VOTES_DETAIL,
      promise: api.filterDetail(subreddit)
    })
  }
}

export const editVotesData = (data, id) => {
  return () => {
    console.log(data)
    return api.editVotesData(data, id)
      .then(response => ({status: response.status}))
      .then(({status}) => {
        if (status === 200 || status === 204) {
          console.log('信息修改成功！')
          Notification('success', '信息修改成功！')
          window.history.back()
        }
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          Notification('error', '信息修改失败！', `错误信息描述：${error.response.data.errors[0].detail}`)
          console.log(`错误信息描述：${error.response.data.errors[0].detail}`)
        }
      })
  }
}

export const addVotesData = (data) => {
  return () => {
    console.log(data)
    return api.addVotesData(data)
      .then(response => ({status: response.status}))
      .then(({status}) => {
        if (status === 201) {
          console.log('信息添加成功！')
          Notification('success', '信息添加成功！')
          window.history.back()
        }
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log(`错误信息描述：${error.response.data.errors[0].detail}`)
          Notification('error', '信息添加失败！', `错误信息描述：${error.response.data.errors[0].detail}`)
        }
      })
  }
}

export const deleteVotesData = (id) => {
  return () => {
    console.log(id)
    return api.deleteVotesData(id)
      .then(response => ({status: response.status}))
      .then(({status}) => {
        if (status === 204) {
          Notification('success', '信息删除成功！')
        }
      }).catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log(`错误信息描述：${error.response.data.errors[0].detail}`)
          Notification('error', '信息删除失败！', `${error.response.data.errors[0].detail}`)
        }
      })
  }
}

export const clearData = () => ({type: CLEAR_DATA})
