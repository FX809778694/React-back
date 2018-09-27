import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/notices/actions/index'
import {Button, Card, Form, Spin} from 'antd';
import PropTypes from 'prop-types'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

import {rewardNoticesUrl} from "../../../../api/url";

const FormItem = Form.Item;

class NoticesDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${rewardNoticesUrl}/${params.id}`)
  }

  componentWillReceiveProps({notice}) {
    notice.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {notice} = this.props

    let dataSource
    dataSource = notice.items

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

                <FormItem label="公告标题：" {...formItemLayout} >
                  {dataSource.title}
                </FormItem>

                <FormItem label="是否可用：" {...formItemLayout} >
                  {
                    dataSource.enabled === 0
                      ? '已删除'
                      : dataSource.enabled === 1
                      ? '已启用'
                      : dataSource.enabled
                  }
                </FormItem>

                <FormItem label="状态：" {...formItemLayout} >
                  {
                    dataSource.state === 2
                      ? '首页显示'
                      : dataSource.state === 3
                      ? '历史通知'
                      : dataSource.state
                  }
                </FormItem>

                <FormItem label="内容：" {...formItemLayout} >
                  <div style={{border: '1px solid #eee', padding: '24px 32px'}}
                       dangerouslySetInnerHTML={{__html: dataSource.content}}/>
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

NoticesDetail.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NoticesDetail)

