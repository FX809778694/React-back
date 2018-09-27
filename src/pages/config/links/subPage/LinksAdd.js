import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/links'
import {Card, Form} from 'antd';
import {
  ButtonItem, ChooseSelectItem, InputItem, InputNumItem, LinksTypeItem, TextAreaItem, UploadCustomItem
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
            type: values.type,
            sort: values.sort,
            title: values.title,
            image: fileList.length > 0 && fileList[0].url,
            href: values.href,
            blank: values.blank,
            parentId: 0,
            description: values.description,
            enabled: values.enabled
          }
        }
        actions.addLinksData(values)
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
    const {fileList} = this.state;
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title='添加链接信息' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="链接标题" getFieldDecorator={getFieldDecorator} id='title' required={true}/>
          <LinksTypeItem label="类型" getFieldDecorator={getFieldDecorator} id='type' required={true}/>
          <InputNumItem label="排序"  getFieldDecorator={getFieldDecorator} id='sort' required={true}/>
          <TextAreaItem label="链接描述" getFieldDecorator={getFieldDecorator} id="description"/>
          <ChooseSelectItem label="是否在新窗口中打开" getFieldDecorator={getFieldDecorator} id='blank'/>
          <ChooseSelectItem label="是否可用" getFieldDecorator={getFieldDecorator} id='enabled'/>
          <InputItem label="链接" getFieldDecorator={getFieldDecorator} id='href'/>
          <UploadCustomItem fileList={fileList} customRequest={this.customRequest} handleRemove={this.handleRemove}/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const LinksAdd = Form.create()(DataAdd);

LinksAdd.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LinksAdd)



