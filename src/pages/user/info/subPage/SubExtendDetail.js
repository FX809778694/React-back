import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/extendInfomation/actions/SubIndex'
import {Button, Card, Form, Spin} from 'antd';
import PropTypes from 'prop-types'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

import {addressUrl} from "../../../../api/url";

const FormItem = Form.Item;

class SubExtendDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    const {actions, params} = this.props
    console.log(params)
    actions.fetchDataByKey(`${addressUrl}/${params.id[params.id.length-1]}`)
  }

  componentWillReceiveProps({extendInfomationDetail}) {
    extendInfomationDetail.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {extendInfomationDetail} = this.props

    let dataSource
    dataSource = extendInfomationDetail.items

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

                <FormItem label="用户标识：" {...formItemLayout} >
                  {dataSource.userId}
                </FormItem>

                <FormItem label="行政区划代码：" {...formItemLayout} >
                  {dataSource.code}
                </FormItem>

                <FormItem label="省：" {...formItemLayout} >
                  {dataSource.province}
                </FormItem>
                <FormItem label="市：" {...formItemLayout} >
                  {dataSource.city}
                </FormItem>
                <FormItem label="区：" {...formItemLayout} >
                  {dataSource.district}
                </FormItem>

                {
                  dataSource.post && <FormItem label="是否可用：" {...formItemLayout} >
                    {
                      dataSource.enabled === 0
                        ? '否'
                        : dataSource.enabled === 1
                        ? '是'
                        : dataSource.enabled
                    }
                  </FormItem>
                }

                <FormItem label="手机：" {...formItemLayout} >
                  {dataSource.mobile}
                </FormItem>

                <FormItem label="收货人：" {...formItemLayout} >
                  {dataSource.consignee}
                </FormItem>

                <FormItem label="地址：" {...formItemLayout} >
                  {dataSource.address}
                </FormItem>

                <FormItem label="地址标签：" {...formItemLayout} >
                  {dataSource.addressLabel}
                </FormItem>


                <FormItem label="邮政编码：" {...formItemLayout} >
                  {dataSource.postalCode}
                </FormItem>

                <FormItem label="优先级：" {...formItemLayout} >
                  {dataSource.priority}
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

SubExtendDetail.PropTypes = {
  extendInfomationDetail: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    extendInfomationDetail: state.extendInfomationDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubExtendDetail)

