import {Message} from '../other/ShowMsg'

export default store => next => action => {
  const {promise, type, ...rest} = action

  if (!promise) return next(action)

  const SUCCESS = type + '_SUCCESS'
  const REQUEST = type + '_REQUEST'
  const FAILURE = type + '_FAILURE'
  next({...rest, type: REQUEST})

  return promise
    .then(response => response.data)
    .then(json => {
      return store.dispatch({...rest, json, type: SUCCESS})
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        Message('error', '您没有查看权限，请联系管理员！')
      }
      if (error.response && error.response.status === 400) {
        Message('error', '错误代码：400')
      }
      if (error.response && error.response.status === 500) {
        Message('error', '错误代码：500')
      }
      return store.dispatch({...rest, error, type: FAILURE})
    })
}
