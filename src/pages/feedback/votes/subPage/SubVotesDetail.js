import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/votes/actions/votesOptions'
import {Button, Card, Form, Spin} from 'antd';
import PropTypes from 'prop-types'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {articleVotesOptUrl} from "../../../../api/url";

const FormItem = Form.Item;

class SubVotesDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${articleVotesOptUrl}/${params.id[params.id.length-1]}`)
  }

  componentWillReceiveProps({votesOption}) {
    votesOption.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {votesOption} = this.props

    let dataSource
    dataSource = votesOption.items

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={dataSource && dataSource.voteOptionText} bordered={true}>
            {
              dataSource &&
              <Form layout={'horizontal'}>
                <FormItem label="ID：" {...formItemLayout} >
                  {dataSource.id}
                </FormItem>

                <FormItem label="关联投票ID：" {...formItemLayout} >
                  {dataSource.voteId}
                </FormItem>

                <FormItem label="选项描述：" {...formItemLayout} >
                  {dataSource.voteOptionText}
                </FormItem>

                <FormItem label="选项票数：" {...formItemLayout} >
                  {dataSource.voteOptionCount}
                </FormItem>

                <FormItem label="选项排序：" {...formItemLayout} >
                  {dataSource.displayOrder}
                </FormItem>

                <FormItem label="是否可用：" {...formItemLayout} >
                  {dataSource.enabled === 1 ? '可用' : dataSource.enabled === 0 ? '不可用' : dataSource.enabled}
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

SubVotesDetail.PropTypes = {
  votesOption: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    votesOption: state.votesOption
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubVotesDetail)

