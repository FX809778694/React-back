import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../../store/configs/actions/labelQuery'
import {Card, Form} from 'antd';
import {InputItem, InputNumItem, LabelQueryChooseItem, ButtonItem} from "../../../../../component/FormItem";

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
            queryFieldsEn: values.queryFieldsEn,
            queryFieldsCn: values.queryFieldsCn,
            filterCategoriesEn: values.filterCategoriesEn,
            filterCategoriesCn: values.filterCategoriesCn,
            positiveQueryStringEn: values.positiveQueryStringEn,
            positiveQueryStringCn: values.positiveQueryStringCn,
            negativeQueryStringEn: values.negativeQueryStringEn,
            negativeQueryStringCn: values.negativeQueryStringCn,
            functionScoreMode: values.functionScoreMode,
            functionBoostMode: values.functionBoostMode,
          }
        }
        actions.addLabelQueryData(values)
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title='添加标签查询' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="查询建造器名称" getFieldDecorator={getFieldDecorator} id="title" required={true}/>
          <InputItem label="查询英文字段" getFieldDecorator={getFieldDecorator} id="queryFieldsEn"/>
          <InputItem label="查询中文字段" getFieldDecorator={getFieldDecorator} id="queryFieldsCn"/>
          <InputItem label="过滤器英文类别字段" getFieldDecorator={getFieldDecorator} id="filterCategoriesEn"/>
          <InputItem label="过滤器中文类别字段" getFieldDecorator={getFieldDecorator} id="filterCategoriesCn"/>
          <InputItem label="正相关英文查询字符串" getFieldDecorator={getFieldDecorator} id="positiveQueryStringEn"/>
          <InputItem label="正相关中文查询字符串" getFieldDecorator={getFieldDecorator} id="positiveQueryStringCn"/>
          <InputItem label="负相关英文查询字符串" getFieldDecorator={getFieldDecorator} id="negativeQueryStringEn"/>
          <InputItem label="负相关中文查询字符串" getFieldDecorator={getFieldDecorator} id="negativeQueryStringCn"/>
          <LabelQueryChooseItem label="函数评分模式" getFieldDecorator={getFieldDecorator} id="functionScoreMode"/>
          <LabelQueryChooseItem label="函数助推模式" getFieldDecorator={getFieldDecorator} id="functionBoostMode"/>
          <InputNumItem label="负助推因子" getFieldDecorator={getFieldDecorator} id="negativeBoost" min={0} max={1} step={0.01}/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const LabelQueryAdd = Form.create()(DataAdd);

LabelQueryAdd.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LabelQueryAdd)
