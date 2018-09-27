import api from "../../../api";
import {CLEAR_QUESTION_DETAIL, FILTER_QUESTION_DETAIL, FILTER_QUIZS, UPLOAD_BACKIMG_SUCCESS} from "../../../constants/ActionTypes";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchQuizsData = (page, id, title, sorter, filByState, filByEnabled) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByState && (condition['filter[state]'] = filByState)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: FILTER_QUIZS,
    promise: api.fetchQuizsData({params: condition}),
  })
}

export const fetchQuizsDetail = id => dispatch => {
  return dispatch({
    type: FILTER_QUESTION_DETAIL,
    promise: api.fetchQuizsDetail(id)
  })
}

export const addQuizsData = data => dispatch  => {
  api.addQuizsData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const editQuizsData = (data, id) => dispatch => {
  api.editQuizsData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteQuizsData = (id, getData) => dispatch => {
  return api.deleteQuizsData(id)
    .then(res => {
      Notification('success', '信息删除成功！')
      getData()
    }).catch(err => {
      errorAction(err)
    })
}

export const uploadImg = (file) => {
  return (dispatch) => {
    return api.getPostImgAuthenticated()
      .then(response => ({json: response.data.data, status: response.status}))
      .then(({json, status}) => {
        if (status === 200) {
          const params = new FormData()
          params.append('file', file)
          params.append('code', json.code)
          params.append('isPublic', json.isPublic)
          params.append('time', json.time)
          params.append('userId', json.userId)
          params.append('key', json.key)
          api.uploadImg(params)
            .then(response => ({json: response.data.data, status: response.status, data: response.data}))
            .then(({json, status, data}) => {
              if (status === 200) {
                if (data.code === 100) {
                  Notification('success', '图片上传成功！');
                  dispatch({
                    type: UPLOAD_BACKIMG_SUCCESS,
                    json: json
                  })
                } else if (data.code === 101) {
                  Notification('error', data.message);
                }
              }
            })
        }
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
}

export const clearQuestionsDetail = () => ({type: CLEAR_QUESTION_DETAIL})
