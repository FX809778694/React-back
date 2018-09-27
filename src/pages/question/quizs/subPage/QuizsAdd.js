import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/question/actions/quizs'
import {Card, Form} from 'antd';
import {quesFormat} from '../../../../other/FeatureFormat'
import {ButtonItem, QuesTitleItem, UploadCustomItem, TextAreaItem, Questions} from "../../../../component/FormItem";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: []
    };
    this.customRequest = this.customRequest.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  customRequest = (file) => {
    const {actions} = this.props
    actions.uploadImg(file.file)
  }
  handleRemove = () => {
    this.setState({ fileList: [] })
  }
  handleSubmit = (e) => {
    const {actions} = this.props
    const {fileList} = this.state
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        values = {
          data: {
            title: values.title,
            description: values.description,
            backImg: fileList.length > 0 && fileList[0].url,
            questions: quesFormat(values.questions)
          }
        }
        actions.addQuizsData(values)
      }
    });
  }
  componentWillReceiveProps({backImg}) {
    backImg.url && this.setState({ fileList: [{uid: -1, url: backImg.url}] })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearQuestionsDetail()
  }
  render() {
    const {getFieldDecorator, getFieldValue, setFieldsValue} = this.props.form;
    const {fileList} = this.state
    return (
      <Card title='新增调查问卷' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <QuesTitleItem label="问卷标题" getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue} setFieldsValue={setFieldsValue} id="title" required={true}/>
          <TextAreaItem label="问卷描述" getFieldDecorator={getFieldDecorator} id="description"/>
          <UploadCustomItem label="问卷背景图" fileList={fileList} customRequest={this.customRequest} handleRemove={this.handleRemove} required={true}/>
          <Questions label="试题" getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue} setFieldsValue={setFieldsValue}/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const QuizsAdd = Form.create()(DataAdd);

QuizsAdd.PropTypes = {
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    backImg: state.questions.backImg
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizsAdd)
