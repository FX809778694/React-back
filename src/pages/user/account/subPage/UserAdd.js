import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/userCenter/user/actions/index'
import {Button, Card, Form, Input, Select} from 'antd';
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

const FormItem = Form.Item;
const Option = Select.Option;

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
    this.UserNameValidate = this.UserNameValidate.bind(this)
  }

  //点击提交按钮
  handleSubmit = (e) => {
    let {actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        values = {
          data: {
            username: values.username,
            password: values.password,
            enabled: values.enabled,
          }
        }
        console.log(values)
        actions.addUserData(values)
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

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Card title='添加用户信息' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="用户名：" {...formItemLayout} >
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true,
                      message: '请输入用户名！',
                    },
                    {
                      validator: this.UserNameValidate
                    }
                  ],
                  validateTrigger: 'onBlur'
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="密码：" {...formItemLayout} >
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

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  rules: [{required: true, message: '请选择是否启用！', whitespace: true}],
                })(
                  <Select>
                    <Option value="0">删除</Option>
                    <Option value="1">启用</Option>
                  </Select>
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

const UserAdd = Form.create()(DataAdd);

UserAdd.PropTypes = {
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd)



