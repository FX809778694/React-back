import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/crawlerSta/actions/index'
import {Card, Col, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import {FRONT_DOMAIN} from '../../../../utils/config'
import {spiderStaTopicsUrl} from "../../../../api/url";


class DetailTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    const {actions,params} = this.props
    console.log(params)
    actions.fetchDataByKey(`${spiderStaTopicsUrl}/${params.id}`)
  }

  componentWillReceiveProps({crawlerStaDetail}) {
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount(){
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {params} = this.props
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => (
          <a href={`${FRONT_DOMAIN}/p/${record.topicId}`} target="_blank">{text}</a>
        )
      }, {
        title: '主题ID',
        dataIndex: 'topicId',
        key: 'topicId',
        render: (text, record) => (
          <a href={`${FRONT_DOMAIN}/p/${record.topicId}`} target="_blank">{text}</a>
        )
      }, {
        title: '种子ID',
        dataIndex: 'seedId',
        key: 'seedId',
        render: (text, record) => (
          <a href={`${FRONT_DOMAIN}/p/${record.topicId}`} target="_blank">{text}</a>
        )
      }, {
        title: '被爬取的url',
        dataIndex: 'origin',
        key: 'origin',
        render: text => (
          <a href={text} target="_blank">{text}</a>
        )
      }
    ];
    const {crawlerStaDetail} = this.props
    return (
      <div>
        <div onClick={() => { window.history.back() }} className="backToFirstLevelTable"> &lt;&lt; 返回</div>
        <Card title={`SeedId: ${params.id}`}
              bordered={true}
        >
          <Row gutter={16}>
            <Col className="gutter-row" span={24}>
              <div className="gutter-box" >
                <Table
                  size="small"
                  columns={columns}
                  dataSource={crawlerStaDetail.items}
                  rowKey={record => record.id}
                  onRowClick={this.onRowClick}
                  pagination={false}
                  loading={this.state.loading}
                  bordered
                />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}
DetailTable.propTypes = {
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    crawlerStaDetail: state.crawlerStaDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTable)
