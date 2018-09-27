import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../store/articles/actions'
import {Card, Form} from 'antd';
import {ButtonItem, ContentItem, FeaturesItem, InputItem, InputNumItem, LanguageItem, TextAreaItem} from "../../../component/FormItem";
import {format} from '../../../other/FeatureFormat'

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parentId: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    let { actions, params } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            topicId: params.id,
            parentId: this.state.parentId,
            language: values.language,
            title: values.title,
            content: values.content,
            features: format(values.feature),
            description: values.description,
            priority: values.priority,
          }
        }
        actions.addSubData(values)
      }
    });
  }
  componentDidMount(){
    const { actions, params } = this.props
    actions.fetchSubDataByKey(params.id)
  }
  componentWillReceiveProps({subData}){
    subData.findIndex(i =>
      i.parentId === 0 && this.setState({ parentId: i.id })
    )
  }
  render() {
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    return (
      <Card title='添加二级信息' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="标题" getFieldDecorator={getFieldDecorator} id="title" required={true}/>
          <LanguageItem getFieldDecorator={getFieldDecorator} required={true}/>
          <ContentItem label="内容" getFieldDecorator={getFieldDecorator} required={true}/>
          <InputNumItem label="优先级" getFieldDecorator={getFieldDecorator} id="priority" placeholder="可输入0-100的数字"/>
          <TextAreaItem label="描述" getFieldDecorator={getFieldDecorator} id="description"/>
          <FeaturesItem label="品牌属性" getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue} setFieldsValue={setFieldsValue}/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const SubAdd = Form.create()(DataAdd);

SubAdd.PropTypes = {
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    subData: state.articles.subTableData
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubAdd)
