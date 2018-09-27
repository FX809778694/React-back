const ROOT = '/app'

//首页
export const INDEX = `${ROOT}/index`

// 常用功能
export const COMMON = `${ROOT}/common`
export const COMMON_RECOMMEND = `${COMMON}/recommend`

// 问卷管理
export const QUESTION = `${ROOT}/question`
export const QUESTION_QUIZS = `${QUESTION}/quizs`
export const QUESTION_QUIZSCOUNT = `${QUESTION}/quizsCount`

// 文章管理
export const ARTICLE = `${ROOT}/article`
export const ARTICLE_BRAND = `${ARTICLE}/brands`
export const ARTICLE_PRODUCT = `${ARTICLE}/products`
export const ARTICLE_NEWS = `${ARTICLE}/news`
export const ARTICLE_EVALUATE = `${ARTICLE}/evaluating`
export const ARTICLE_VIDEO = `${ARTICLE}/videos`
export const ARTICLE_BROADCAST = `${ARTICLE}/broadcast`
export const ARTICLE_TUNE = `${ARTICLE}/tune`

// 配置管理
export const CONFIG = `${ROOT}/config`
export const CONFIG_PRODUPREMOVAL = `${CONFIG}/proDupRemoval`
export const CONFIG_TOPICS = `${CONFIG}/topics`
export const CONFIG_CHANNELS = `${CONFIG}/channels`
export const CONFIG_SEEDS = `${CONFIG}/seeds`
export const CONFIG_LINKS = `${CONFIG}/links`
export const CONFIG_CATEGORYMANAGE = `${CONFIG}/categoryManage`
export const CONFIG_DICTIONARY = `${CONFIG}/dictionary`
export const CONFIG_SEARCH = `${CONFIG}/SearchOptimization`
export const CONFIG_SEARCH_BOOST = `${CONFIG_SEARCH}/BoostFunction`
export const CONFIG_SEARCH_LABELQUERY = `${CONFIG_SEARCH}/LabelQuery`

// 数据分析
export const DATA = `${ROOT}/data`
export const DATA_RANKING = `${DATA}/ranking`
export const DATA_LOGDICTIONARY = `${DATA}/LogDictionary`
export const DATA_OUTLINE = `${DATA}/outline`
export const DATA_TOPICSMODEL = `${DATA}/topicsModel`

// 爬虫管理
export const CRAWLER = `${ROOT}/crawler`
export const CRAWLER_CRAWLERSTA = `${CRAWLER}/crawlerSta`
export const CRAWLER_DISPATCH = `${CRAWLER}/dispatchCenter`
export const CRAWLER_CONNECTIONS = `${CRAWLER}/connections`

// 用户管理
export const USER = `${ROOT}/user`
export const USER_ACCOUNT = `${USER}/account`
export const USER_INFORMATION = `${USER}/info`
export const USER_GROUPS = `${USER}/groups`
export const USER_ROLES = `${USER}/roles`
export const USER_SITES = `${USER}/sites`
export const USER_AUTH = `${USER}/authorities`

// 商城管理
export const REWARD = `${ROOT}/reward`
export const REWARD_NOTICES = `${REWARD}/notices`
export const REWARD_DBCATEGORY = `${REWARD}/dbCategories`
export const REWARD_DBPRODUCT = `${REWARD}/dbProducts`
export const REWARD_PRIZES = `${REWARD}/prizes`
export const REWARD_PARTICIPANT = `${REWARD}/participantRecord`

// 翻译管理
export const TRANSLATE = `${ROOT}/translate`
export const TRANSLATE_TASKS = `${TRANSLATE}/tasks`
export const TRANSLATE_TRANSLATECENTER = `${TRANSLATE}/translateCenter`
export const TRANSLATE_TRANSLATECENTER_ARTICLE = `${TRANSLATE_TRANSLATECENTER}/translateHope`
export const TRANSLATE_TRANSLATECENTER_TRANSLATE = `${TRANSLATE_TRANSLATECENTER}/translateAudit`

// 反馈管理
export const FEEDBACK = `${ROOT}/feedback`
export const FEEDBACK_REPORT = `${FEEDBACK}/report`
export const FEEDBACK_MESSAGE = `${FEEDBACK}/message`
export const FEEDBACK_FEEDBACK = `${FEEDBACK}/feedback`
export const FEEDBACK_VOTES = `${FEEDBACK}/votes`
