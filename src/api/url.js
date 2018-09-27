import {API_ARTICLE_VERSION, API_SUPPORT_VERSION, API_REWARD_VERSION, API_QUIZ_VERSION, API_USER_VERSION} from "../utils/config";

//文章中心
export const articleTopicsUrl = `${API_ARTICLE_VERSION}/article/admin/Topics`
export const articleIndexUrl = `${API_ARTICLE_VERSION}/article/admin/Index`

//常用功能
export const articleSearchUrl =`${API_ARTICLE_VERSION}/article/topics/search`

//问卷管理
export const quizsUrl =`${API_QUIZ_VERSION}/quiz/quizs`
export const quizsCountUrl =`${API_QUIZ_VERSION}/quiz/quizsCounts`

//二级操作
export const articlePostsUrl = `${API_ARTICLE_VERSION}/article/admin/Posts`
export const articlePostsTopicUrl = `${API_ARTICLE_VERSION}/article/admin/Posts/topic`
export const articlePostsEnabledUrl = `${API_ARTICLE_VERSION}/article/admin/Posts/enabled`

//图片上传248
export const uploadUrl = `${API_SUPPORT_VERSION}/support/upload`
export const uploadImgUrl = `/upload/image`

//配置管理
export const topicsCluUrl = `${API_ARTICLE_VERSION}/article/topicsClusterings`
export const articleLinksUrl = `${API_ARTICLE_VERSION}/article/admin/Links`
export const articleSeedsUrl = `${API_ARTICLE_VERSION}/article/admin/Seeds`
export const articleForumCateUrl = `${API_ARTICLE_VERSION}/article/forumCategories`
export const articleDicUrl = `${API_ARTICLE_VERSION}/article/admin/WordDictionary`
export const articleChannelsUrl = `${API_ARTICLE_VERSION}/article/channels`
export const articleEfssUrl = `${API_ARTICLE_VERSION}/article/admin/Efss`
export const articleEqbsUrl = `${API_ARTICLE_VERSION}/article/admin/Eqbs`

//数据分析
export const topicsModelUrl = `${API_ARTICLE_VERSION}/article/topicsModel`
export const ranksUrl = `${API_SUPPORT_VERSION}/support/ranks`
export const ranksScoresUrl = `${API_SUPPORT_VERSION}/support/ranks/scores`
export const eventDicsUrl = `${API_SUPPORT_VERSION}/support/eventDics`
export const eventLogsUrl = `${API_SUPPORT_VERSION}/support/eventLogs`

//爬虫管理
export const quartzJobsUrl = `${API_ARTICLE_VERSION}/article/quartzJobs`
export const spiderStaUrl = `${API_ARTICLE_VERSION}/article/spider/statistics`
export const spiderStaTopicsUrl = `${API_ARTICLE_VERSION}/article/spider/statistics/topicsfetch`
export const spiderConnectionsUrl = `${API_ARTICLE_VERSION}/article/spider/rabbitmq/connections`

//用户中心
export const oauthUrl = `${API_USER_VERSION}/user/oauth`
export const apiUserUrl =  `${API_USER_VERSION}/user/users`
export const userAccountsUrl = `${API_USER_VERSION}/user/userAccounts`
export const userSitesUrl = `${API_USER_VERSION}/user/sites`
export const userGroupsUrl = `${API_USER_VERSION}/user/groups`
export const userRolesUrl = `${API_USER_VERSION}/user/roles`
export const userAuthRolesUrl = `${API_USER_VERSION}/user/authorities/roles`
export const userAuthUrl = `${API_USER_VERSION}/user/authorities`
export const profilesUrl = `${API_USER_VERSION}/user/profiles`
export const profilesAdminUrl = `${API_USER_VERSION}/user/profiles/admin`
export const addressUrl = `${API_USER_VERSION}/user/addresses`
export const addressAdminUrl = `${API_USER_VERSION}/user/addresses/admin`

//商城管理
export const rewardNoticesUrl = `${API_REWARD_VERSION}/reward/admin/notices`
export const rewardCateUrl = `${API_REWARD_VERSION}/reward/admin/categories`

//翻译管理
export const translateTasksUrl = `${API_ARTICLE_VERSION}/article/translateTasks`
export const hopeTranslateUrl = `${API_ARTICLE_VERSION}/article/hopeTranslateExtends`
export const auditTranslateUrl = `${API_ARTICLE_VERSION}/article/moderations`
export const auditTranslateAuditUrl = `${API_ARTICLE_VERSION}/article/moderations/audit`
export const humanTranslatesUrl = `${API_ARTICLE_VERSION}/article/humanTranslates`

//反馈管理
export const articleMesUrl = `${API_ARTICLE_VERSION}/article/admin/Messages`
export const articleFeedbackUrl = `${API_ARTICLE_VERSION}/article/admin/Feedback`
export const articleReportUrl = `${API_ARTICLE_VERSION}/article/users/relationships/topics/report`
export const articleVotesUrl = `${API_ARTICLE_VERSION}/article/admin/Votes`
export const articleVotesOptUrl = `${API_ARTICLE_VERSION}/article/admin/votes/Option`
