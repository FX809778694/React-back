import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../../store/configs/actions/boost'
import {ButtonItem, InputItem, InputNumItem, FunctionChooseItem, ChooseSelectItem} from "../../../../../component/FormItem";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    const {data, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            title: values.title,
            numericField: values.numericField,
            filters: values.filters,
            weight: values.weight,
            functionModifier: values.functionModifier,
            functionFactor: values.functionFactor,
            enabled: values.enabled,
            functionGlobal: values.functionGlobal,
          }
        }
        actions.editBoostData(values, data.id)
      }
    });
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
    const {getFieldDecorator} = this.props.form
    const {loading} = this.state
    return (
      <Card loading={loading} title={`助推函数修改 —— ${data.id}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputItem label="助推函数名称" getFieldDecorator={getFieldDecorator} id="title" initialValue={data.title} required={true}/>
            <ChooseSelectItem label="是否可用" getFieldDecorator={getFieldDecorator} id="enabled" initialValue={data.enabled}/>
            <InputItem label="路径" getFieldDecorator={getFieldDecorator} id="numericField" initialValue={data.numericField} required={true}/>
            <InputItem label="过滤器条件" getFieldDecorator={getFieldDecorator} id="filters" initialValue={data.filters} required={true}/>
            <InputNumItem label="权重" getFieldDecorator={getFieldDecorator} id="weight" initialValue={data.weight} min={0}/>
            <FunctionChooseItem label="函数修饰" getFieldDecorator={getFieldDecorator} id="functionModifier" initialValue={data.functionModifier}/>
            <InputNumItem label="函数因子" getFieldDecorator={getFieldDecorator} id="functionFactor" initialValue={data.functionFactor} min={0} max={1} step={0.01}/>
            <ChooseSelectItem label="是否影响全局搜索" getFieldDecorator={getFieldDecorator} id="functionGlobal" initialValue={data.functionGlobal}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const BoostModify = Form.create()(DataModify);

BoostModify.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(BoostModify)
