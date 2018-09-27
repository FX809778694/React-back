import React, {Component} from 'react';
import {Button, Card, Form, Input, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/feedbackCenter/Feedback/actions/index'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {articleFeedbackUrl} from "../../../../api/url";

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //点击提交按钮
  handleSubmit = (e) => {
    const {feedbackDetail, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
            username: values.username,
            mobile: values.mobile,
            email: values.email,
            suggestion: values.suggestion,
            enabled: values.enabled,
          }
        }
        console.log(values)
        actions.EditFeedbackData(values, feedbackDetail.items.id)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${articleFeedbackUrl}/${params.id}`)
  }

  componentWillReceiveProps({feedbackDetail}) {
    feedbackDetail.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {feedbackDetail} = this.props
    const {getFieldDecorator} = this.props.form

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`反馈修改 —— ${feedbackDetail.items.id}`} bordered={true}>
            {feedbackDetail.items.id &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="username：" {...formItemLayout} >
                {getFieldDecorator('username', {
                  initialValue: String(feedbackDetail.items.username)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="mobile：" {...formItemLayout} >
                {getFieldDecorator('mobile', {
                  initialValue: String(feedbackDetail.items.mobile)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="email：" {...formItemLayout} >
                {getFieldDecorator('email', {
                  initialValue: String(feedbackDetail.items.email)
                })(
                  <Input/>
                )}
              </FormItem>
              {/*留言内容*/}
              <FormItem label="反馈内容：" {...formItemLayout} >
                {getFieldDecorator('suggestion', {
                  rules: [{required: true, suggestion: '请输入反馈内容！', whitespace: true}],
                  initialValue: feedbackDetail.items.suggestion
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(feedbackDetail.items.enabled)
                })(
                  <Select>
                    <Option value="1">可用</Option>
                    <Option value="0">不可用</Option>
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

const FeedbackModify = Form.create()(DataModify);

FeedbackModify.PropTypes = {
  feedbackDetail: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    feedbackDetail: state.feedbackDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackModify)
