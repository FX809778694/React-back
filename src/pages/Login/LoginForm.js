/**
 * Created by Freeman on 2017/3/27.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import classNames from 'classnames'
import { Tooltip } from 'antd';
import { minLength, password, phone, required } from '@/utils/validateRules'
import userActionCreators from '@/store/user/actions'
import { connect } from 'react-redux'
const { loginAction, loginFail, loginSuccess } = userActionCreators

const renderField = ({input, label, type, placeholder, captcha, captchaName, err_count, date, refreshCaptcha, meta: {asyncValidating, touched, error}}) => (

  <div className="box-cells">
    <h4>{label}</h4>
    <div className="box-cells__input">
      <input type={type} placeholder={placeholder} {...input} className={classNames('input_con', {'Vcode': captcha})}/>
    </div>
    {
      captcha &&
      <div className="verification-img">
        <Tooltip title='点击刷新验证码'>
          <img
            src={`/api/oauth/check.jpg?username=${captchaName}&_=${err_count}&__=${date}`}
            alt="图片验证码"
            onClick={() => {refreshCaptcha()}}
          />
        </Tooltip>
      </div>
    }
    {
      captcha &&
      <div className="clear"/>
    }
    {
      touched && error &&
      <div className="tips">
        <div className="icon-p"><i/></div>
        <p className="tip-text">{error}</p>
      </div>
    }

  </div>
)

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  captchaName: PropTypes.string,
  err_count: PropTypes.number,
  captcha: PropTypes.bool,
  meta: PropTypes.object,
  date: PropTypes.number,
  refreshCaptcha: PropTypes.func,
}

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.handleRefreshCaptcha = this.handleRefreshCaptcha.bind(this)
    this.state = {
      date: new Date().getTime()
    }
  }

  handleRefreshCaptcha () {
    const date = new Date().getTime()
    console.log(date)
    this.setState({
      date
    })
  }

  render () {
    const {handleSubmit, invalid, submitting, login,} = this.props

    return (
      <form>
        <Field name="username" type="text" placeholder="输入手机号" label="用户名" component={renderField}
               validate={[required('用户名'), phone]}/>
        <Field name="password" type="password" placeholder="输入密码(6位以上)" label="密码" component={renderField}
               validate={[required('密码'), minLength(6), password]}/>
        {
          login.err_count > 2 &&
          <Field name="verifyCode" type="text" placeholder="输入验证码" label="验证码" captcha component={renderField}
                 validate={required('验证码')} captchaName={login.captchaName} err_count={login.err_count}
                 date={this.state.date}
                 refreshCaptcha={this.handleRefreshCaptcha}/>
        }
        <div className="box-btn__area">
          <a className="btn-primary" disabled={ invalid || submitting } onClick={handleSubmit(loginAction)}>立即登录</a>
          <a className="entry-reg">
            <Field name="rememberme" id="check1" component="input" type="checkbox" className="input_check" />
            <label htmlFor="check1"/>
            <span>记住密码</span>
          </a>
        </div>
      </form>
    )
  }
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  login: PropTypes.object,
  search: PropTypes.string,
}

LoginForm = reduxForm({
  form: 'login',
  onSubmitFail: loginFail,
  onSubmitSuccess: loginSuccess,
})(LoginForm)

LoginForm = connect(
  state => ({
    initialValues: {
      rememberme:true
    } // pull initial values from account reducer
  }),
)(LoginForm)

export default LoginForm
