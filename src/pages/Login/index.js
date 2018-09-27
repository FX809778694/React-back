/**
 * Created by Freeman on 2017/4/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'

class Login extends React.Component {

  render () {
    const {login,location:{search}} = this.props
    return (
      <div className="content-wrap">
        <div className="content-wrap__header">
          <div className="mi-title">
            <h1>欢迎登录米饭星</h1>
            <p>www.mifanxing.com</p>
          </div>
        </div>
        <div className="login-content">
          <div className="content-wrap body-color">
            <div className="index-box">
              <div className="box-content">
                <div className="box box-tp">
                  <div className="mi-box-content content-wrap">
                    <LoginForm login={login} search={search} />
                  </div>
                  <div className="content-wrap"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Login.propTypes = {
  login: PropTypes.object,
  location:PropTypes.object
}

const mapStateToProps = state => (
  {
    login:state.login
  }
)


export default connect(mapStateToProps)(Login)
