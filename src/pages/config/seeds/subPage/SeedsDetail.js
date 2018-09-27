import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/configs/actions/seeds'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";

class SeedsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchSeedsDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearConfigsDetail()
  }
  render() {
    const {data} = this.props
    const {loading} = this.state
    return (
      <Card loading={loading} title={data && data.source} bordered={true}>
        { data &&
          <Form layout={'horizontal'}>
            <Items label="ID" data={data.id}/>
            <Items label="种子来源名称/简称" data={data.source}/>
            <Items label="是否可用" data={data.enabled === 0 ? '不可用' : data.enabled === 1 ? '可用' : data.enabled}/>
            <Items label="种子URL" data={<a href={data.url} target="_blank" className="seedsUrl">{data.url}</a>}/>
            <Items label="种子配置" data={
              data.conf
              /*<pre style={{whiteSpace: 'normal'}}>{JSON.stringify(JSON.parse(data.conf), null, 4)}</pre>*/
            }/>
            <Items label="类型名称" data={data.name}/>
            <Items label="种子描述" data={data.description}/>
            <Items label="级别/评分" data={data.rank}/>
            <Items label="更新频率" data={data.updateRate}/>
            <Items label="代理IP" data={data.agencyIp}/>
            <Items label="代理端口" data={data.agencyIpPort}/>
            <Items label="字符集" data={data.charset}/>
            <Items label="创建人" data={data.creator}/>
            <Items label="修改人" data={data.modifier}/>
            <Items label="创建时间" data={data.created}/>
            <Items label="修改时间" data={data.modified}/>
            <BackButton/>
          </Form>
        }
      </Card>
    )
  }
}

SeedsDetail.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.configs.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SeedsDetail)
