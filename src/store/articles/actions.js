import * as types from '../../constants/ActionTypes'
import api from '../../api/index'
import {Notification} from '../../other/ShowMsg'
import {WEEKLY_RECOMMEND_CHANNEL_ID} from "../../utils/config";
import {errorAction} from '../../other/errorAction'

export const fetchArticlesData = (forumId, page, id, title) => dispatch => {
  const condition = {
    'filter[forumId]': forumId,
    'page[size]': 10,
    'page[number]': page,
    'sort': '-created',
    'filter[enabled]': 1
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  const FILTER_DATA =
    forumId === 1 ? types.FILTER_PRODUCTS
    : forumId === 2 ? types.FILTER_BRANDS
    : forumId === 3 ? types.FILTER_NEWS
    : forumId === 4 ? types.FILTER_EVALUATING
    : forumId === 5 ? types.FILTER_VIDEOS
    : forumId === 6 ? types.FILTER_BROADCAST
    : types.FILTER_TUNE
  return dispatch({
    type: FILTER_DATA,
    promise: api.filterArticlesData({params: condition})
  })
}

export const fetchArticlesDetail = id => dispatch => {
  return dispatch({
    type: types.FILTER_ARTICLES_DETAIL,
    promise: api.filterArticlesDetail(id)
  })
}

//周刊列表数据
export const fetchRecommendsData = (page, id, title, sorter) => dispatch => {
  const condition = {
    'page[number]': page,
    'agg[size]': -1,
    'filter[channel]': WEEKLY_RECOMMEND_CHANNEL_ID,
    'page[size]': 10
  }
  id && (condition['filter[id]'] = id)
  title && (condition['filter[title]'] = title)
  sorter && sorter !== 'undefined' && (condition['sort'] = sorter)
  return dispatch({
    type: types.FILTER_RECOMMEND,
    promise: api.filterRecommendsData({params: condition})
  })
}

export const addArticlesData = data => dispatch  => {
  api.addArticlesData(data)
    .then(res => {
      api.addTopicIndex(res.data.data.id).catch(err => {
        Notification('warning', '添加索引失败！', err.response.status && `错误代码：${err.response.status}`)
      })
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
      errorAction(err)
    })
}

export const editArticlesData = data => dispatch => {
  api.editArticlesData(data)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
      errorAction(err)
    })
}

export const deleteArticlesData = (id, getData) => dispatch => {
  api.deleteArticlesData(id)
    .then(res => {
      api.deleteTopicIndex(id)
      getData()
      Notification('success', '信息删除成功！')
    }).catch(err => {
      errorAction(err)
    })
}

//二级数据
export const fetchSubDataByKey = id => dispatch => {
  return dispatch({
    type: types.FILTER_SUB_ARTICLE,
    promise: api.filterSubData(id)
  })
}

export const fetchSubDetailByKey = id => dispatch => {
  return dispatch({
    type: types.FILTER_SUB_ARTICLE_DETAIL,
    promise: api.filterSubDetail(id)
  })
}

export const addSubData = data => dispatch  => {
  api.addSubData(data)
    .then(res => {
      Notification('success', '信息添加成功！')
      window.history.back()
    }).catch(err => {
      errorAction(err)
    })
}

export const editSubData = (data, id) => dispatch => {
  api.editSubData(data, id)
    .then(res => {
      Notification('success', '信息修改成功！')
      window.history.back()
    }).catch(err => {
      errorAction(err)
    })
}

export const enabledSubData = (id, enabled, getData) => dispatch => {
  api.enabledState(id, {params: {enabled: enabled}})
    .then(res => {
      Notification('success', '状态修改成功！')
      getData()
    }).catch(err => {
      errorAction(err)
    })
}

export const clearArticleDetail = () => ({type: types.CLEAR_ARTICLE_DETAIL})
export const clearSubArticleData = () => ({type: types.CLEAR_SUB_ARTICLE})
export const clearSubArticleDetail = () => ({type: types.CLEAR_SUB_ARTICLE_DETAIL})
