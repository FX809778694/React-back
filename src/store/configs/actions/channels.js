import api from "../../../api";
import {CLEAR_CONFIGS_DETAIL, FILTER_CHANNELS, FILTER_CONFIGS_DETAIL, UPLOAD_IMAGE_SUCCESS} from "../../../constants/ActionTypes";
import {Notification} from "../../../other/ShowMsg";
import {errorAction} from "../../../other/errorAction";

export const fetchChannelsData = (page, id, title, sorter, filByChannelType, filByEnabled) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  filByChannelType && (condition['filter[channelType]'] = filByChannelType)
  filByEnabled && (condition['filter[enabled]'] = filByEnabled)
  return dispatch({
    type: FILTER_CHANNELS,
    promise: api.fetchChannelsData({params: condition}),
  })
}

export const fetchChannelsDetail = id => dispatch => {
  return dispatch({
    type: FILTER_CONFIGS_DETAIL,
    promise: api.fetchChannelsDetail(id)
  })
}

export const addChannelsData = data => dispatch  => {
  api.addChannelsData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
      errorAction(err)
    })
}

export const editChannelsData = data => dispatch => {
  api.editChannelsData(data)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
      errorAction(err)
    })
}

export const updateChannelsEnabled = (id, enabled, getData) => dispatch => {
  return api.updateChannelsEnabled(id, enabled)
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
