import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/dbCategory/actions/index'
import {Form, Button, Card, Spin} from 'antd';
import PropTypes from 'prop-types'
import {formItemLayout, buttonItemLayout} from '../../../../constants/FormConst'

import {rewardCateUrl} from "../../../../api/url";

const FormItem = Form.Item;

class DbCategoriesDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${rewardCateUrl}/${params.id}`)
  }

  componentWillReceiveProps({dbCategory}) {
    dbCategory.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {dbCategory} = this.props

    let dataSource
    dataSource = dbCategory.items

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

                <FormItem label="类别名称：" {...formItemLayout} >
                  {dataSource.name}
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

                <FormItem label="排序：" {...formItemLayout} >
                  {dataSource.order}
                </FormItem>

                <FormItem label="显示css的class：" {...formItemLayout} >
                  {dataSource.cssClass}
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

DbCategoriesDetail.PropTypes = {
  dbCategory: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    dbCategory: state.dbCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DbCategoriesDetail)

