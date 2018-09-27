import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/channels'
import {Card, Form} from 'antd';
import {
  ButtonItem, ChannelsTypeItem, ChooseSelectItem, InputItem, InputNumItem, TagsItem, TextAreaItem, UploadCustomItem
} from "../../../../component/FormItem";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      channelType: '',
      targets: [],
      fileList: [],
    };
    this.changeValue = this.changeValue.bind(this)
    this.onChannelTypeChange = this.onChannelTypeChange.bind(this)
    this.customRequest = this.customRequest.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  changeValue = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  onChannelTypeChange(value) {
    this.setState({
      channelType: value
    })
  }
  customRequest = (file) => {
    const {actions} = this.props
    actions.uploadImg(file.file)
  }
  handleRemove = () => {
    this.setState({ fileList: [] })
  }
  handleSubmit = (e) => {
    const { actions } = this.props
    const { targets, fileList } = this.state
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            channelType : values.channelType,
            targetId: values.targetId,
            targets: targets,
            channelName: values.channelName,
            description: values.description,
            watched: values.watched,
            cancellable: values.cancellable,
            channelImage: fileList.length > 0 && fileList[0].url,
          }
        }
        actions.addChannelsData(values)
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
      <Card title='新增频道' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="频道名称" getFieldDecorator={getFieldDecorator} id='channelName' required={true}/>
          <ChannelsTypeItem label="频道类型" getFieldDecorator={getFieldDecorator} id='channelType' onChannelTypeChange={this.onChannelTypeChange} required={true}/>
          { this.state.channelType &&
            ( this.state.channelType === '4'
              ? <TagsItem label="目标ID" name="targets" changeValue={this.changeValue} required={true}/>
              : <InputNumItem label="目标ID"  getFieldDecorator={getFieldDecorator} id='targetId' required={true}/>
            )
          }
          <TextAreaItem label="描述" getFieldDecorator={getFieldDecorator} id="description"/>
          <InputNumItem label="关注数" getFieldDecorator={getFieldDecorator} id='watched'/>
          <ChooseSelectItem label="是否可以取消关注" getFieldDecorator={getFieldDecorator} id='cancellable'/>
          <UploadCustomItem fileList={fileList} customRequest={this.customRequest} handleRemove={this.handleRemove}/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const ChannelsAdd = Form.create()(DataAdd);

ChannelsAdd.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(ChannelsAdd)
