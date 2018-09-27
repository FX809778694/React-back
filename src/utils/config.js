export const PHONE_REGEXP = /^(13[0-9]|14(5|7|9)|15(0|1|2|3|5|6|7|8|9)|17[0-9]|18[0-9])\d{8}$/i

export const AUTH_TOKEN_KEY = 'access_token'
export const API_TOKEN = 'API_TOKEN'
export const USER_INFO =  'USER_INFO'
export const CACHE_LAST_USE_LOGIN_PHONE =  'CACHE_LAST_USE_LOGIN_PHONE'

export const FRONT_DOMAIN = 'http://www.mifanxing.com'
export const HOST = '/api/'
export const UPLOAD_SERVER = 'http://192.168.1.248'
//生产环境上传API用'api/admin/Attachments/upload'，开发环境'admin/Attachments/upload'
export const UPLOAD_HOST = '/api/article/admin/Attachments/upload'
//--- 测试环境用 / ,生产环境用 .mifanxing.com ---
//因为不用二级域名，所以还是不用.mifanxing.com
export const COOKIE_DOMAIN = '' //process.env.NODE_ENV === 'production' ? '.mifanxing.com' : ''

export const WEEKLY_RECOMMEND_CHANNEL_ID = 86
export const WEEKLY_RECOMMEND_SEED_ID = 112

export const ARTICLE_TYPE = [
  { id: 1, type: '1', name: '产品'},
  { id: 2, type: '2', name: '品牌'},
  { id: 3, type: '3', name: '新闻'},
  { id: 4, type: '4', name: '评测'},
  { id: 5, type: '5', name: '视频'},
  { id: 6, type: '6', name: '直播'},
  { id: 7, type: '7', name: '美频'}
]

export const TOPIC_TUNE_TYPE = [
  { id: 0, name:"未知" , type: '0' },
  { id: 2, name:"技术" , type: '2' },
  { id: 3, name:"新闻" , type: '3' },
  { id: 7, name:"视频" , type: '7' },
]

export const API_ARTICLE_VERSION =  ''
export const API_SUPPORT_VERSION =  ''
export const API_REWARD_VERSION =  ''
export const API_QUIZ_VERSION =  ''
export const API_USER_VERSION =  ''
