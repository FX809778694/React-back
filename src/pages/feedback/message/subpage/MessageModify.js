import React, {Component} from 'react';
import {Button, Card, Form, Input, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/feedbackCenter/Message/actions/index'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {articleMesUrl} from "../../../../api/url";

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
    const {messageDetail, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
            message: values.message,
            enabled: values.enabled,
          }
        }
        console.log(values)
        actions.EditMessageData(values, messageDetail.items.id)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${articleMesUrl}/${params.id}`)
  }

  componentWillReceiveProps({messageDetail}) {
    messageDetail.items &&
    this.setState({
      loading: false,
    })
    messageDetail.items.document &&
    this.setState({
      brands:messageDetail.items.document.brands,
      tags:messageDetail.items.post.tags,
      category:messageDetail.items.post.categories
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {messageDetail} = this.props
    const {getFieldDecorator} = this.props.form

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`留言修改 —— ${messageDetail.items.id}`} bordered={true}>
            {messageDetail.items.id &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              {/*留言内容*/}
              <FormItem label="留言内容：" {...formItemLayout} >
                {getFieldDecorator('message', {
                  rules: [{required: true, message: '请输入修改内容！', whitespace: true}],
                  initialValue: messageDetail.items.message
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(messageDetail.items.enabled)
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

const MessageModify = Form.create()(DataModify);

MessageModify.PropTypes = {
  messageDetail: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    messageDetail: state.messageDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageModify)
