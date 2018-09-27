import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux'
import {reducer as form} from 'redux-form'

import articles from './articles/reducers'
import configs from './configs/reducers'
import translate from './translate/reducers'
import questions from './question/reducers'
import dataCenter from './data/reducers'
/*---------------------------- 旧的 ----------------------------*/
import notices from './notices/reducers/NoticesData'
import notice from './notices/reducers/NoticesDetail'
import dbCategories from './dbCategory/reducers/DbCategoryData'
import dbCategory from './dbCategory/reducers/DbCategoryDetail'
import users from './userCenter/user/reducers/UserData'
import userDetail from './userCenter/user/reducers/UserDetail'
import sites from './userCenter/sites/reducers/SitesData'
import site from './userCenter/sites/reducers/SitesDetail'
import groups from './userCenter/groups/reducers/GroupsData'
import group from './userCenter/groups/reducers/GroupsDetail'
import roles from './userCenter/roles/reducers/RolesData'
import role from './userCenter/roles/reducers/RolesDetail'
import authForRole from './userCenter/roles/reducers/Role_AuthData'
import roleForUser from './userCenter/user/reducers/RoleForUser'
import groupForUser from './userCenter/user/reducers/GroupForUser'
import roleForGroup from './userCenter/groups/reducers/RoleForGroup'
import dispatchData from './dispatchCenter/reducers/dispatchData'
import dispatchDetail from './dispatchCenter/reducers/dispatchDetail'
import messageData from './feedbackCenter/Message/reducers/MessageData'
import messageDetail from './feedbackCenter/Message/reducers/MessageDetail'
import feedbackData from './feedbackCenter/Feedback/reducers/FeedbackData'
import feedbackDetail from './feedbackCenter/Feedback/reducers/FeedbackDetail'
import reportData from './feedbackCenter/Report/reducers/ReportData'
import reportDetail from './feedbackCenter/Report/reducers/ReportDetail'
import crawlerStaData from './crawlerSta/reducers/CrawlerStaData'
import crawlerStaDetail from './crawlerSta/reducers/CrawlerStaDetail'
import connections from './connections/reducers/ConnectionsData'
import authorities from './userCenter/authorities/reducers/AuthoritiesData'
import authority from './userCenter/authorities/reducers/AuthoritiesDetail'
import votes from './votes/reducers/VotesData'
import vote from './votes/reducers/VotesDetail'
import votesOptions from './votes/reducers/VotesOptionsData'
import votesOption from './votes/reducers/VotesOptionsDetail'
import channelSelect from './SeedIdSelected/reducers/ChannelsSelected'
import seedSelect from './SeedIdSelected/reducers/SeedsSelected'
import creatorSelect from './SeedIdSelected/reducers/CreatorSelected'
import userReducer, {login} from './user/reducer';
import extendInfomationData from './extendInfomation/reducers/ExtendInfomationData'
import extendInfomationDetail from './extendInfomation/reducers/ExtendInfomationDetail'

export default combineReducers( {
  user: userReducer,
  login,
  form,
  routing,
  articles,
  configs,
  translate,
  questions,
  dataCenter,
  /*---------------------------- 旧的 ----------------------------*/
  notices,
  notice,
  dbCategories,
  dbCategory,
  users,
  userDetail,
  sites,
  site,
  groups,
  group,
  roles,
  role,
  authForRole,
  roleForUser,
  groupForUser,
  roleForGroup,
  dispatchData,
  dispatchDetail,
  messageData,
  messageDetail,
  feedbackData,
  feedbackDetail,
  reportData,
  reportDetail,
  crawlerStaData,
  crawlerStaDetail,
  connections,
  authorities,
  authority,
  votes,
  vote,
  votesOptions,
  votesOption,
  channelSelect,
  seedSelect,
  creatorSelect,
  extendInfomationData,
  extendInfomationDetail,
});
