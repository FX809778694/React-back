import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/question/actions/quizs'
import {ButtonItem, QuesTitleItem, UploadCustomItem, TextAreaItem, QuizsStateItem, ChooseSelectItem, Questions} from "../../../../component/FormItem";
import {quesFormat, quesReFormat} from "../../../../other/FeatureFormat";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fileList: [],
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
    const {actions, data} = this.props
    const {fileList} = this.state
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            id: data.id,
            title: values.title,
            description: values.description,
            backImg: fileList.length > 0 && fileList[0].url,
            questions: quesFormat(values.questions)
          }
        }
        actions.editQuizsData(values)
      }
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchQuizsDetail(params.id)
  }
  componentWillReceiveProps({data, backImg}) {
    data && this.setState({ loading: false })
    this.props.data !== data && data.backImg && data.backImg !== 'false' && this.setState({ fileList: [{ uid: -1, url: data.backImg }] })
    backImg.url && this.setState({ fileList: [{uid: -1, url: backImg.url}] })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearQuestionsDetail()
  }
  render() {
    const {data} = this.props
    const {getFieldDecorator, getFieldValue, setFieldsValue} = this.props.form;
    const {loading, fileList} = this.state
    return (
      <Card loading={loading} title={`调查问卷修改 —— ${data && data.title}`} bordered={true}>
        { data &&
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <QuesTitleItem label="问卷标题" getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue} setFieldsValue={setFieldsValue} id="title" initialValue={data.title} required={true}/>
          <TextAreaItem label="问卷描述" getFieldDecorator={getFieldDecorator} id="description" initialValue={data.description}/>
          <UploadCustomItem label="问卷背景图" fileList={fileList} customRequest={this.customRequest} handleRemove={this.handleRemove} required={true}/>
          <QuizsStateItem label="问卷状态" getFieldDecorator={getFieldDecorator} id="state" initialValue={data.state}/>
          <ChooseSelectItem label="是否可用" getFieldDecorator={getFieldDecorator} id='enabled' initialValue={data.enabled}/>
          { data.questions &&
            <Questions label="试题" initialValue={quesReFormat(data.questions)} getFieldDecorator={getFieldDecorator}
                     getFieldValue={getFieldValue} setFieldsValue={setFieldsValue}/>}
          <ButtonItem/>
        </Form>
        }
      </Card>
    )
  }
}
const QuizsModify = Form.create()(DataModify);

QuizsModify.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.questions.detail,
    backImg: state.questions.backImg
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizsModify)
