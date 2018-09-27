import React, {Component} from 'react';
import {Button, Card, Form, Input, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/dispatchCenter/actions/index'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {quartzJobsUrl} from "../../../../api/url";

const {TextArea} = Input;
const Option = Select.Option;
const FormItem = Form.Item;

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //点击提交按钮
  handleSubmit = (e) => {
    const {dispatchDetail, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
            id: dispatchDetail.items.id,
            enabled: values.enabled,
            version: values.version,
            jobStatus: values.jobStatus,
            jobData: values.jobData,
            triggerCronExpression: values.triggerCronExpression,
            auto: values.auto,
            description: values.description,
          }
        }
        console.log(values)
        actions.editDispatchData(values, dispatchDetail.items.id)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${quartzJobsUrl}/${params.id}`)
  }

  componentWillReceiveProps({dispatchDetail}) {
    dispatchDetail.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {dispatchDetail} = this.props
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`品牌修改 —— ${dispatchDetail.items && dispatchDetail.items.jobName}`} bordered={true}>
            {dispatchDetail.items &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="任务名称：" {...formItemLayout} >
                {dispatchDetail.items.jobName}
              </FormItem>

              <FormItem label="触发器名称：" {...formItemLayout} >
                {getFieldDecorator('triggerName', {
                  rules: [
                    {required: true, message: '请输入任务参数！', whitespace: true},
                  ],
                  initialValue: dispatchDetail.items.triggerName
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="cron表达式：" {...formItemLayout} >
                {getFieldDecorator('triggerCronExpression', {
                  rules: [
                    {required: true, message: '请输入任务参数！', whitespace: true},
                  ],
                  initialValue: dispatchDetail.items.triggerCronExpression
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="版本号：" {...formItemLayout} >
                {getFieldDecorator('version', {
                  rules: [
                    {required: true, message: '请输入版本号！', whitespace: true},
                  ],
                  initialValue: String(dispatchDetail.items.version)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="自动部署：" {...formItemLayout} >
                {getFieldDecorator('auto', {
                  initialValue: String(dispatchDetail.items.auto)
                })(
                  <Select>
                    <Option value="0">否</Option>
                    <Option value="1">是</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(dispatchDetail.items.enabled)
                })(
                  <Select>
                    <Option value="1">可用</Option>
                    <Option value="0">不可用</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="任务状态：" {...formItemLayout} >
                {getFieldDecorator('jobStatus', {
                  initialValue: String(dispatchDetail.items.jobStatus)
                })(
                  <Select style={{width: 200}}>
                    <Option value="NEW">新建</Option>
                    <Option value="SUSPEND">暂停</Option>
                    <Option value="RUNNABLE">运行中</Option>
                    <Option value="TERMINATED">终止</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="任务参数：" {...formItemLayout} >
                {getFieldDecorator('jobData', {
                  initialValue: dispatchDetail.items.jobData
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="任务描述：" {...formItemLayout} >
                {getFieldDecorator('description', {
                  initialValue: dispatchDetail.items.description
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              {/*按钮组*/}
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
        </Spin>
      </div>
    )
  }
}

const DispatchModify = Form.create()(DataModify);

DispatchModify.PropTypes = {
  dispatchDetail: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    dispatchDetail: state.dispatchDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DispatchModify)
