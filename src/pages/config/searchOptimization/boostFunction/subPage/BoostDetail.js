import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../../store/configs/actions/boost'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../../component/FormItem";

class BoostDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchBoostDetail(params.id)
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
            <Items label="助推函数名称" data={data.title}/>
            <Items label="路径" data={data.numericField}/>
            <Items label="过滤条件" data={data.filters}/>
            <Items label="权重" data={data.weight}/>
            <Items label="函数修饰" data={data.functionModifier}/>
            <Items label="函数因子" data={data.functionFactor}/>
            <Items label="是否影响全局搜索" data={data.functionGlobal === 1 ? '是' : '否'}/>
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
BoostDetail.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(BoostDetail)
