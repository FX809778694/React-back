import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/dispatchCenter/actions/index'
import {Button, Card, Form, Spin} from 'antd';
import PropTypes from 'prop-types'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

import {quartzJobsUrl} from "../../../../api/url";

const FormItem = Form.Item;

class DispatchDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
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

    let dataSource
    dataSource = dispatchDetail.items

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={dataSource && dataSource.source} bordered={true}>
            {
              dataSource &&
              <Form layout={'horizontal'}>
                <FormItem label="ID：" {...formItemLayout} >
                  {dataSource.id}
                </FormItem>

                <FormItem label="任务名称：" {...formItemLayout} >
                  {dataSource.jobName}
                </FormItem>

                <FormItem label="任务组：" {...formItemLayout} >
                  {dataSource.jobGroup}
                </FormItem>

                <FormItem label="任务状态：" {...formItemLayout} >
                  {dataSource.jobStatus}
                </FormItem>

                <FormItem label="任务状态值：" {...formItemLayout} >
                  {dataSource.jobStatusValue}
                </FormItem>

                <FormItem label="任务策略类全限定名称：" {...formItemLayout} >
                  {dataSource.jobClass}
                </FormItem>

                <FormItem label="任务参数：" {...formItemLayout} >
                  {dataSource.jobData}
                </FormItem>

                <FormItem label="触发器组：" {...formItemLayout} >
                  {dataSource.triggerGroup}
                </FormItem>

                <FormItem label="触发器名称：" {...formItemLayout} >
                  {dataSource.triggerName}
                </FormItem>

                <FormItem label="cron表达式：" {...formItemLayout} >
                  {dataSource.triggerCronExpression}
                </FormItem>

                <FormItem label="版本号：" {...formItemLayout} >
                  {dataSource.version}
                </FormItem>

                <FormItem label="自动部署：" {...formItemLayout} >
                  {
                    dataSource.auto === 0
                      ? '否'
                      : dataSource.auto === 1
                      ? '是'
                      : dataSource.auto
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

                <FormItem label="创建人：" {...formItemLayout} >
                  {dataSource.creator}
                </FormItem>

                <FormItem label="修改人：" {...formItemLayout} >
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

DispatchDetail.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DispatchDetail)

