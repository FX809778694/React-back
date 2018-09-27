import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/userCenter/user/actions/index'
import {Button, Card, Form, Input} from 'antd';
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {apiUserUrl} from "../../../../api/url";

const FormItem = Form.Item;

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
    this.UserNameValidate = this.UserNameValidate.bind(this)
  }

  //点击提交按钮
  handleSubmit = (e) => {
    let {actions, params} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        values = {
          data: {
            oldPassword: values.oldPassword,
            password: values.password,
          }
        }
        console.log(values)
        actions.editUserData(params.id, values)
      }
    });
  }

  UserNameValidate = (rule, value, callback) => {
    console.log(value)
    const regPhoneNum = /^1[34578][0-9]{9}/
    const regEmail = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/
    if (value && (!regPhoneNum.test(value) && !regEmail.test(value))) {
      callback('用户名必须是手机号或邮箱！')
    }
    callback()
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${apiUserUrl}/${params.id}`)
  }

  componentWillReceiveProps({userDetail}) {
    userDetail.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {userDetail} = this.props
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Card title={`修改密码信息 -- ${userDetail.items && userDetail.items.username}`} bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="用户ID：" {...formItemLayout} >
                {userDetail.items && userDetail.items.id}
              </FormItem>

              <FormItem label="用户名：" {...formItemLayout} >
                {userDetail.items && userDetail.items.username}
              </FormItem>

              <FormItem label="原密码：" {...formItemLayout} >
                {getFieldDecorator('oldPassword', {
                  rules: [{
                    required: true,
                    message: '密码长度必须在6到32之间！',
                    whitespace: true,
                    min: 6,
                    max: 32
                  }],
                  validateTrigger: 'onBlur'
                })(
                  <Input type="password"/>
                )}
              </FormItem>

              <FormItem label="新密码：" {...formItemLayout} >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: '密码长度必须在6到32之间！',
                    whitespace: true,
                    min: 6,
                    max: 32
                  }],
                  validateTrigger: 'onBlur'
                })(
                  <Input type="password"/>
                )}
              </FormItem>

              <FormItem {...buttonItemLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
                <Button
                  type="info"
                  style={{marginLeft: '20px'}}
                  className="customBtn"
                  onClick={() => {
                    window.history.back()
                  }}>返回</Button>
              </FormItem>
            </Form>
          }
        </Card>
      </div>
    )
  }
}

const UPasswordModifyAdd = Form.create()(DataAdd);

UPasswordModifyAdd.PropTypes = {
  userDetail: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    userDetail: state.userDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UPasswordModifyAdd)



