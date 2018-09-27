import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/notices/actions/index'
import {Button, Card, Form, Input, Select} from 'antd';
import ContentEditor from "../../../../component/FormInputComponent/contentEditor/index";
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

const FormItem = Form.Item;
const Option = Select.Option;

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
    this.ContentValidate = this.ContentValidate.bind(this)
  }

  ContentValidate = (rule, value, callback) => {
    const regContent = /^<p><\/p>$/
    if (value && (regContent.test(value))) {
      callback('内容不能为空！')
    }
    callback()
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
            title: values.title,
            content: values.content,
            enabled: values.enabled,
            state: values.state
          }
        }
        console.log(values)
        actions.addNoticesData(values)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Card title='添加系统公告' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="公告标题：" {...formItemLayout} >
                {getFieldDecorator('title', {
                  rules: [{required: true, message: '请输入公告标题！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="公告内容：" {...formItemLayout} >
                {getFieldDecorator('content', {
                  rules: [
                    {required: true, message: '请输入公告内容！', whitespace: true},
                    {validator: this.ContentValidate}
                  ]
                })(
                  <ContentEditor content=""/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {})(
                  <Select>
                    <Option value="0">删除</Option>
                    <Option value="1">启用</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="状态：" {...formItemLayout} >
                {getFieldDecorator('state', {})(
                  <Select style={{width: 200}}>
                    <Option value="2">首页显示</Option>
                    <Option value="3">历史通知</Option>
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

const NoticesAdd = Form.create()(DataAdd);

NoticesAdd.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NoticesAdd)



