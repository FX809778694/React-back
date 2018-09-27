import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/feedbackCenter/Feedback/actions/index'
import {Button, Card, Form, Input, Select} from 'antd';
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'


const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
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
            mobile: values.mobile,
            email: values.email,
            suggestion: values.suggestion,
            enabled: values.enabled,
          }
        }
        actions.addFeedbackData(values)
      }
    });
  }


  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Card title='添加反馈信息' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="用户名：" {...formItemLayout} >
                {getFieldDecorator('username', {
                  rules: [{required: true, username: '请输入用户名！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="手机号：" {...formItemLayout} >
                {getFieldDecorator('mobile', {
                  rules: [{required: true, mobile: '请输入手机号！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="邮箱：" {...formItemLayout} >
                {getFieldDecorator('email', {
                  rules: [{required: true, email: '请输入邮箱！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="反馈内容：" {...formItemLayout} >
                {getFieldDecorator('suggestion', {
                  rules: [{required: true, suggestion: '请输入反馈内容！', whitespace: true}],
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {})(
                  <Select>
                    <Option value="1">可用</Option>
                    <Option value="0">不可用</Option>
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

const FeedbackAdd = Form.create()(DataAdd);

FeedbackAdd.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackAdd)



