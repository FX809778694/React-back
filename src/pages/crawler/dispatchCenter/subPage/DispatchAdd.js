import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/dispatchCenter/actions/index'
import {Button, Card, Form, Input, Select} from 'antd';
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {};
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
            jobName: values.jobName,
            jobClass: values.jobClass,
            jobData: values.jobData,
            triggerName: values.triggerName,
            triggerCronExpression: values.triggerCronExpression,
            auto: values.auto,
            description: values.description
          }
        }
        console.log(values)
        actions.addDispatchData(values)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="ant-layout-content">
        <Card title='添加种子网站信息' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
              <FormItem label="任务名称：" {...formItemLayout} >
                {getFieldDecorator('jobName', {
                  rules: [
                    {required: true, message: '请输入任务名称！', whitespace: true},
                  ],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="任务策略类全限定名称：" {...formItemLayout} >
                {getFieldDecorator('jobClass', {
                  rules: [
                    {required: true, message: '请输入任务参数！', whitespace: true},
                  ],
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="触发器名称：" {...formItemLayout} >
                {getFieldDecorator('triggerName', {
                  rules: [
                    {required: true, message: '请输入任务参数！', whitespace: true},
                  ],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="cron表达式：" {...formItemLayout} >
                {getFieldDecorator('triggerCronExpression', {
                  rules: [
                    {required: true, message: '请输入cron表达式！', whitespace: true},
                  ],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="自动部署：" {...formItemLayout} >
                {getFieldDecorator('auto', {
                  initialValue: String(0)
                })(
                  <Select>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="任务参数：" {...formItemLayout} >
                {getFieldDecorator('jobData', {})(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="任务描述：" {...formItemLayout} >
                {getFieldDecorator('description', {})(
                  <TextArea rows={4}/>
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

const DispatchAdd = Form.create()(DataAdd);

DispatchAdd.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DispatchAdd)



