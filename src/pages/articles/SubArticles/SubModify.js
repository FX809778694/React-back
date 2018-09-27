import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../store/articles/actions'
import {ButtonItem, ContentItem, FeaturesItem, InputItem, InputNumItem, LanguageItem, TextAreaItem} from "../../../component/FormItem";
import {reFormat, format} from "../../../other/FeatureFormat";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    const { data, actions } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            language: values.language,
            title: values.title,
            content: values.content,
            features: format(values.feature),
            description: values.description,
            priority: values.priority,
          }
        }
        actions.editSubData(values, data.id)
      }
    });
  }
  componentDidMount() {
    const { actions, params } = this.props
    actions.fetchSubDetailByKey(params.id[params.id.length-1])
  }
  componentWillUpdate(nextProps, nextState){
    this.props.data !== nextProps.data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const { actions } = this.props
    actions.clearSubArticleDetail()
  }
  render() {
    const { data } = this.props
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    const { loading } = this.state
    return (
      <Card loading={loading} title={`二级修改 —— ${data && data.title}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputItem label="标题" getFieldDecorator={getFieldDecorator} id="title" initialValue={data.title} required={true}/>
            <LanguageItem getFieldDecorator={getFieldDecorator} initialValue={data.language} required={true}/>
            <ContentItem label="内容" getFieldDecorator={getFieldDecorator} initialValue={data.content} required={true}/>
            <InputNumItem label="优先级" getFieldDecorator={getFieldDecorator} id="priority" initialValue={data.priority} placeholder="可输入0-100的数字"/>
            <TextAreaItem label="描述" getFieldDecorator={getFieldDecorator} id="description" initialValue={data.description}/>
            <FeaturesItem label="品牌属性" initialData={reFormat(data.features && data.features)}
                          getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue} setFieldsValue={setFieldsValue}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const SubModify = Form.create()(DataModify);

SubModify.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.articles.subTableDetail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubModify)
