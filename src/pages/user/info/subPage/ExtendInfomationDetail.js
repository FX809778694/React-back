import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/extendInfomation/actions/index'
import {Button, Card, Form, Spin} from 'antd';
import PropTypes from 'prop-types'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

import {profilesUrl} from "../../../../api/url";

const FormItem = Form.Item;

class ExtendInfomationDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${profilesUrl}/${params.id}/admin`)
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

                <FormItem label="出生日期：" {...formItemLayout} >
                  {dataSource.birthday}
                </FormItem>

                <FormItem label="用户昵称：" {...formItemLayout} >
                  {dataSource.nickname}
                </FormItem>

                <FormItem label="真实姓名：" {...formItemLayout} >
                  {dataSource.fullname}
                </FormItem>

                {
                  dataSource.post && <FormItem label="性别：" {...formItemLayout} >
                    {
                      dataSource.gender === 0
                        ? '保密'
                        : dataSource.gender === 1
                        ? '男'
                        : dataSource.gender === 2
                          ? '女'
                          : dataSource.gender
                    }
                  </FormItem>
                }

                <FormItem label="手机：" {...formItemLayout} >
                  {dataSource.mobile}
                </FormItem>

                <FormItem label="邮箱：" {...formItemLayout} >
                  {dataSource.email}
                </FormItem>

                <FormItem label="用户积分：" {...formItemLayout} >
                  {dataSource.userKarma}
                </FormItem>

                <FormItem label="所在城市ID：" {...formItemLayout} >
                  {dataSource.cityId}
                </FormItem>

                <FormItem label="用户头像：" {...formItemLayout} >
                  {
                    <Card bodyStyle={{padding: 5}}>
                      <img src={dataSource.userAvatar} style={{width:'100%'}} alt=""/>
                    </Card>
                  }
                </FormItem>

                <FormItem label="最后访问时间：" {...formItemLayout} >
                  {dataSource.userLastvisit}
                </FormItem>

                <FormItem label="公司名称：" {...formItemLayout} >
                  {dataSource.company}
                </FormItem>

                <FormItem label="职业：" {...formItemLayout} >
                  {dataSource.profession}
                </FormItem>

                <FormItem label="签到次数：" {...formItemLayout} >
                  {dataSource.signCount}
                </FormItem>

                <FormItem label="连续签到次数：" {...formItemLayout} >
                  {dataSource.signCountContinuos}
                </FormItem>

                <FormItem label="签到次数：" {...formItemLayout} >
                  {dataSource.signTime}
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

ExtendInfomationDetail.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtendInfomationDetail)
