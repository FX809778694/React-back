import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../../store/configs/actions/labelQuery'
import {InputItem, InputNumItem, LabelQueryChooseItem, ChooseSelectItem, ButtonItem} from "../../../../../component/FormItem";

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
            enabled: values.enabled,
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
        actions.editLabelQueryData(values, data.id)
      }
    });
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
    const {getFieldDecorator} = this.props.form
    const {loading} = this.state
    return (
      <Card loading={loading} title={`标签查询修改 —— ${data.id}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputItem label="查询建造器名称" getFieldDecorator={getFieldDecorator} id="title" initialValue={data.title} required={true}/>
            <ChooseSelectItem label="是否可用" getFieldDecorator={getFieldDecorator} id="enabled" initialValue={data.enabled}/>
            <InputItem label="查询英文字段" getFieldDecorator={getFieldDecorator} id="queryFieldsEn" initialValue={data.queryFieldsEn}/>
            <InputItem label="查询中文字段" getFieldDecorator={getFieldDecorator} id="queryFieldsCn" initialValue={data.queryFieldsCn}/>
            <InputItem label="过滤器英文类别字段" getFieldDecorator={getFieldDecorator} id="filterCategoriesEn" initialValue={data.filterCategoriesEn}/>
            <InputItem label="过滤器中文类别字段" getFieldDecorator={getFieldDecorator} id="filterCategoriesCn" initialValue={data.filterCategoriesCn}/>
            <InputItem label="正相关英文查询字符串" getFieldDecorator={getFieldDecorator} id="positiveQueryStringEn" initialValue={data.positiveQueryStringEn}/>
            <InputItem label="正相关中文查询字符串" getFieldDecorator={getFieldDecorator} id="positiveQueryStringCn" initialValue={data.positiveQueryStringCn}/>
            <InputItem label="负相关英文查询字符串" getFieldDecorator={getFieldDecorator} id="negativeQueryStringEn" initialValue={data.negativeQueryStringEn}/>
            <InputItem label="负相关中文查询字符串" getFieldDecorator={getFieldDecorator} id="negativeQueryStringCn" initialValue={data.negativeQueryStringCn}/>
            <LabelQueryChooseItem label="函数评分模式" getFieldDecorator={getFieldDecorator} id="functionScoreMode" initialValue={data.functionScoreMode}/>
            <LabelQueryChooseItem label="函数助推模式" getFieldDecorator={getFieldDecorator} id="functionBoostMode" initialValue={data.functionBoostMode}/>
            <InputNumItem label="负助推因子" getFieldDecorator={getFieldDecorator} id="negativeBoost" initialValue={data.negativeBoost} min={0} max={1} step={0.01}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const LabelQueryModify = Form.create()(DataModify);

LabelQueryModify.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LabelQueryModify)
