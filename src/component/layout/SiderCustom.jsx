import React, {Component} from 'react';
import {Icon, Layout, Menu} from 'antd';
import {Link} from 'react-router';
import * as ROUTE from '../../utils/routePath'

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

class SiderCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      openKeys: [],
      selectedKey: ''
    }
    this.menuClick = this.menuClick.bind(this)
  }

  componentDidMount() {
    this.setMenuOpen(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onCollapse(nextProps.collapsed);
    this.setMenuOpen(nextProps)
  }

  setMenuOpen = props => {
    const {path} = props;
    if (path.match(/.*\/add/)) {
      const str = path.substr(0, path.lastIndexOf('/'))
      this.setState({
        selectedKey: str,
        openKeys: [str.substr(0, str.lastIndexOf('/'))],
      })
    } else if (path.match(/.*\/modify.*/) || path.match(/.*\/id\/.*/)) {
      const str0 = path.substr(0, path.lastIndexOf('/'))
      const str = str0.substr(0, str0.lastIndexOf('/'))
      this.setState({
        selectedKey: str,
        openKeys: [str.substr(0, str.lastIndexOf('/'))],
      })
    } else {
      this.setState({
        selectedKey: path,
        openKeys: [path.substr(0, path.lastIndexOf('/'))],
      })
    }

    //判断所有二级操作页面
    if(path.match(/^.*\/subTable.*$/)){
      const selectedKey = []
      const pathArr = path.split('/')
      const index = pathArr.findIndex(i => i === 'subTable')
      for(let i = index-2; i > 0; i--){
        selectedKey.unshift('/' + pathArr[i])
      }
      this.setState({ selectedKey: selectedKey.join('') })
      selectedKey.pop()
      this.setState({ openKeys: [selectedKey.join('')] })
    }

    //刷新时判断并完成搜索优化的菜单展开情况
    if (path.match(/^\/app\/config\/.*$/)) {
      let openKeysArr = [ROUTE.CONFIG]
      if (path.match(/\/app\/config\/SearchOptimization/)) {
        openKeysArr.push(ROUTE.CONFIG_SEARCH)
      }
      this.setState({
        openKeys: openKeysArr
      })
    }
    //刷新时判断并完成精翻中心的菜单展开情况
    if (path.match(/^\/app\/translate\/.*$/)) {
      let openKeysArr = [ROUTE.TRANSLATE]
      if (path.match(/\/app\/translate\/translateCenter/)) {
        openKeysArr.push(ROUTE.TRANSLATE_TRANSLATECENTER)
      }
      this.setState({
        openKeys: openKeysArr
      })
    }
  };

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
    });
  };

  MenuItemKeys = [ROUTE.INDEX]
  rootSubmenuKeys = [
    ROUTE.COMMON,
    ROUTE.ARTICLE,
    ROUTE.CONFIG,
    ROUTE.DATA,
    ROUTE.CRAWLER,
    ROUTE.USER,
    ROUTE.REWARD,
    ROUTE.TRANSLATE,
    ROUTE.FEEDBACK
  ];
  menuClick({key, keyPath}) {
    this.MenuItemKeys.indexOf(key) !== -1 &&
    this.setState({
      openKeys: [],
      selectedKey: keyPath[0]
    })
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({openKeys});
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    return (
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsed={this.props.collapsed}
      >
        <div className="logo">
          {this.props.collapsed ? 'MF' : 'MUSICFANS'}
        </div>
        <Menu
          onClick={this.menuClick}
          mode='inline'
          theme="dark"
          selectedKeys={[this.state.selectedKey]}//当前选中的MenuItem
          defaultSelectedKeys={[ROUTE.INDEX]}
          openKeys={this.state.openKeys}//当前展开的subMenu
          onOpenChange={this.onOpenChange}
          inlineCollapsed={this.props.collapsed}
        >
          <Menu.Item key={ROUTE.INDEX}>
            <Link to={ROUTE.INDEX}><Icon type="home"/><span className="nav-text">首页</span></Link>
          </Menu.Item>

          <SubMenu key={ROUTE.COMMON}
                   title={<span><Icon type="appstore-o" /><span className="nav-text">常用功能</span></span>}>
            <Menu.Item key={ROUTE.COMMON_RECOMMEND}>
              <Link to={ROUTE.COMMON_RECOMMEND}>周刊录入</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key={ROUTE.QUESTION}
                   title={<span><Icon type="file-text" /><span className="nav-text">问卷管理</span></span>}>
            <Menu.Item key={ROUTE.QUESTION_QUIZS}>
              <Link to={ROUTE.QUESTION_QUIZS}>问卷管理</Link>
            </Menu.Item><Menu.Item key={ROUTE.QUESTION_QUIZSCOUNT}>
              <Link to={ROUTE.QUESTION_QUIZSCOUNT}>问卷统计</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key={ROUTE.ARTICLE}
                   title={<span><Icon type="book"/><span className="nav-text">文章管理</span></span>}>
            <Menu.Item key={ROUTE.ARTICLE_BRAND}>
              <Link to={ROUTE.ARTICLE_BRAND}>品牌中心</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.ARTICLE_PRODUCT}>
              <Link to={ROUTE.ARTICLE_PRODUCT}>产品中心</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.ARTICLE_NEWS}>
              <Link to={ROUTE.ARTICLE_NEWS}>新闻中心</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.ARTICLE_EVALUATE}>
              <Link to={ROUTE.ARTICLE_EVALUATE}>评测中心</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.ARTICLE_VIDEO}>
              <Link to={ROUTE.ARTICLE_VIDEO}>视频中心</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.ARTICLE_BROADCAST}>
              <Link to={ROUTE.ARTICLE_BROADCAST}>直播中心</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.ARTICLE_TUNE}>
              <Link to={ROUTE.ARTICLE_TUNE}>美频中心</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key={ROUTE.CONFIG}
                   title={<span><Icon type="setting"/><span className="nav-text">配置管理</span></span>}>
            <Menu.Item key={ROUTE.CONFIG_PRODUPREMOVAL}>
              <Link to={ROUTE.CONFIG_PRODUPREMOVAL}>产品去重</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.CONFIG_TOPICS}>
              <Link to={ROUTE.CONFIG_TOPICS}>人工辅助</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.CONFIG_CHANNELS}>
              <Link to={ROUTE.CONFIG_CHANNELS}>频道管理</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.CONFIG_SEEDS}>
              <Link to={ROUTE.CONFIG_SEEDS}>种子网站</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.CONFIG_LINKS}>
              <Link to={ROUTE.CONFIG_LINKS}>链接管理</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.CONFIG_CATEGORYMANAGE}>
              <Link to={ROUTE.CONFIG_CATEGORYMANAGE}>类别管理</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.CONFIG_DICTIONARY}>
              <Link to={ROUTE.CONFIG_DICTIONARY}>双语词典</Link>
            </Menu.Item>
            <SubMenu key={ROUTE.CONFIG_SEARCH} title={<span>搜索优化</span>}>
              <Menu.Item key={ROUTE.CONFIG_SEARCH_BOOST}>
                <Link to={ROUTE.CONFIG_SEARCH_BOOST}>助推函数</Link>
              </Menu.Item>
              <Menu.Item key={ROUTE.CONFIG_SEARCH_LABELQUERY}>
                <Link to={ROUTE.CONFIG_SEARCH_LABELQUERY}>标签查询</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key={ROUTE.DATA}
                   title={<span><Icon type="database"/><span className="nav-text">数据分析</span></span>}>
            <Menu.Item key={ROUTE.DATA_RANKING}>
              <Link to={ROUTE.DATA_RANKING}>点击排行</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.DATA_LOGDICTIONARY}>
              <Link to={ROUTE.DATA_LOGDICTIONARY}>日志字典</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.DATA_OUTLINE}>
              <Link to={ROUTE.DATA_OUTLINE}>概要统计</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.DATA_TOPICSMODEL}>
              <Link to={ROUTE.DATA_TOPICSMODEL}>分类模型</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key={ROUTE.CRAWLER}
                   title={<span><Icon type="code-o" /><span className="nav-text">爬虫管理</span></span>}>
            <Menu.Item key={ROUTE.CRAWLER_CRAWLERSTA}>
              <Link to={ROUTE.CRAWLER_CRAWLERSTA}>结果统计</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.CRAWLER_DISPATCH}>
              <Link to={ROUTE.CRAWLER_DISPATCH}>调度中心</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.CRAWLER_CONNECTIONS}>
              <Link to={ROUTE.CRAWLER_CONNECTIONS}>连接状态</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key={ROUTE.USER}
                   title={<span><Icon type="user"/><span className="nav-text">用户中心</span></span>}>
            <Menu.Item key={ROUTE.USER_ACCOUNT}>
              <Link to={ROUTE.USER_ACCOUNT}>账户</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.USER_INFORMATION}>
              <Link to={ROUTE.USER_INFORMATION}>信息</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.USER_GROUPS}>
              <Link to={ROUTE.USER_GROUPS}>群组</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.USER_ROLES}>
              <Link to={ROUTE.USER_ROLES}>角色</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.USER_SITES}>
              <Link to={ROUTE.USER_SITES}>站点</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.USER_AUTH}>
              <Link to={ROUTE.USER_AUTH}>权限</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key={ROUTE.REWARD}
                   title={<span><Icon type="gift"/><span className="nav-text">商城管理</span></span>}>
            <Menu.Item key={ROUTE.REWARD_NOTICES}>
              <Link to={ROUTE.REWARD_NOTICES}>系统公告</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.REWARD_DBCATEGORY}>
              <Link to={ROUTE.REWARD_DBCATEGORY}>夺宝类别</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.REWARD_DBPRODUCT}>
              <Link to={ROUTE.REWARD_DBPRODUCT}>商品信息</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.REWARD_PRIZES}>
              <Link to={ROUTE.REWARD_PRIZES}>奖项状态</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.REWARD_PARTICIPANT}>
              <Link to={ROUTE.REWARD_PARTICIPANT}>参与记录</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key={ROUTE.TRANSLATE}
                   title={<span><Icon type="sync"/><span className="nav-text">翻译管理</span></span>}>
            <Menu.Item key={ROUTE.TRANSLATE_TASKS}>
              <Link to={ROUTE.TRANSLATE_TASKS}><Icon type="flag"/>任务中心</Link>
            </Menu.Item>
            <SubMenu key={ROUTE.TRANSLATE_TRANSLATECENTER} title={<span><Icon type="sync"/>精翻中心</span>}>
              <Menu.Item key={ROUTE.TRANSLATE_TRANSLATECENTER_ARTICLE}>
                <Link to={ROUTE.TRANSLATE_TRANSLATECENTER_ARTICLE}>希望精翻</Link></Menu.Item>
              <Menu.Item key={ROUTE.TRANSLATE_TRANSLATECENTER_TRANSLATE}>
                <Link to={ROUTE.TRANSLATE_TRANSLATECENTER_TRANSLATE}>审核精翻</Link>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key={ROUTE.FEEDBACK}
                   title={<span><Icon type="solution"/><span className="nav-text">反馈管理</span></span>}>
            <Menu.Item key={ROUTE.FEEDBACK_REPORT}>
              <Link to={ROUTE.FEEDBACK_REPORT}>举报信息</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.FEEDBACK_MESSAGE}>
              <Link to={ROUTE.FEEDBACK_MESSAGE}>留言管理</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.FEEDBACK_FEEDBACK}>
              <Link to={ROUTE.FEEDBACK_FEEDBACK}>用户反馈</Link>
            </Menu.Item>
            <Menu.Item key={ROUTE.FEEDBACK_VOTES}>
              <Link to={ROUTE.FEEDBACK_VOTES}>投票管理</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <style>
          {
            `
              #nprogress .spinner{
                left: ${this.state.collapsed ? '70px' : '206px'};
                right: 0 !important;
              }
            `
          }
        </style>
      </Sider>
    )
  }
}

export default SiderCustom;
