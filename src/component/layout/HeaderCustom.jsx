import React, {Component} from 'react'
import {Menu, Icon, Layout} from 'antd'

const {Header} = Layout
const SubMenu = Menu.SubMenu

class HeaderCustom extends Component {
  state = {
    user: ''
  }
  logout = () => {
    const {userActions} = this.props
    userActions.signOut()
  }

  render() {
    const {user} = this.props
    return (
      <Header style={{background: '#ffffff', padding: 0, height: 65}} className="custom-theme">
        <Icon
          className="trigger custom-trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />

        <Menu
          mode="horizontal"
          style={{lineHeight: '63px', float: 'right'}}
          onClick={this.menuClick}
        >
          <SubMenu
            title={<span className="avatar"><img src={user.userAvatar} alt="头像"/></span>}>
            <Menu.Item key="setting:0" title={user.nickname}>{user.nickname}</Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="logout">
              <div onClick={this.logout}>退出登录</div>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <style>{`
          .ant-menu-submenu-horizontal > .ant-menu {
            width: 140px;
            left: -60px;
          }
        `}</style>
      </Header>
    )
  }
}

export default HeaderCustom
