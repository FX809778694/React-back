import {
  articlesResource,
  indexResource,
  recommendsResource,
  subArticlesTableResource,
  subArticlesResource,
  enabledStateResource,
  proDupRemovalResource,
  channelsResource,
  seedsResource,
  linksResource,
  categoriesResource,
  dictionariesResource,
  boostResource,
  labelQueryResource,
  quizsResource,
  quizsCountResource,
  translateHopeResource,
  translateAuditResource,
  humanTranslateResource,
  topicModelResource,
  ranksScoresResource,
  ranksResource,
  eventLogsResource,
  logDictionaryResource,

  addAuthoritiesDataResource,
  addDbCategoriesDataResource,
  addDispatchDataResource,
  addFeedbackDataResource,
  addGroupsDataResource,
  addGroupsForUserResource,
  addMessageDataResource,
  addNoticesDataResource,
  addRolesDataResource,
  addRolesForGroupResource,
  addRolesForUserResource,
  addSitesDataResource,
  addSubExtendDataResource,
  addUserDataResource,
  addVotesDataResource,
  addVotesOptionsDataResource,
  AuditDataResource,
  deleteDbCategoriesDataResource,
  deleteDispatchDataResource,
  deleteFeedbackDataResource,
  deleteMessageDataResource,
  deleteNoticesDataResource,
  deleteReportResource,
  deleteSubExtendDataResource,
  deleteVotesDataResource,
  deleteVotesOptionsDataResource,
  editAuthoritiesDataResource,
  editDbCategoriesDataResource,
  editDispatchDataResource,
  editExtendInfomationDataResource,
  editFeedbackDataResource,
  editGroupsDataResource,
  editMessageDataResource,
  editNoticesDataResource,
  editRolesDataResource,
  editSitesDataResource,
  editSubExtendDataResource,
  editUserDataResource,
  editVotesDataResource,
  editVotesOptionsDataResource,
  filterDataResource,
  filterDetailResource,
  getGroupsForUserResource,
  getRolesForGroupResource,
  getRolesForUserResource,
  ImgAuthenticated,
  oauthResource,
  translateTasks,
  uploadImgResource
} from "./resources"

export default {

  login: function (data) {
    return oauthResource('post','token',data)
  },
  logout: function () {
    return oauthResource('get', 'logout')
  },

  //文章管理
  filterArticlesData: function (data) {
    return articlesResource('get', data)
  },
  filterArticlesDetail: function (id) {
    return articlesResource('get', null, id)
  },
  addArticlesData: function (data) {
    return articlesResource('post', data)
  },
  editArticlesData: function (data) {
    return articlesResource('post', data)
  },
  deleteArticlesData: function (id) {
    return articlesResource('delete', null, id)
  },

  //索引管理
  addTopicIndex: function (data) {
    return indexResource(Array.isArray(data) ? 'post' : 'get', Array.isArray(data) ? {data: {array: data}} : {params: {id: data}})
  },
  deleteTopicIndex: function (id) {
    return indexResource('delete', null, id)
  },

  //周刊数据
  filterRecommendsData: function (data) {
    return recommendsResource('get', data)
  },

  //文章二级
  filterSubData: function (id) {
    return subArticlesTableResource('get', null, id)
  },
  filterSubDetail: function (id) {
    return subArticlesResource('get', null, id)
  },
  addSubData: function (data) {
    return subArticlesResource('post', data)
  },
  editSubData: function (data, id) {
    return subArticlesResource('patch', data, id)
  },
  enabledState: function (id, data) {
    return enabledStateResource('get', data, id)
  },

  //配置管理
  fetchProDupRemovalData: function (data) {
    return proDupRemovalResource('get', data)
  },
  addProDupRemovalData: function (data) {
    return proDupRemovalResource('post', data)
  },
  deleteProDupRemovalData: function (id) {
    return proDupRemovalResource('delete', null, id)
  },
  editTopicsData:function (data, id) {
    return articlesResource('patch', data, id)
  },
  fetchChannelsData: function (data) {
    return channelsResource('get', data)
  },
  fetchChannelsDetail: function (id) {
    return channelsResource('get', null, id)
  },
  addChannelsData:function (data) {
    return channelsResource('post',data)
  },
  editChannelsData:function (data) {
    return channelsResource('post',data)
  },
  updateChannelsEnabled: function (id, enabled) {
    return channelsResource('delete', null, id, enabled)
  },
  fetchSeedsData: function (data) {
    return seedsResource('get', data)
  },
  fetchSeedsDetail: function (id) {
    return seedsResource('get', null, id)
  },
  addSeedsData:function (data) {
    return seedsResource('post',data)
  },
  editSeedsData:function (data, id) {
    return seedsResource('patch',data, id)
  },
  deleteSeedsData: function (id) {
    return seedsResource('delete', null, id)
  },
  fetchLinksData: function (data) {
    return linksResource('get', data)
  },
  fetchLinksDetail: function (id) {
    return linksResource('get', null, id)
  },
  addLinksData: function (data) {
    return linksResource('post', data)
  },
  editLinksData: function (data, id) {
    return linksResource('patch', data, id)
  },
  deleteLinksData: function (id) {
    return linksResource('delete', null, id)
  },
  fetchCategoriesData: function (data) {
    return categoriesResource('get', data)
  },
  fetchCategoriesDetail: function (id) {
    return categoriesResource('get', null, id)
  },
  addCategoriesData: function (data) {
    return categoriesResource('post', data)
  },
  editCategoriesData: function (data, id) {
    return categoriesResource('patch', data, id)
  },
  deleteCategoriesData: function (id) {
    return categoriesResource('delete', null, id)
  },
  fetchDictionariesData: function (data) {
    return dictionariesResource('get', data)
  },
  fetchDictionariesDetail: function (id) {
    return dictionariesResource('get', null, id)
  },
  addDictionariesData: function (data) {
    return dictionariesResource('post', data)
  },
  editDictionariesData: function (data, id) {
    return dictionariesResource('patch', data, id)
  },
  deleteDictionariesData: function (id) {
    return dictionariesResource('delete', null, id)
  },
  fetchBoostData: function (data) {
    return boostResource('get', data)
  },
  fetchBoostDetail: function (id) {
    return boostResource('get', null, id)
  },
  addBoostData: function (data) {
    return boostResource('post', data)
  },
  editBoostData: function (data, id) {
    return boostResource('patch', data, id)
  },
  deleteBoostData: function (id) {
    return boostResource('delete', null, id)
  },
  fetchLabelQueryData: function (data) {
    return labelQueryResource('get', data)
  },
  fetchLabelQueryDetail: function (id) {
    return labelQueryResource('get', null, id)
  },
  addLabelQueryData: function (data) {
    return labelQueryResource('post', data)
  },
  editLabelQueryData: function (data, id) {
    return labelQueryResource('patch', data, id)
  },
  deleteLabelQueryData: function (id) {
    return labelQueryResource('delete', null, id)
  },
  getPostImgAuthenticated: function () {
    return ImgAuthenticated('get')
  },
  uploadImg: function (data) {
    return uploadImgResource('post', data)
  },

  //翻译管理
  getTranslateTasks: function(data) {
    return translateTasks('get', data)
  },
  getTranslateTask: function(id) {
    return translateTasks('get', null, id)
  },
  addTranslateTasks: function(data) {
    return translateTasks('post', data)
  },
  editTranslateTasks: function(data, id) {
    return translateTasks('patch', data, id)
  },
  deleteTranslateTasks: function(id) {
    return translateTasks('delete', null, id)
  },
  fetchTranslateHopeData: function(data) {
    return translateHopeResource('get', data)
  },
  fetchTranslateHopeDetail: function(id) {
    return translateHopeResource('get', null, id)
  },
  feedBackData: function (id, data) {
    return translateHopeResource('patch', id, data)
  },
  fetchTranslateAuditData: function (data) {
    return translateAuditResource('get', data)
  },
  fetchTranslateAuditDetail: function(id) {
    return humanTranslateResource('get', null, id)
  },
  AuditData: function (id, data) {
    return AuditDataResource('patch', id, data)
  },

  //数据统计
  fetchTopicModelData: function (data) {
    return topicModelResource('get', data)
  },
  fetchTopicModalDetail: function(id) {
    return topicModelResource('get', null, id)
  },
  addTopicsModelData:function (data) {
    return topicModelResource('post',data)
  },
  editTopicsModelData:function (data,id) {
    return topicModelResource('patch',data,id)
  },
  deleteTopicsModelData:function (id) {
    return topicModelResource('delete', null, id)
  },
  fetchRanksData: function (data) {
    return ranksScoresResource('get', data)
  },
  updateRanksData: function (data) {
    return ranksResource('get', data)
  },
  deleteRanksData:function (data) {
    return ranksResource('delete', data)
  },
  fetchOutlineData: function (data) {
    return eventLogsResource('get', data)
  },
  fetchOutlineDetail: function(id) {
    return eventLogsResource('get', null, id)
  },
  fetchLogDictionaryData: function (data) {
    return logDictionaryResource('get', data)
  },
  fetchLogDictionaryDetail: function(id) {
    return logDictionaryResource('get', null, id)
  },
  addLogDictionaryData:function (data) {
    return logDictionaryResource('post',data)
  },
  editLogDictionaryData:function (data,id) {
    return logDictionaryResource('patch',data,id)
  },
  deleteLogDictionaryData:function (id) {
    return logDictionaryResource('delete', null, id)
  },


  //问卷管理
  fetchQuizsData: function(data) {
    return quizsResource('get', data)
  },
  fetchQuizsDetail: function(id) {
    return quizsResource('get', null, id, 'admin')
  },
  addQuizsData: function(data) {
    return quizsResource('post', data)
  },
  editQuizsData: function(data, id) {
    return quizsResource('post', data, id)
  },
  deleteQuizsData: function(id) {
    return quizsResource('delete', null, id)
  },
  fetchQuizsCountData: function(data) {
    return quizsCountResource('get', data)
  },
  fetchQuizsCountDetail: function(id) {
    return quizsCountResource('get', null, id)
  },
  addQuizsCountData: function(data) {
    return quizsCountResource('post', data)
  },
  editQuizsCountData: function(data, id) {
    return quizsCountResource('patch', data, id)
  },
  deleteQuizsCountData: function(id) {
    return quizsCountResource('delete', null, id)
  },


  /*---------------------------- 旧的 ----------------------------*/

  //filterData的api由页面传入，故可用同一个Resource请求方法
  filterData: function (api, condition) {
    return filterDataResource('get', api, condition)
  },

  //filterDetail的api由页面传入，故可用同一个Resource请求方法
  filterDetail: function (api) {
    return filterDetailResource('get', api)
  },

  addNoticesData: function (data) {
    return addNoticesDataResource('post', data)
  },

  editNoticesData: function (id, data) {
    return editNoticesDataResource('patch', id, data)
  },

  deleteNoticesData: function (id) {
    return deleteNoticesDataResource('delete', id)
  },

  addDbCategoriesData: function (data) {
    return addDbCategoriesDataResource('post', data)
  },

  editDbCategoriesData: function (id, data) {
    return editDbCategoriesDataResource('patch', id, data)
  },

  deleteDbCategoriesData: function (id) {
    return deleteDbCategoriesDataResource('delete', id)
  },

  addUserData: function (data) {
    return addUserDataResource('post', data)
  },

  editUserData: function (id, data) {
    return editUserDataResource('patch', id, data)
  },

  addSitesData: function (data) {
    return addSitesDataResource('post', data)
  },

  editSitesData: function (id, data) {
    return editSitesDataResource('patch', id, data)
  },

  addGroupsData: function (data) {
    return addGroupsDataResource('post', data)
  },

  editGroupsData: function (id, data) {
    return editGroupsDataResource('patch', id, data)
  },

  addRolesData: function (data) {
    return addRolesDataResource('post', data)
  },

  editRolesData: function (id, data) {
    return editRolesDataResource('patch', id, data)
  },

  getRolesForUser: function (siteId, userId) {
    return getRolesForUserResource('get', siteId, userId)
  },

  addRolesForUser: function (siteId, userId, data) {
    return addRolesForUserResource('post', siteId, userId, data)
  },

  getGroupsForUser: function (siteId, userId) {
    return getGroupsForUserResource('get', siteId, userId)
  },

  addGroupsForUser: function (siteId, userId, data) {
    return addGroupsForUserResource('post', siteId, userId, data)
  },

  getRolesForGroup: function (groupId) {
    return getRolesForGroupResource('get', groupId)
  },

  addRolesForGroup: function (groupId, data) {
    return addRolesForGroupResource('post', groupId, data)
  },



  addDispatchData: function (data) {
    return addDispatchDataResource('post', data)
  },

  editDispatchData: function (data, id) {
    return editDispatchDataResource('patch', data, id)
  },

  deleteDispatchData: function (id) {
    return deleteDispatchDataResource('delete', id)
  },

  addMessageData: function (data) {
    return addMessageDataResource('post', data)
  },

  editMessageData: function (data, id) {
    return editMessageDataResource('patch', data, id)
  },

  deleteMessageData: function (id) {
    return deleteMessageDataResource('delete', id)
  },

  addFeedbackData: function (data) {
    return addFeedbackDataResource('post', data)
  },

  editFeedbackData: function (data, id) {
    return editFeedbackDataResource('patch', data, id)
  },

  deleteFeedbackData: function (id) {
    return deleteFeedbackDataResource('delete', id)
  },
  deleteReportData: function (id) {
    return deleteReportResource('delete', id)
  },

  addAuthoritiesData: function (data) {
    return addAuthoritiesDataResource('post', data)
  },

  editAuthoritiesData: function (id, data) {
    return editAuthoritiesDataResource('patch', id, data)
  },

  addVotesData: function (data) {
    return addVotesDataResource('post', data)
  },

  editVotesData: function (data, id) {
    return editVotesDataResource('patch', data, id)
  },

  deleteVotesData: function (id) {
    return deleteVotesDataResource('delete', id)
  },

  addVotesOptionsData: function (data) {
    return addVotesOptionsDataResource('post', data)
  },

  editVotesOptionsData: function (data, id) {
    return editVotesOptionsDataResource('patch', data, id)
  },

  deleteVotesOptionsData: function (id) {
    return deleteVotesOptionsDataResource('delete', id)
  },

  editExtendInfomationData: function (data, id) {
    return editExtendInfomationDataResource('patch', data, id)
  },

  addSubExtendData: function (data) {
    return addSubExtendDataResource('post', data)
  },

  deleteSubExtendData: function (id) {
    return deleteSubExtendDataResource('delete', id)
  },

  editSubExtendData: function (data, id) {
    return editSubExtendDataResource('patch', data, id)
  },

}
