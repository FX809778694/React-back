import React, {Component} from 'react';
import {Button, Card, Form, Input, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/notices/actions/index'
import ContentEditor from "../../../../component/FormInputComponent/contentEditor/index";
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {rewardNoticesUrl} from "../../../../api/url";

const Option = Select.Option;
const FormItem = Form.Item;

class DataModify extends Component {
  constructor(props) {
    super(props);
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
    const {notice, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
            title: values.title,
            content: values.content,
            enabled: values.enabled,
            state: values.state
          }
        }
        console.log(values)
        actions.editNoticesData(notice.items.id, values)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${rewardNoticesUrl}/${params.id}`)
  }

  componentWillReceiveProps({notice}) {
    notice.items &&
    this.setState({
      loading: false,
      contentEditor: notice.items.content
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {notice} = this.props
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`公告修改 —— ${notice.items && notice.items.title}`} bordered={true}>
            {notice.items &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
              {/*新闻*/}
              <FormItem label="公告标题：" {...formItemLayout} >
                {getFieldDecorator('title', {
                  rules: [{required: true, message: '请输入公告标题！', whitespace: true}],
                  initialValue: notice.items.title
                })(
                  <Input/>
                )}
              </FormItem>

              {/*内容*/}
              {notice.items.content &&
              <FormItem label="公告内容：" {...formItemLayout} >
                {getFieldDecorator('content', {
                  rules: [
                    {required: true, message: '请输入公告内容！', whitespace: true},
                    {validator: this.ContentValidate}
                  ],
                  initialValue: notice.items.content
                })(
                  <ContentEditor content={notice.items.content}/>
                )}
              </FormItem>
              }

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(notice.items.enabled)
                })(
                  <Select>
                    <Option value="0">删除</Option>
                    <Option value="1">启用</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="状态：" {...formItemLayout} >
                {getFieldDecorator('state', {
                  initialValue: String(notice.items.state)
                })(
                  <Select style={{width: 200}}>
                    <Option value="2">首页显示</Option>
                    <Option value="3">历史通知</Option>
                  </Select>
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

const NoticesModify = Form.create()(DataModify);

NoticesModify.PropTypes = {
  notice: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    notice: state.notice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticesModify)
