import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/configs/actions/links'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";

class LinksDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchLinksDetail(params.id)
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
      <Card loading={loading} title={data && data.title} bordered={true}>
        { data &&
          <Form layout={'horizontal'}>
            <Items label="ID" data={data.id}/>
            <Items label="链接标题" data={data.title}/>
            <Items label="是否可用" data={data.enabled === 0 ? '不可用' : data.enabled === 1 ? '可用' : data.enabled}/>
            <Items label="父标识" data={data.parentId}/>
            <Items label="类型" data={
              data.type === 1 ? 'PC导航'
              : data.type === 2 ? '手机快速入口'
                : data.type === 3 ? '手机导航'
                  : data.type === 4 ? '友情链接'
                    : data.type === 5 ? '广告'
                      : data.type === 6 ? '新Banner图'
                        : data.type}/>
            <Items label="排序" data={data.sort}/>
            <Items label="链接" data={data.href}/>
            <Items label="是否在新窗口中打开" data={data.blank === 0 ? '否' : data.blank === 1 ? '是' : data.blank}/>
            <Items label="图片" data={
              <Card bodyStyle={{padding: 5}}><img src={data.image && data.image} alt="" style={{width: '100%'}}/></Card>
            }/>
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
LinksDetail.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LinksDetail)
