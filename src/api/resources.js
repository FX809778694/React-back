import axios from 'axios';
import {getJwt} from "../utils/auth";
import {HOST, UPLOAD_SERVER} from '../utils/config';
import * as URL from './url'

axios.defaults.baseURL = HOST
axios.defaults.withCredentials = true
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(function (config) {
  config.headers = config.headers || {}
  const apiToken = getJwt()
  if (apiToken) {
    config.headers.Authorization = 'Bearer ' + apiToken.replace(/(^\\")|(\\"$)/g, '')
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export const oauthResource = (method, id, data, api = URL.oauthUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), {'data': data})
}

export const articlesResource = (method, data, id, api = URL.articleTopicsUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const indexResource = (method, data, id, api = URL.articleIndexUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const recommendsResource = (method, data, id, api = URL.articleSearchUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

//文章二级
export const subArticlesTableResource = (method, data, id, api = URL.articlePostsTopicUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const subArticlesResource = (method, data, id, api = URL.articlePostsUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const enabledStateResource = (method, data, id, api = URL.articlePostsEnabledUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

//配置管理
export const proDupRemovalResource = (method, data, id, api = URL.topicsCluUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const channelsResource = (method, data, id, enabled, api = URL.articleChannelsUrl) => {
  return axios[method](api + (id ? ('/' + id) : '') + (enabled !== undefined ? ('/enabled/' + enabled) : ''), data)
}

export const seedsResource = (method, data, id, api = URL.articleSeedsUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const linksResource = (method, data, id, api = URL.articleLinksUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const categoriesResource = (method, data, id, api = URL.articleForumCateUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const dictionariesResource = (method, data, id, api = URL.articleDicUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const boostResource = (method, data, id, api = URL.articleEfssUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const labelQueryResource = (method, data, id, api = URL.articleEqbsUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const quizsResource = (method, data, id, url, api = URL.quizsUrl) => {
  return axios[method](api + (id ? ('/' + id) : '') + (url ? ('/' + url) : ''), data)
}

export const quizsCountResource = (method, data, id, api = URL.quizsCountUrl) => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const ImgAuthenticated = (method, api = URL.uploadUrl) => {
  return axios[method](api)
}

//图片上传相关配置
const _axios = axios.create({
  baseURL: UPLOAD_SERVER,
  withCredentials: false,
})
_axios.defaults.headers.common = {}

export const uploadImgResource = (method, data, api = URL.uploadImgUrl) => {
  return _axios[method](api, data)
}

//翻译管理
export const translateTasks = (method, data, id, api = URL.translateTasksUrl) => {
  return axios[method](api + (id ? `/${id}` : ''), data)
}

export const translateHopeResource = (method, data, id, api = URL.hopeTranslateUrl) => {
  return axios[method](api + (id ? `/${id}` : ''), data)
}

export const translateAuditResource = (method, data, id, api = URL.auditTranslateUrl) => {
  return axios[method](api + (id ? `/${id}` : ''), data)
}

export const humanTranslateResource = (method, data, id, api = URL.humanTranslatesUrl) => {
  return axios[method](api + (id ? `/${id}` : ''), data)
}

export const AuditDataResource = (method, id, data, api = URL.auditTranslateAuditUrl) => {
  return axios[method](api + '/' + id, data)
}

//数据统计
export const topicModelResource = (method, data, id, api = URL.topicsModelUrl) => {
  return axios[method](api + (id ? `/${id}` : ''), data)
}

export const ranksScoresResource = (method, data, id, api = URL.ranksScoresUrl) => {
  return axios[method](api + (id ? `/${id}` : ''), data)
}

export const ranksResource = (method, data, id, api = URL.ranksUrl) => {
  return axios[method](api + (id ? `/${id}` : ''), data)
}

export const eventLogsResource = (method, data, id, api = URL.eventLogsUrl) => {
  return axios[method](api + (id ? `/${id}` : ''), data)
}

export const logDictionaryResource = (method, data, id, api = URL.eventDicsUrl) => {
  return axios[method](api + (id ? `/${id}` : ''), data)
}



/*---------------------------- 旧的 ----------------------------*/

export const filterDataResource = (method, api, condition) => {
  return axios[method](api, condition)
}

export const filterDetailResource = (method, api) => {
  return axios[method](api)
}

export const addMessageDataResource = (method, data, api = URL.articleMesUrl) => {
  return axios[method](api, data)
}

export const editMessageDataResource = (method, data, id, api = URL.articleMesUrl) => {
  return axios[method](api + '/' + id, data)
}

export const deleteMessageDataResource = (method, id, api = URL.articleMesUrl) => {
  return axios[method](api + '/' + id)
}

export const addFeedbackDataResource = (method, data, api = URL.articleFeedbackUrl) => {
  return axios[method](api, data)
}

export const editFeedbackDataResource = (method, data, id, api = URL.articleFeedbackUrl) => {
  return axios[method](api + '/' + id, data)
}

export const deleteFeedbackDataResource = (method, id, api = URL.articleFeedbackUrl) => {
  return axios[method](api + '/' + id)
}

export const deleteReportResource = (method, id, api = URL.articleReportUrl) => {
  return axios[method](api + '/' + id)
}

export const addNoticesDataResource = (method, data, api = URL.rewardNoticesUrl) => {
  return axios[method](api, data)
}

export const editNoticesDataResource = (method, id, data, api = URL.rewardNoticesUrl) => {
  return axios[method](api + '/' + id, data)
}

export const deleteNoticesDataResource = (method, id, api = URL.rewardNoticesUrl) => {
  return axios[method](api + '/' + id)
}

export const addDbCategoriesDataResource = (method, data, api = URL.rewardCateUrl) => {
  return axios[method](api, data)
}

export const editDbCategoriesDataResource = (method, id, data, api = URL.rewardCateUrl) => {
  return axios[method](api + '/' + id, data)
}

export const deleteDbCategoriesDataResource = (method, id, api = URL.rewardCateUrl) => {
  return axios[method](api + '/' + id)
}

export const addUserDataResource = (method, data, api = URL.apiUserUrl) => {
  return axios[method](api, data)
}

export const editUserDataResource = (method, id, data, api = URL.apiUserUrl) => {
  return axios[method](api + '/' + id, data)
}

export const addSitesDataResource = (method, data, api = URL.userSitesUrl) => {
  return axios[method](api, data)
}

export const editSitesDataResource = (method, id, data, api = URL.userSitesUrl) => {
  return axios[method](api + '/' + id, data)
}

export const addGroupsDataResource = (method, data, api = URL.userGroupsUrl) => {
  return axios[method](api, data)
}

export const editGroupsDataResource = (method, id, data, api = URL.userGroupsUrl) => {
  return axios[method](api + '/' + id, data)
}

export const addRolesDataResource = (method, data, api = URL.userRolesUrl) => {
  return axios[method](api, data)
}

export const editRolesDataResource = (method, id, data, api = URL.userRolesUrl) => {
  return axios[method](api + '/' + id, data)
}

export const getRolesForUserResource = (method, siteId, userId, api = URL.userRolesUrl) => {
  return axios[method](api + '/sites/' + siteId + '/users/' + userId)
}

export const addRolesForUserResource = (method, siteId, userId, data, api = 'api/users/sites') => {
  return axios[method](api + '/' + siteId + '/users/' + userId + '/roles', data)
}

export const getGroupsForUserResource = (method, siteId, userId, api = 'user/groups/sites') => {
  return axios[method](api + '/' + siteId + '/users/' + userId)
}

export const addGroupsForUserResource = (method, siteId, userId, data, api = 'api/users/sites') => {
  return axios[method](api + '/' + siteId + '/users/' + userId + '/groups', data)
}

export const getRolesForGroupResource = (method, groupId, api = '/user/roles/groups') => {
  return axios[method](api + '/' + groupId)
}

export const addRolesForGroupResource = (method, groupId, data, api = '/user/groups') => {
  return axios[method](api + '/' + groupId + '/roles', data)
}


export const addDispatchDataResource = (method, data, api = URL.quartzJobsUrl) => {
  return axios[method](api, data)
}

export const editDispatchDataResource = (method, data, id, api = URL.quartzJobsUrl) => {
  return axios[method](api + '/' + id, data)
}

export const deleteDispatchDataResource = (method, id, api = URL.quartzJobsUrl) => {
  return axios[method](api + '/' + id)
}

export const addAuthoritiesDataResource = (method, data, api = URL.userAuthUrl) => {
  return axios[method](api, data)
}

export const editAuthoritiesDataResource = (method, id, data, api = URL.userAuthUrl) => {
  return axios[method](api + '/' + id, data)
}

export const addVotesDataResource = (method, data, api = URL.articleVotesUrl) => {
  return axios[method](api, data)
}

export const editVotesDataResource = (method, data, id, api = URL.articleVotesUrl) => {
  return axios[method](api + '/' + id, data)
}

export const deleteVotesDataResource = (method, id, api = URL.articleVotesUrl) => {
  return axios[method](api + '/' + id)
}

export const addVotesOptionsDataResource = (method, data, api = URL.articleVotesOptUrl) => {
  return axios[method](api, data)
}

export const editVotesOptionsDataResource = (method, data, id, api = URL.articleVotesOptUrl) => {
  return axios[method](api + '/' + id, data)
}

export const deleteVotesOptionsDataResource = (method, id, api = URL.articleVotesOptUrl) => {
  return axios[method](api + '/' + id)
}

export const editExtendInfomationDataResource = (method, data, id, api = URL.profilesUrl) => {
  return axios[method](api + '/' + id, data)
}

export const addSubExtendDataResource = (method, data, api = URL.addressAdminUrl) => {
  return axios[method](api, data)
}

export const deleteSubExtendDataResource = (method, id, api = URL.addressUrl) => {
  return axios[method](api + '/' + id)
}

export const editSubExtendDataResource = (method, data, id, api = URL.addressUrl) => {
  return axios[method](api + '/' + id, data)
}

export default axios
