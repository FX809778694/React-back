import {CLEAR_CONFIGS_DETAIL, FILTER_CONFIGS_DETAIL, FILTER_LINKS, UPLOAD_IMAGE_SUCCESS} from "../../../constants/ActionTypes";
import api from "../../../api";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchLinksData = (page, sorter, filByType) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByType && (condition['filter[type]'] = filByType)
  return dispatch({
    type: FILTER_LINKS,
    promise: api.fetchLinksData({params: condition}),
  })
}

export const fetchLinksDetail = id => dispatch => {
  return dispatch({
    type: FILTER_CONFIGS_DETAIL,
    promise: api.fetchLinksDetail(id)
  })
}

export const addLinksData = data => dispatch  => {
  api.addLinksData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const editLinksData = (data, id) => dispatch => {
  api.editLinksData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
    errorAction(err)
  })
}

export const deleteLinksData = (id, getData) => dispatch => {
  return api.deleteLinksData(id)
    .then(res => {
      Notification('success', '状态修改成功！')
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
