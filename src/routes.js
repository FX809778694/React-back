import React from 'react'
import {IndexRedirect, IndexRoute, Route} from "react-router";
import App from './App';
import Page from './component/layout/Page';
import {isExp} from "./utils";
import {jwtSelector, rolesSelector} from './store/user/selectors'
import NotFound from './pages/NotFound';
import Index from './pages/index.js'
import Login from './pages/Login';
import Products from './pages/articles/products/index'
import ProductsDetail from './pages/articles/products/subPage/ProductsDetail'
import ProductsAdd from './pages/articles/products/subPage/ProductsAdd'
import ProductsModify from './pages/articles/products/subPage/ProductsModify'
import SubTable from './pages/articles/SubArticles/SubTable'
import SubDetail from './pages/articles/SubArticles/SubDetail'
import SubAdd from './pages/articles/SubArticles/SubAdd'
import SubModify from './pages/articles/SubArticles/SubModify'
import ProDupRemoval from './pages/config/proDupRemoval/index'
import Brands from './pages/articles/brands/index'
import BrandsDetail from './pages/articles/brands/subPage/BrandsDetail'
import BrandsAdd from './pages/articles/brands/subPage/BrandsAdd'
import BrandsModify from './pages/articles/brands/subPage/BrandsModify'
import News from './pages/articles/news/index'
import NewsAdd from './pages/articles/news/subPage/NewsAdd'
import NewsDetail from './pages/articles/news/subPage/NewsDetail'
import NewsModify from './pages/articles/news/subPage/NewsModify'
import Videos from './pages/articles/videos/index'
import VideosAdd from './pages/articles/videos/subPage/VideosAdd'
import VideosDetail from './pages/articles/videos/subPage/VideosDetail'
import VideosModify from './pages/articles/videos/subPage/VideosModify'
import Evaluating from './pages/articles/evaluating/index'
import EvaluatingAdd from './pages/articles/evaluating/subPage/EvaluatingAdd'
import EvaluatingDetail from './pages/articles/evaluating/subPage/EvaluatingDetail'
import EvaluatingModify from './pages/articles/evaluating/subPage/EvaluatingModify'
import Notices from './pages/reward/notices/index'
import NoticesDetail from './pages/reward/notices/subPage/NoticesDetail'
import NoticesAdd from './pages/reward/notices/subPage/NoticesAdd'
import NoticesModify from './pages/reward/notices/subPage/NoticesModify'
import DbCategories from './pages/reward/dbCategorys/index'
import DbCategoriesDetail from './pages/reward/dbCategorys/subPage/DbCategoriesDetail'
import DbCategoriesAdd from './pages/reward/dbCategorys/subPage/DbCategoriesAdd'
import DbCategoriesModify from './pages/reward/dbCategorys/subPage/DbCategoriesModify'
import DbProducts from './pages/reward/dbProducts/index'
import Prizes from './pages/reward/prizes/index'
import ParticipantRecord from './pages/reward/participantRecord/index'
import User from './pages/user/account/index'
import UserAdd from './pages/user/account/subPage/UserAdd'
import UPasswordModify from './pages/user/account/subPage/U-PasswordModify'
import UStateModify from './pages/user/account/subPage/U-StateModify'
import SubTableData from './pages/user/account/subComponents/SubTableData'
import Groups from './pages/user/groups/index'
import GroupsAdd from './pages/user/groups/subPage/GroupsAdd'
import GroupsModify from './pages/user/groups/subPage/GroupsModify'
import Roles from './pages/user/roles/index'
import RolesAdd from './pages/user/roles/subPage/RolesAdd'
import RolesModify from './pages/user/roles/subPage/RolesModify'
import AuthForRole from './pages/user/roles/subComponents/SubTableData'
import Sites from './pages/user/sites/index'
import SitesAdd from './pages/user/sites/subPage/SitesAdd'
import SitesModify from './pages/user/sites/subPage/SitesModify'
import Authorities from './pages/user/authorities/index'
import AuthoritiesAdd from './pages/user/authorities/subPage/AuthoritiesAdd'
import AuthoritiesModify from './pages/user/authorities/subPage/AuthoritiesModify'
import ExtendInfomation from './pages/user/info/index'
import ExtendInfomationDetail from './pages/user/info/subPage/ExtendInfomationDetail'
import ExtendInfomationModify from './pages/user/info/subPage/ExtendInfomationModify'
import SubExtendTableData from './pages/user/info/subComponents/SubExtendTableData'
import SubExtendDetail from './pages/user/info/subPage/SubExtendDetail'
import SubExtendAdd from './pages/user/info/subPage/SubExtendAdd'
import SubExtendModify from './pages/user/info/subPage/SubExtendModify'
import Seeds from './pages/config/seeds/index'
import SeedsAdd from './pages/config/seeds/subPage/SeedsAdd'
import SeedsDetail from './pages/config/seeds/subPage/SeedsDetail'
import SeedsModify from './pages/config/seeds/subPage/SeedsModify'
import DispatchCenter from './pages/crawler/dispatchCenter/index'
import DispatchAdd from './pages/crawler/dispatchCenter/subPage/DispatchAdd'
import DispatchDetail from './pages/crawler/dispatchCenter/subPage/DispatchDetail'
import DispatchModify from './pages/crawler/dispatchCenter/subPage/DispatchModify'
import CrawlerSta from './pages/crawler/crawlerSta/index'
import DetailTable from './pages/crawler/crawlerSta/subPage/DetailTable'
import Connections from './pages/crawler/connections/index'
import Ranking from './pages/data/ranking/index'
import LogDictionary from './pages/data/logDictionary/index'
import LogDictionaryAdd from './pages/data/logDictionary/subPage/LogDictionaryAdd'
import LogDictionaryDetail from './pages/data/logDictionary/subPage/LogDictionaryDetail'
import LogDictionaryModify from './pages/data/logDictionary/subPage/LogDictionaryModify'
import Outline from './pages/data/outline/index'
import OutlineDetail from './pages/data/outline/subPage/OutlineDetail'
import TopicsModel from './pages/data/topicsModel/index'
import TopicsModelAdd from './pages/data/topicsModel/subPage/TopicsModelAdd'
import TopicsModelDetail from './pages/data/topicsModel/subPage/TopicsModelDetail'
import TopicsModelModify from './pages/data/topicsModel/subPage/TopicsModelModify'
import Topics from './pages/config/topics/index'
import TopicsModify from './pages/config/topics/subPage/ManualTagModify'
import BoostFunction from './pages/config/searchOptimization/boostFunction/index'
import BoostFunctionAdd from './pages/config/searchOptimization/boostFunction/subPage/BoostAdd'
import BoostFunctionDetail from './pages/config/searchOptimization/boostFunction/subPage/BoostDetail'
import BoostFunctionModify from './pages/config/searchOptimization/boostFunction/subPage/BoostModify'
import LabelQuery from './pages/config/searchOptimization/labelQuery/index'
import LabelQueryAdd from './pages/config/searchOptimization/labelQuery/subPage/LabelQueryAdd'
import LabelQueryDetail from './pages/config/searchOptimization/labelQuery/subPage/LabelQueryDetail'
import LabelQueryModify from './pages/config/searchOptimization/labelQuery/subPage/LabelQueryModify'
import TranslateHope from './pages/translate/translateCenter/article/index'
import TranslateHopeDetail from './pages/translate/translateCenter/article/subPage/ArticleDetail'
import TranslateAudit from './pages/translate/translateCenter/translate/index'
import TranslateAuditDetail from './pages/translate/translateCenter/translate/subPage/TranslateDetail'
import Tasks from './pages/translate/tasks/index'
import TasksAdd from './pages/translate/tasks/pages/Add'
import TasksModify from './pages/translate/tasks/pages/Patch'
import TasksDetail from './pages/translate/tasks/pages/Detail'
import Message from './pages/feedback/message/index'
import MessageAdd from './pages/feedback/message/subpage/MessageAdd'
import MessageDetail from './pages/feedback/message/subpage/MessageDetail'
import MessageModify from './pages/feedback/message/subpage/MessageModify'
import Report from './pages/feedback/report/index'
import Feedback from './pages/feedback/feedback/index'
import FeedbackAdd from './pages/feedback/feedback/subpage/FeedbackAdd'
import FeedbackDetail from './pages/feedback/feedback/subpage/FeedbackDetail'
import FeedbackModify from './pages/feedback/feedback/subpage/FeedbackModify'
import ReportDetail from './pages/feedback/report/subpage/ReportDetail'
import LinkConfig from './pages/config/links/index'
import LinksAdd from './pages/config/links/subPage/LinksAdd'
import LinksDetail from './pages/config/links/subPage/LinksDetail'
import LinksModify from './pages/config/links/subPage/LinksModify'
import CategoryManage from './pages/config/categoryManage/index'
import CategoryManageAdd from './pages/config/categoryManage/subPage/CategoryManageAdd'
import CategoryManageDetail from './pages/config/categoryManage/subPage/CategoryManageDetail'
import CategoryManageModify from './pages/config/categoryManage/subPage/CategoryManageModify'
import Dictionary from './pages/config/dictionary/index'
import DictionaryAdd from './pages/config/dictionary/subPage/DictionaryAdd'
import DictionaryDetail from './pages/config/dictionary/subPage/DictionaryDetail'
import DictionaryModify from './pages/config/dictionary/subPage/DictionaryModify'
import Channels from './pages/config/channels/index'
import ChannelsAdd from './pages/config/channels/subPage/ChannelsAdd'
import ChannelsDetail from './pages/config/channels/subPage/ChannelsDetail'
import ChannelsModify from './pages/config/channels/subPage/ChannelsModify'
import Votes from './pages/feedback/votes/index'
import VotesAdd from './pages/feedback/votes/subPage/VotesAdd'
import VotesDetail from './pages/feedback/votes/subPage/VotesDetail'
import VotesModify from './pages/feedback/votes/subPage/VotesModify'
import SubVoteOption from './pages/feedback/votes/subPage/SubVoteOption'
import SubVotesAdd from './pages/feedback/votes/subPage/SubVotesAdd'
import SubVotesDetail from './pages/feedback/votes/subPage/SubVotesDetail'
import SubVotesModify from './pages/feedback/votes/subPage/SubVotesModify'
import Recommend from './pages/common/recommend/index'
import RecommendAdd from './pages/common/recommend/subPages/RecommendAdd'
import RecommendModify from './pages/common/recommend/subPages/RecommendModify'
import Broadcast from './pages/articles/broadcast/index'
import BroadcastAdd from './pages/articles/broadcast/subPage/BroadcastAdd'
import BroadcastDetail from './pages/articles/broadcast/subPage/BroadcastDetail'
import BroadcastModify from './pages/articles/broadcast/subPage/BroadcastModify'
import Tune from './pages/articles/tune/index'
import TuneAdd from './pages/articles/tune/subPage/TunesAdd'
import TuneDetail from './pages/articles/tune/subPage/TunesDetail'
import TuneModify from './pages/articles/tune/subPage/TunesModify'
import Quizs from './pages/question/quizs/index'
import QuizsAdd from './pages/question/quizs/subPage/QuizsAdd'
import QuizsDetail from './pages/question/quizs/subPage/QuizsDetail'
import QuizsModify from './pages/question/quizs/subPage/QuizsModify'
import QuizsCount from './pages/question/quizsCount/index'
import QuizsCountAdd from './pages/question/quizsCount/subPage/QuizsCountAdd'
import QuizsCountDetail from './pages/question/quizsCount/subPage/QuizsCountDetail'
import QuizsCountModify from './pages/question/quizsCount/subPage/QuizsCountModify'

export default (store) => {
  const requireAuth = (nextState, replace) => {
    const token = jwtSelector(store.getState())
    const roles = rolesSelector(store.getState())
    if (!token || !isExp(token)) {
      replace('/login')
    }else if(token && !roles.includes('ROLE_ADMIN')){//如果用户没有后台管理权限，则跳回官网首页
      window.location.href = 'http://www.mifanxing.com' // TODO 跳转地址如何配置？
    }
  }
  const redirectAuth = (nextState, replace) => {
    const token = jwtSelector(store.getState())
    if (token && isExp(token)) {
      replace('/')
    }
  }

  return (
    <Route path={'/'} components={Page}>
      <IndexRedirect to="/app/index"/>
      <Route path={'app'} component={App} onEnter={requireAuth}>
        <Route path={'index'} component={Index} breadcrumbName="首页"/>

        <Route path={'common'} breadcrumbName="常用功能">
          <IndexRoute component={Recommend}/>
          <Route path={'recommend'} breadcrumbName="周刊">
            <IndexRoute component={Recommend} breadcrumbName="周刊列表"/>
            <Route path={'add'} component={RecommendAdd} breadcrumbName="周刊录入"/>
            <Route path={'modify/:id'} component={RecommendModify} breadcrumbName="周刊修改"/>
          </Route>
        </Route>

        <Route path={'question'} breadcrumbName="问卷管理">
          <IndexRoute component={Quizs}/>
          <Route path={'quizs'} breadcrumbName="问卷">
            <IndexRoute component={Quizs} breadcrumbName="问卷列表"/>
            <Route path={'add'} component={QuizsAdd} breadcrumbName="问卷录入"/>
            <Route path={'id/:id'} component={QuizsDetail} breadcrumbName="问卷详情"/>
            <Route path={'modify/:id'} component={QuizsModify} breadcrumbName="问卷修改"/>
          </Route>
          <Route path={'quizsCount'} breadcrumbName="问卷统计">
            <IndexRoute component={QuizsCount} breadcrumbName="问卷统计列表"/>
            <Route path={'add'} component={QuizsCountAdd} breadcrumbName="问卷统计录入"/>
            <Route path={'id/:id'} component={QuizsCountDetail} breadcrumbName="问卷统计详情"/>
            <Route path={'modify/:id'} component={QuizsCountModify} breadcrumbName="问卷统计修改"/>
          </Route>
        </Route>

        <Route path={'article'} breadcrumbName="文章管理">
          <IndexRoute component={Brands}/>
          <Route path={'brands'} breadcrumbName="品牌中心">
            <IndexRoute component={Brands} breadcrumbName="品牌列表"/>
            <Route path={':id/subTable'} breadcrumbName="品牌列表">
              <IndexRoute component={SubTable} breadcrumbName="品牌二级列表"/>
              <Route path={'id/:id'} component={SubDetail} breadcrumbName="品牌二级详情"/>
              <Route path={'add'} component={SubAdd} breadcrumbName="品牌二级添加"/>
              <Route path={'subModify/:id'} component={SubModify} breadcrumbName="品牌二级修改"/>
            </Route>
            <Route path={'add'} component={BrandsAdd} breadcrumbName="品牌添加"/>
            <Route path={'id/:id'} component={BrandsDetail} breadcrumbName="品牌详情"/>
            <Route path={'modify/:id'} component={BrandsModify} breadcrumbName="品牌修改"/>
          </Route>
          <Route path={'products'} breadcrumbName="产品中心">
            <IndexRoute component={Products} breadcrumbName="产品列表"/>
            <Route path={':id/subTable'} breadcrumbName="产品列表">
              <IndexRoute component={SubTable} breadcrumbName="产品二级列表"/>
              <Route path={'id/:id'} component={SubDetail} breadcrumbName="产品二级详情"/>
              <Route path={'add'} component={SubAdd} breadcrumbName="产品二级添加"/>
              <Route path={'subModify/:id'} component={SubModify} breadcrumbName="产品二级修改"/>
            </Route>
            <Route path={'add'} component={ProductsAdd} breadcrumbName="产品添加"/>
            <Route path={'id/:id'} component={ProductsDetail} breadcrumbName="产品详情"/>
            <Route path={'modify/:id'} component={ProductsModify} breadcrumbName="产品修改"/>
          </Route>
          <Route path={'news'} breadcrumbName="新闻中心">
            <IndexRoute component={News} breadcrumbName="新闻列表"/>
            <Route path={':id/subTable'} breadcrumbName="新闻列表">
              <IndexRoute component={SubTable} breadcrumbName="新闻二级列表"/>
              <Route path={'id/:id'} component={SubDetail} breadcrumbName="新闻二级详情"/>
              <Route path={'add'} component={SubAdd} breadcrumbName="新闻二级添加"/>
              <Route path={'subModify/:id'} component={SubModify} breadcrumbName="新闻二级修改"/>
            </Route>
            <Route path={'add'} component={NewsAdd} breadcrumbName="新闻添加"/>
            <Route path={'id/:id'} component={NewsDetail} breadcrumbName="新闻详情"/>
            <Route path={'modify/:id'} component={NewsModify} breadcrumbName="新闻修改"/>
          </Route>
          <Route path={'evaluating'} breadcrumbName="评测中心">
            <IndexRoute component={Evaluating} breadcrumbName="评测列表"/>
            <Route path={':id/subTable'} breadcrumbName="评测列表">
              <IndexRoute component={SubTable} breadcrumbName="评测二级列表"/>
              <Route path={'id/:id'} component={SubDetail} breadcrumbName="评测二级详情"/>
              <Route path={'add'} component={SubAdd} breadcrumbName="评测二级添加"/>
              <Route path={'subModify/:id'} component={SubModify} breadcrumbName="评测二级修改"/>
            </Route>
            <Route path={'add'} component={EvaluatingAdd} breadcrumbName="添加评测"/>
            <Route path={'id/:id'} component={EvaluatingDetail} breadcrumbName="评测详情"/>
            <Route path={'modify/:id'} component={EvaluatingModify} breadcrumbName="修改评测"/>
          </Route>
          <Route path={'videos'} breadcrumbName="视频中心">
            <IndexRoute component={Videos} breadcrumbName="视频列表"/>
            <Route path={':id/subTable'} breadcrumbName="视频列表">
              <IndexRoute component={SubTable} breadcrumbName="视频二级列表"/>
              <Route path={'id/:id'} component={SubDetail} breadcrumbName="视频二级详情"/>
              <Route path={'add'} component={SubAdd} breadcrumbName="视频二级添加"/>
              <Route path={'subModify/:id'} component={SubModify} breadcrumbName="视频二级修改"/>
            </Route>
            <Route path={'add'} component={VideosAdd} breadcrumbName="视频添加"/>
            <Route path={'id/:id'} component={VideosDetail} breadcrumbName="视频详情"/>
            <Route path={'modify/:id'} component={VideosModify} breadcrumbName="视频修改"/>
          </Route>
          <Route path={'broadcast'} breadcrumbName="直播中心">
            <IndexRoute component={Broadcast} breadcrumbName="直播列表"/>
            <Route path={':id/subTable'} breadcrumbName="直播列表">
              <IndexRoute component={SubTable} breadcrumbName="直播二级列表"/>
              <Route path={'id/:id'} component={SubDetail} breadcrumbName="直播二级详情"/>
              <Route path={'add'} component={SubAdd} breadcrumbName="直播二级添加"/>
              <Route path={'subModify/:id'} component={SubModify} breadcrumbName="直播二级修改"/>
            </Route>
            <Route path={'add'} component={BroadcastAdd} breadcrumbName="直播添加"/>
            <Route path={'id/:id'} component={BroadcastDetail} breadcrumbName="直播详情"/>
            <Route path={'modify/:id'} component={BroadcastModify} breadcrumbName="直播修改"/>
          </Route>
          <Route path={'tune'} breadcrumbName="美频中心">
            <IndexRoute component={Tune} breadcrumbName="美频列表"/>
            <Route path={':id/subTable'} breadcrumbName="美频列表">
              <IndexRoute component={SubTable} breadcrumbName="美频二级列表"/>
              <Route path={'id/:id'} component={SubDetail} breadcrumbName="美频二级详情"/>
              <Route path={'add'} component={SubAdd} breadcrumbName="美频二级添加"/>
              <Route path={'subModify/:id'} component={SubModify} breadcrumbName="美频二级修改"/>
            </Route>
            <Route path={'add'} component={TuneAdd} breadcrumbName="美频添加"/>
            <Route path={'id/:id'} component={TuneDetail} breadcrumbName="美频详情"/>
            <Route path={'modify/:id'} component={TuneModify} breadcrumbName="美频修改"/>
          </Route>
        </Route>

        <Route path={'config'} breadcrumbName="配置管理">
          <IndexRoute component={ProDupRemoval}/>
          <Route path={'proDupRemoval'} component={ProDupRemoval} breadcrumbName="产品去重"/>
          <Route path={'topics'} breadcrumbName="人工辅助">
            <IndexRoute component={Topics} breadcrumbName="主题列表"/>
            <Route path={'modify/:id'} component={TopicsModify} breadcrumbName="主题修改"/>
          </Route>
          <Route path={'channels'} breadcrumbName="频道管理">
            <IndexRoute component={Channels} breadcrumbName="频道管理列表"/>
            <Route path={'add'} component={ChannelsAdd} breadcrumbName="频道添加"/>
            <Route path={'id/:id'} component={ChannelsDetail} breadcrumbName="频道详情"/>
            <Route path={'modify/:id'} component={ChannelsModify} breadcrumbName="频道修改"/>
          </Route>
          <Route path={'seeds'} breadcrumbName="种子网站">
            <IndexRoute component={Seeds} breadcrumbName="种子网站列表"/>
            <Route path={'add'} component={SeedsAdd} breadcrumbName="种子网站添加"/>
            <Route path={'id/:id'} component={SeedsDetail} breadcrumbName="种子网站详情"/>
            <Route path={'modify/:id'} component={SeedsModify} breadcrumbName="种子网站修改"/>
          </Route>
          <Route path={'links'} breadcrumbName="链接管理">
            <IndexRoute component={LinkConfig} breadcrumbName="链接管理列表"/>
            <Route path={'add'} component={LinksAdd} breadcrumbName="链接管理添加"/>
            <Route path={'id/:id'} component={LinksDetail} breadcrumbName="链接管理详情"/>
            <Route path={'modify/:id'} component={LinksModify} breadcrumbName="链接管理修改"/>
          </Route>
          <Route path={'categoryManage'} breadcrumbName="类别管理">
            <IndexRoute component={CategoryManage} breadcrumbName="类别管理列表"/>
            <Route path={'add'} component={CategoryManageAdd} breadcrumbName="类别管理添加"/>
            <Route path={'id/:id'} component={CategoryManageDetail} breadcrumbName="类别管理详情"/>
            <Route path={'modify/:id'} component={CategoryManageModify} breadcrumbName="类别管理修改"/>
          </Route>
          <Route path={'dictionary'} breadcrumbName="双语词典">
            <IndexRoute component={Dictionary} breadcrumbName="双语词典列表"/>
            <Route path={'add'} component={DictionaryAdd} breadcrumbName="双语词典添加"/>
            <Route path={'id/:id'} component={DictionaryDetail} breadcrumbName="双语词典详情"/>
            <Route path={'modify/:id'} component={DictionaryModify} breadcrumbName="双语词典修改"/>
          </Route>
          <Route path={'SearchOptimization'} breadcrumbName="搜索优化">
            <IndexRoute component={BoostFunction} breadcrumbName="函数列表"/>
            <Route path={'BoostFunction'} breadcrumbName="助推函数">
              <IndexRoute component={BoostFunction} breadcrumbName="函数列表"/>
              <Route path={'add'} component={BoostFunctionAdd} breadcrumbName="添加助推函数"/>
              <Route path={'id/:id'} component={BoostFunctionDetail} breadcrumbName="助推函数详情"/>
              <Route path={'modify/:id'} component={BoostFunctionModify} breadcrumbName="字典修改"/>
            </Route>
            <Route path={'LabelQuery'} breadcrumbName="标签查询">
              <IndexRoute component={LabelQuery} breadcrumbName="标签查询列表"/>
              <Route path={'add'} component={LabelQueryAdd} breadcrumbName="添加标签查询"/>
              <Route path={'id/:id'} component={LabelQueryDetail} breadcrumbName="标签查询详情"/>
              <Route path={'modify/:id'} component={LabelQueryModify} breadcrumbName="标签查询修改"/>
            </Route>
          </Route>
        </Route>

        <Route path={'data'} breadcrumbName="数据分析">
          <IndexRoute component={Ranking}/>
          <Route path={'ranking'} component={Ranking} breadcrumbName="点击排行"/>
          <Route path={'LogDictionary'} breadcrumbName="日志字典">
            <IndexRoute component={LogDictionary} breadcrumbName="字典列表"/>
            <Route path={'add'} component={LogDictionaryAdd} breadcrumbName="添加字典"/>
            <Route path={'id/:id'} component={LogDictionaryDetail} breadcrumbName="字典详情"/>
            <Route path={'modify/:id'} component={LogDictionaryModify} breadcrumbName="字典修改"/>
          </Route>
          <Route path={'outline'} breadcrumbName="概要统计">
            <IndexRoute component={Outline} breadcrumbName="概要统计列表"/>
            <Route path={'id/:id'} component={OutlineDetail} breadcrumbName="概要统计详情"/>
          </Route>
          <Route path={'topicsModel'} breadcrumbName="分类模型">
            <IndexRoute component={TopicsModel} breadcrumbName="模型列表"/>
            <Route path={'add'} component={TopicsModelAdd} breadcrumbName="添加模型"/>
            <Route path={'id/:id'} component={TopicsModelDetail} breadcrumbName="模型详情"/>
            <Route path={'modify/:id'} component={TopicsModelModify} breadcrumbName="模型修改"/>
          </Route>
        </Route>

        <Route path={'crawler'} breadcrumbName="爬虫管理">
          <IndexRoute component={CrawlerSta}/>
          <Route path={'crawlerSta'} breadcrumbName="结果统计">
            <IndexRoute component={CrawlerSta} breadcrumbName="结果统计列表"/>
            <Route path={'id/:id'} component={DetailTable} breadcrumbName="结果统计详情"/>
          </Route>
          <Route path={'dispatchCenter'} breadcrumbName="调度中心">
            <IndexRoute component={DispatchCenter} breadcrumbName="调度任务列表"/>
            <Route path={'add'} component={DispatchAdd} breadcrumbName="调度任务添加"/>
            <Route path={'id/:id'} component={DispatchDetail} breadcrumbName="调度任务详情"/>
            <Route path={'modify/:id'} component={DispatchModify} breadcrumbName="调度任务修改"/>
          </Route>
          <Route path={'connections'} breadcrumbName="连接状态">
            <IndexRoute component={Connections} breadcrumbName="连接状态列表"/>
          </Route>
        </Route>

        <Route path={'user'} breadcrumbName="用户管理">
          <Route path={'account'} breadcrumbName="账户">
            <IndexRoute component={User} breadcrumbName="用户列表"/>
            <Route path={':id/subTable'} breadcrumbName="账户列表">
              <IndexRoute component={SubTableData} breadcrumbName="用户二级列表"/>
            </Route>
            <Route path={'add'} component={UserAdd} breadcrumbName="用户添加"/>
            <Route path={'modifyPassword/:id'} component={UPasswordModify} breadcrumbName="用户密码修改"/>
            <Route path={'modifyState/:id'} component={UStateModify} breadcrumbName="用户状态修改"/>
          </Route>
          <Route path={'info'} breadcrumbName="信息">
            <IndexRoute component={ExtendInfomation} breadcrumbName="信息列表"/>
            <Route path={':id/subTable'} breadcrumbName="地址列表">
              <IndexRoute component={SubExtendTableData} breadcrumbName="扩展二级列表"/>
              <Route path={'id/:id'} component={SubExtendDetail} breadcrumbName="扩展二级详情"/>
              <Route path={'add'} component={SubExtendAdd} breadcrumbName="视频二级添加"/>
              <Route path={'subModify/:id'} component={SubExtendModify} breadcrumbName="视频二级修改"/>
            </Route>
            <Route path={'id/:id'} component={ExtendInfomationDetail} breadcrumbName="扩展信息详情"/>
            <Route path={'modify/:id'} component={ExtendInfomationModify} breadcrumbName="扩展信息修改"/>
          </Route>
          <Route path={'groups'} breadcrumbName="群组">
            <IndexRoute component={Groups} breadcrumbName="群组列表"/>
            <Route path={'add'} component={GroupsAdd} breadcrumbName="群组添加"/>
            <Route path={'modify/:id'} component={GroupsModify} breadcrumbName="群组修改"/>
          </Route>
          <Route path={'roles'} breadcrumbName="角色">
            <IndexRoute component={Roles} breadcrumbName="角色列表"/>
            <Route path={'add'} component={RolesAdd} breadcrumbName="角色添加"/>
            <Route path={'modify/:id'} component={RolesModify} breadcrumbName="角色修改"/>
            <Route path={'auth/:id'} component={AuthForRole} breadcrumbName="角色权限列表"/>
          </Route>
          <Route path={'sites'} breadcrumbName="站点">
            <IndexRoute component={Sites} breadcrumbName="站点列表"/>
            <Route path={'add'} component={SitesAdd} breadcrumbName="站点添加"/>
            <Route path={'modify/:id'} component={SitesModify} breadcrumbName="站点修改"/>
          </Route>
          <Route path={'authorities'} breadcrumbName="权限">
            <IndexRoute component={Authorities} breadcrumbName="权限列表"/>
            <Route path={'add'} component={AuthoritiesAdd} breadcrumbName="权限添加"/>
            <Route path={'modify/:id'} component={AuthoritiesModify} breadcrumbName="权限修改"/>
          </Route>
        </Route>

        <Route path={'reward'} breadcrumbName="商城管理">
          <IndexRoute component={Notices} breadcrumbName="系统公告列表"/>
          <Route path={'notices'} breadcrumbName="系统公告">
            <IndexRoute component={Notices} breadcrumbName="系统公告列表"/>
            <Route path={'add'} component={NoticesAdd} breadcrumbName="系统公告添加"/>
            <Route path={'id/:id'} component={NoticesDetail} breadcrumbName="系统公告详情"/>
            <Route path={'modify/:id'} component={NoticesModify} breadcrumbName="系统公告修改"/>
          </Route>
          <Route path={'dbCategories'} breadcrumbName="夺宝类别">
            <IndexRoute component={DbCategories} breadcrumbName="夺宝类别列表"/>
            <Route path={'add'} component={DbCategoriesAdd} breadcrumbName="夺宝类别添加"/>
            <Route path={'id/:id'} component={DbCategoriesDetail} breadcrumbName="夺宝类别详情"/>
            <Route path={'modify/:id'} component={DbCategoriesModify} breadcrumbName="夺宝类别修改"/>
          </Route>
          <Route path={'dbProducts'} breadcrumbName="商品信息">
            <IndexRoute component={DbProducts} breadcrumbName="商品信息列表"/>
          </Route>
          <Route path={'prizes'} breadcrumbName="奖项状态">
            <IndexRoute component={Prizes} breadcrumbName="奖项状态列表"/>
          </Route>
          <Route path={'participantRecord'} breadcrumbName="参与记录">
            <IndexRoute component={ParticipantRecord} breadcrumbName="参与记录列表"/>
          </Route>
        </Route>

        <Route path={'translate'} breadcrumbName="翻译管理">
          <Route path="tasks" breadcrumbName="任务中心">
            <IndexRoute component={Tasks} breadcrumbName="任务列表"/>
            <Route path="add" component={TasksAdd} breadcrumbName="任务添加"/>
            <Route path="id/:id" component={TasksDetail} breadcrumbName="任务详情"/>
            <Route path="modify/:id" component={TasksModify} breadcrumbName="任务修改"/>
          </Route>
          <Route path={'translateCenter'} breadcrumbName="精翻中心">
            <Route path={'translateHope'} breadcrumbName="希望精翻">
              <IndexRoute component={TranslateHope} breadcrumbName="希望精翻列表"/>
              <Route path={'id/:id'} component={TranslateHopeDetail} breadcrumbName="希望精翻详情"/>
            </Route>
            <Route path={'translateAudit'} breadcrumbName="审核精翻">
              <IndexRoute component={TranslateAudit} breadcrumbName="审核精翻列表"/>
              <Route path={'id/:id'} component={TranslateAuditDetail} breadcrumbName="审核精翻详情"/>
            </Route>
          </Route>
        </Route>

        <Route path={'feedback'} breadcrumbName="反馈中心">
          <Route path={'report'} breadcrumbName="举报信息管理">
            <IndexRoute component={Report} breadcrumbName="举报信息"/>
            <Route path={'id/:id'} component={ReportDetail} breadcrumbName="举报详情"/>
          </Route>
          <Route path={'message'} breadcrumbName="留言管理列表">
            <IndexRoute component={Message} breadcrumbName="留言管理"/>
            <Route path={'add'} component={MessageAdd} breadcrumbName="留言添加"/>
            <Route path={'id/:id'} component={MessageDetail} breadcrumbName="留言详情"/>
            <Route path={'modify/:id'} component={MessageModify} breadcrumbName="留言修改"/>
          </Route>
          <Route path={'feedback'} breadcrumbName="反馈管理列表">
            <IndexRoute component={Feedback} breadcrumbName="反馈管理"/>
            <Route path={'add'} component={FeedbackAdd} breadcrumbName="反馈添加"/>
            <Route path={'id/:id'} component={FeedbackDetail} breadcrumbName="反馈详情"/>
            <Route path={'modify/:id'} component={FeedbackModify} breadcrumbName="反馈修改"/>
          </Route>
          <Route path={'votes'} breadcrumbName="投票管理">
            <IndexRoute component={Votes} breadcrumbName="投票管理列表"/>
            <Route path={':id/subTable'} breadcrumbName="投票管理列表">
              <IndexRoute component={SubVoteOption} breadcrumbName="投票选项"/>
              <Route path={'id/:id'} component={SubVotesDetail} breadcrumbName="投票选项详情"/>
              <Route path={'add'} component={SubVotesAdd} breadcrumbName="添加投票选项"/>
              <Route path={'subModify/:id'} component={SubVotesModify} breadcrumbName="修改投票选项"/>
            </Route>
            <Route path={'add'} component={VotesAdd} breadcrumbName="投票信息添加"/>
            <Route path={'id/:id'} component={VotesDetail} breadcrumbName="投票信息详情"/>
            <Route path={'modify/:id'} component={VotesModify} breadcrumbName="投票信息修改"/>
          </Route>
        </Route>
      </Route>
      <Route path={'login'} components={Login} onEnter={redirectAuth} />
      <Route path={'404'} component={NotFound} />
      <Route path={'*'} component={NotFound} />
    </Route>
  )
}
