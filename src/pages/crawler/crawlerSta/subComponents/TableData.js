import React, {Component} from 'react'
import {Card, Col, Pagination, Row, Table} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router';
import {CRAWLER_CRAWLERSTA} from '../../../../utils/routePath'
import {spiderStaUrl} from "../../../../api/url";

export default class TableData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null
    }
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.getData = this.getData.bind(this)
  }
  getData() {
    const {actions} = this.props
    const { priortime, latertime } = this.props
    const { page } = this.state
    actions.fetchData(spiderStaUrl, page, priortime, latertime)
  }

  onPaginationChange(page) {
    this.setState({
      loading: true,
      page
    })
    setTimeout(()=>{this.getData()}, 500)
  }

  componentWillReceiveProps({data}) {
    this.setState({
      loading: false,
    })
  }

  render() {
    const columns = [
      {
        title: '种子ID',
        dataIndex: 'seedId',
        key: 'seedId',
        render: (text, record) => (
          <Link to={`${CRAWLER_CRAWLERSTA}/id/${record.seedId}`}>{text}</Link>
        ),
      }, {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <Link to={`${CRAWLER_CRAWLERSTA}/id/${record.seedId}`}>{text}</Link>
        ),
      }, {
        title: '网站描述',
        dataIndex: 'description',
        key: 'description',
        width: '30%',
        render: (text, record) => (
          <span style={{WebkitBoxOrient: 'vertical'}}>
            <a className="seedsUrl" href={text} target="_blank">{text}</a>
          </span>
        ),
      }, {
        title: '爬取topic数据合计',
        dataIndex: 'counts',
        key: 'counts',
      }
    ];
    const {data, meta} = this.props
    return (
      <Row gutter={16}>
        <Col className="gutter-row" span={24}>
          <div className="gutter-box">
            <Card title="爬虫统计列表"
                  bordered={true}
            >
              <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.seedId}
                pagination={false}
                loading={this.state.loading}
                bordered
              />
              <p className="prompt-red">* 若不选择时间范围，默认起始时间为当前时间减去一天，结束时间为当前时间</p>
              <Pagination
                showQuickJumper
                defaultCurrent={1}
                current={meta.number}
                total={meta.totalElements}
                onChange={this.onPaginationChange}
                style={{float: 'right', marginTop: '20px'}}
              />
            </Card>
          </div>
        </Col>
      </Row>
    )
  }
}
TableData.propTypes = {
  priortime: PropTypes.string,
  latertime: PropTypes.string,
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}
