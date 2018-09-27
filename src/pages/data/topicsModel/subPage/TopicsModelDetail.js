import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/data/actions/topicModal'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";

class TopicsModelDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchTopicModelDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({  loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearDataCenterData()
  }
  render() {
    const {data} = this.props
    const {loading} = this.state
    return (
      <Card loading={loading} bordered={true}>
        { data &&
          <Form layout={'horizontal'}>
            <Items label="ID" data={data.id}/>
            <Items label="版块名称" data={
              data.forumId===1?'产品' : data.forumId===2?'品牌' : data.forumId===3?'新闻' :
                data.forumId===4?'评测' : data.forumId===5?'视频': data.forumId===6?'直播': data.forumId===7?'美频' :'暂无'}/>
            <Items label="模型名称" data={data.modelName}/>
            <Items label="模型状态枚举" data={data.modelStatus}/>
            <Items label="模型状态枚举中文描述" data={data.modelStatusValue}/>
            <Items label="模型优先级" data={data.priority}/>
            <Items label="测试数据占样本数据百分比" data={data.confRandomSelection}/>
            <Items label="模型样本总数" data={data.resultSamples}/>
            <Items label="模型分析结果" data={data.resultText}/>
            <Items label="是否覆盖" data={data.confOverwrite===1?'是':'否'}/>
            <Items label="创建时间" data={data.created}/>
            <Items label="修改时间" data={data.modified}/>
            <BackButton/>
          </Form>
        }
      </Card>
    )
  }
}
TopicsModelDetail.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.dataCenter.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopicsModelDetail)
