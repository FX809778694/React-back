import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../../store/configs/actions/labelQuery'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../../component/FormItem";

class LabelQueryDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchLabelQueryDetail(params.id)
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
      <Card loading={loading} title={data.title} bordered={true}>
        { data &&
          <Form layout={'horizontal'}>
            <Items label="ID" data={data.id}/>
            <Items label="查询建造器名称" data={data.title}/>
            <Items label="查询英文字段" data={data.queryFieldsEn}/>
            <Items label="查询中文字段" data={data.queryFieldsCn}/>
            <Items label="过滤器英文类别字段" data={data.filterCategoriesEn}/>
            <Items label="过滤器中文类别字段" data={data.filterCategoriesCn}/>
            <Items label="正相关英文查询字符串" data={data.positiveQueryStringEn}/>
            <Items label="正相关中文查询字符串" data={data.positiveQueryStringCn}/>
            <Items label="负相关英文查询字符串" data={data.negativeQueryStringEn}/>
            <Items label="负相关中文查询字符串" data={data.negativeQueryStringCn}/>
            <Items label="负助推因子" data={data.negativeBoost}/>
            <Items label="函数评分模式" data={data.functionScoreMode}/>
            <Items label="函数助推模式" data={data.functionBoostMode}/>
            <Items label="是否可用" data={data.enabled === 1 ? '是' : '否'}/>
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
LabelQueryDetail.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LabelQueryDetail)
