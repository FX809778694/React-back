import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/categories'
import {Card, Form} from 'antd';
import {
  ButtonItem, InputItem, InputNumItem, UploadCustomItem
} from "../../../../component/FormItem";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    const {actions} = this.props
    const {fileList} = this.state
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            forumId: values.forumId,
            parentId: values.parentId,
            title: values.title,
            displayOrder: values.displayOrder,
            filename: fileList.length > 0 && fileList[0].url,
          }
        }
        actions.addCategoriesData(values)
      }
    });
  }
  componentWillReceiveProps({uploadImage}) {
    uploadImage.url && this.setState({ fileList: [{uid: -1, url: uploadImage.url}] })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearConfigsDetail()
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const {fileList} = this.state;
    return (
      <Card title='添加分类别信息' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputNumItem label="模块ID" getFieldDecorator={getFieldDecorator} id='forumId' required={true}/>
          <InputNumItem label="父节点ID" getFieldDecorator={getFieldDecorator} id='parentId' required={true}/>
          <InputItem label="类别名称" getFieldDecorator={getFieldDecorator} id='title' required={true}/>
          <InputNumItem label="排序字段" getFieldDecorator={getFieldDecorator} id='displayOrder'/>
          <UploadCustomItem fileList={fileList} customRequest={this.customRequest} handleRemove={this.handleRemove}/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const CategoryManageAdd = Form.create()(DataAdd);

CategoryManageAdd.PropTypes = {
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    uploadImage: state.configs.uploadImage
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryManageAdd)



