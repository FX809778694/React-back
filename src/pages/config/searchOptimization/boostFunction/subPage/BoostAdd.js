import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../../store/configs/actions/boost'
import {Card, Form} from 'antd';
import {ButtonItem, InputItem, InputNumItem, FunctionChooseItem, ChooseSelectItem} from "../../../../../component/FormItem";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    let {actions} = this.props
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
            functionGlobal: values.functionGlobal,
          }
        }
        actions.addBoostData(values)
      }
    })
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title='添加助推函数' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="助推函数名称" getFieldDecorator={getFieldDecorator} id="title" required={true}/>
          <InputItem label="路径" getFieldDecorator={getFieldDecorator} id="numericField" required={true}/>
          <InputItem label="过滤器条件" getFieldDecorator={getFieldDecorator} id="filters" required={true}/>
          <InputNumItem label="权重" getFieldDecorator={getFieldDecorator} id="weight" min={0}/>
          <FunctionChooseItem label="函数修饰" getFieldDecorator={getFieldDecorator} id="functionModifier"/>
          <InputNumItem label="函数因子" getFieldDecorator={getFieldDecorator} id="functionFactor" min={0} max={1} step={0.01}/>
          <ChooseSelectItem label="是否影响全局搜索" getFieldDecorator={getFieldDecorator} id="functionGlobal"/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const BoostAdd = Form.create()(DataAdd);

BoostAdd.PropTypes = {
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BoostAdd)
