import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/channels'
import {
  ButtonItem, ChannelsTypeItem, ChooseSelectItem, InputItem, InputNumItem, TagsItem, TextAreaItem, UploadCustomItem
} from "../../../../component/FormItem";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      targets: [],
      channelType: ''
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
    const {data, actions} = this.props
    const { targets, fileList } = this.state
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            id: data.id,
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
        actions.editChannelsData(values)
      }
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchChannelsDetail(params.id)
  }
  componentWillReceiveProps(nextProps) {
    const {data} = this.props
    data !== nextProps.data && this.setState({ channelType: String(nextProps.data.channelType), targets: nextProps.data.targets, loading: false })
    data !== nextProps.data && nextProps.data.channelImage && nextProps.data.channelImage !== 'false' &&
    this.setState({ fileList: [{ uid: -1, url: nextProps.data.channelImage }] })
    nextProps.uploadImage.url && this.setState({ fileList: [{uid: -1, url: nextProps.uploadImage.url}] })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearConfigsDetail()
  }
  render() {
    const {fileList, loading, channelType} = this.state;
    const {data} = this.props
    const {getFieldDecorator} = this.props.form;
    return (
      <Card loading={loading} title={`产品修改 —— ${data && data.channelName}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputItem label="频道名称" getFieldDecorator={getFieldDecorator} id='channelName' initialValue={data.channelName} required={true}/>
            <ChannelsTypeItem label="频道类型" getFieldDecorator={getFieldDecorator} id='channelType' initialValue={data.channelType} onChannelTypeChange={this.onChannelTypeChange} required={true}/>
            { channelType &&
              ( channelType === '4'
                ? <TagsItem label="目标ID" name="targets" initialValue={data.targets} changeValue={this.changeValue} required={true}/>
                : <InputNumItem label="目标ID"  getFieldDecorator={getFieldDecorator} id='targetId' initialValue={data.targetId} required={true}/>
              )
            }
            <TextAreaItem label="描述" getFieldDecorator={getFieldDecorator} id="description" initialValue={data.description}/>
            <InputNumItem label="关注数" getFieldDecorator={getFieldDecorator} id='watched' initialValue={data.watched}/>
            <ChooseSelectItem label="是否可以取消关注" getFieldDecorator={getFieldDecorator} id='cancellable' initialValue={data.cancellable}/>
            <UploadCustomItem fileList={fileList} customRequest={this.customRequest} handleRemove={this.handleRemove}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const ChannelsModify = Form.create()(DataModify);

ChannelsModify.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.configs.detail,
    uploadImage: state.configs.uploadImage
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChannelsModify)
