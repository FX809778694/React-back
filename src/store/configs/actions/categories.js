import {CLEAR_CONFIGS_DETAIL, FILTER_CATEGORIES, UPLOAD_IMAGE_SUCCESS} from "../../../constants/ActionTypes";
import api from "../../../api";
import * as types from "../../../constants/ActionTypes";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchCategoriesData = (page, id, title, sorter, filByForumId, filByEnabled) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByForumId && (condition['filter[forumId]'] = filByForumId)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: FILTER_CATEGORIES,
    promise: api.fetchCategoriesData({params: condition}),
  })
}

export const fetchCategoriesDetail = id => dispatch => {
  return dispatch({
    type: types.FILTER_CONFIGS_DETAIL,
    promise: api.fetchCategoriesDetail(id)
  })
}

export const editCategoriesData = (data, id) => dispatch => {
  api.editCategoriesData(data, id)
    .then(res => {
      Notification('success', '修改信息成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const addCategoriesData = data => dispatch => {
  api.addCategoriesData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteCategoriesData = (id, getData) => dispatch => {
  api.deleteCategoriesData(id)
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
                    type: UPLOAD_IMAGE_SUCCESS,
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

export const clearConfigsDetail = () => ({type: CLEAR_CONFIGS_DETAIL})
