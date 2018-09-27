import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/feedbackCenter/Report/actions/index'
import {Button, Card, Form, Spin} from 'antd';
import PropTypes from 'prop-types'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {articleReportUrl} from "../../../../api/url";

const FormItem = Form.Item;

class ReportDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${articleReportUrl}/${params.id}`)
  }

  componentWillReceiveProps({reportDetail}) {
    reportDetail.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {reportDetail} = this.props

    let dataSource = reportDetail.items

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

                <FormItem label="举报原因：" {...formItemLayout} >
                  {dataSource.remark}
                </FormItem>

                <FormItem label="举报选项：" {...formItemLayout} >
                  {
                    dataSource.options === 0
                      ? '不可用'
                      : dataSource.options === 1
                      ? '可用'
                      : dataSource.options
                  }
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

                <FormItem label="用户ID：" {...formItemLayout} >
                  {dataSource.userId}
                </FormItem>

                <FormItem label="主题ID：" {...formItemLayout} >
                  {dataSource.topicId}
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

ReportDetail.PropTypes = {
  messageDetail: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    reportDetail: state.reportDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail)
