import React, { Component } from 'react'
import { Layout } from 'antd'
import './assets/index.less'
import SiderCustom from './component/layout/SiderCustom'
import HeaderCustom from './component/layout/HeaderCustom'
import BreadcrumbCustom from './component/layout/BreadcrumbCustom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userActionCreators from '@/store/user/actions'
const {Content, Footer} = Layout

class App extends Component {
  constructor (props) {
    super(props)
    this.initApp = this.initApp.bind(this)
    this.state = {
      collapsed: false,
    }
  }

  componentDidMount () {
    this.initApp()
  }

  initApp () {
    const {userActions} = this.props
    userActions.getCurrentUser()
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render () {
    const {user, router, params, routes, userActions} = this.props
    return (
      <Layout className="ant-layout-has-sider">
        <SiderCustom path={this.props.location.pathname} collapsed={this.state.collapsed}/>
        <Layout>
          <HeaderCustom toggle={this.toggle} user={user || {}} router={router} userActions={userActions}
                        collapsed={this.state.collapsed}/>
          <BreadcrumbCustom routes={routes} params={params}/>
          <Content style={{margin: '0 10px', padding: '20px', overflow: 'initial', backgroundColor: '#ffffff'}}>
            {this.props.children}
          </Content>
          <Footer style={{textAlign: 'center'}}>
            <p>Copyright@ 2017 MUSICFANS. All Rights Reserved.</p>
            <p>北京米饭星科技有限公司 版权所有</p>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  const {user} = state
  return {user}
}
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActionCreators, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
