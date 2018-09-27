import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/configs/actions/channels'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";

class ChannelsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchChannelsDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearConfigsDetail()
  }
  render() {
    const { data } = this.props
    const { loading } = this.state
    return (
      <Card laoding={loading} title={data && data.channelName} bordered={true}>
        { data &&
          <Form layout={'horizontal'}>
            <Items label="ID：" data={data.id}/>
            <Items label="频道名称：" data={data.channelName}/>
            <Items label="描述：" data={data.description}/>
            <Items label="频道类型：" data={data.channelTypeValue}/>
            <Items label="目标ID：" data={data.targetId}/>
            <Items label="目标ID数组：" data={data.targets}/>
            <Items label="频道图片：" data={<img src={data.channelImage} alt=""/>}/>
            <Items label="关注数：" data={data.watched}/>
            <Items label="是否可以取消关注：" data={data.cancellable === 0 ? '不可以' : data.cancellable === 1 ? '可以' : data.cancellable}/>
            <Items label="是否可用：" data={data.enabled === 0 ? '不可用' : data.enabled === 1 ? '可用' : data.enabled}/>
            <Items label="创建人：" data={data.creator}/>
            <Items label="修改人：" data={data.modifier}/>
            <Items label="创建时间：" data={data.created}/>
            <Items label="修改时间：" data={data.modified}/>
            <BackButton/>
          </Form>
        }
      </Card>
    )
  }
}
ChannelsDetail.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(ChannelsDetail)

