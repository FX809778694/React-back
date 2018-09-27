import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/feedbackCenter/Feedback/actions/index'
import {Button, Card, Form, Spin} from 'antd';
import PropTypes from 'prop-types'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {articleFeedbackUrl} from "../../../../api/url";

const FormItem = Form.Item;

class FeedbackDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
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

    let dataSource
    dataSource = feedbackDetail.items

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={dataSource.post && dataSource.post.title} bordered={true}>
            {
              dataSource &&
              <Form layout={'horizontal'}>
                <FormItem label="ID：" {...formItemLayout} >
                  {dataSource.id}
                </FormItem>

                <FormItem label="反馈内容：" {...formItemLayout} >
                  {dataSource.suggestion}
                </FormItem>

                <FormItem label="是否可用：" {...formItemLayout} >
                  {
                    dataSource.enabled === 0
                      ? '不可用'
                      : dataSource.enabled === 1
                      ? '可用'
                      : dataSource.enabled
                  }
                </FormItem>

                <FormItem label="用户名：" {...formItemLayout} >
                  {dataSource.username}
                </FormItem>

                <FormItem label="手机号：" {...formItemLayout} >
                  {dataSource.mobile}
                </FormItem>

                <FormItem label="邮箱：" {...formItemLayout} >
                  {dataSource.email}
                </FormItem>

                <FormItem label="创建者：" {...formItemLayout} >
                  {dataSource.creator}
                </FormItem>

                <FormItem label="修改者：" {...formItemLayout} >
                  {dataSource.modifier}
                </FormItem>

                <FormItem label="创建时间：" {...formItemLayout} >
                  {dataSource.created}
                </FormItem>

                <FormItem label="修改时间：" {...formItemLayout} >
                  {dataSource.modified}
                </FormItem>

                <FormItem {...buttonItemLayout}>
                  <Button type="info" className="customBtn" onClick={() => {
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

FeedbackDetail.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDetail)
