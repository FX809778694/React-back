import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/votes/actions/index'
import {Button, Card, Form, Spin, Table} from 'antd';
import PropTypes from 'prop-types'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {articleVotesUrl} from "../../../../api/url";

const FormItem = Form.Item;

class VotesDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${articleVotesUrl}/${params.id}`)
  }

  componentWillReceiveProps({vote}) {
    vote.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {vote} = this.props

    let dataSource
    dataSource = vote.items

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '投票选项描述',
        dataIndex: 'voteOptionText',
        key: 'voteOptionText'
      }, {
        title: '投票统计',
        dataIndex: 'voteOptionCount',
        key: 'voteOptionCount'
      }
    ];

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={dataSource && dataSource.voteText} bordered={true}>
            {
              dataSource &&
              <Form layout={'horizontal'}>
                <FormItem label="ID：" {...formItemLayout} >
                  {dataSource.id}
                </FormItem>

                <FormItem label="投票描述：" {...formItemLayout} >
                  {dataSource.voteText}
                </FormItem>

                <FormItem label="投票类型：" {...formItemLayout} >
                  {dataSource.voteType}
                </FormItem>

                <FormItem label="投票开始时间：" {...formItemLayout} >
                  {dataSource.voteStart}
                </FormItem>

                <FormItem label="投票期限：" {...formItemLayout} >
                  { dataSource.voteLength === 0 ? '无限制' : dataSource.voteLength + '天' }
                </FormItem>

                <FormItem label="投票属性：" {...formItemLayout} >
                  <Table
                    size="small"
                    columns={columns}
                    dataSource={dataSource.options}
                    rowKey={record => record.id}
                    pagination={false}
                    loading={this.state.loading}
                    bordered
                  />
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

VotesDetail.PropTypes = {
  vote: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    vote: state.vote
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotesDetail)

