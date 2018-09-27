import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/links'
import {
  ButtonItem, ChooseSelectItem, InputItem, InputNumItem, LinksTypeItem, TextAreaItem, UploadCustomItem
} from "../../../../component/FormItem";

class DataModify extends Component {
  constructor(props) {
    super(props);
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
    const {data, actions} = this.props
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
            parentId: data.parentId,
            description: values.description,
            enabled: values.enabled
          }
        }
        actions.editLinksData(values, data.id)
      }
    })
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchLinksDetail(params.id)
  }
  componentWillReceiveProps(nextProps) {
    const {data} = this.props
    data !== nextProps.data && this.setState({ loading: false })
    data !== nextProps.data && nextProps.data.image && this.setState({ fileList: [{ uid: -1, url: nextProps.data.image }] })
    nextProps.uploadImage.url && this.setState({ fileList: [{uid: -1, url: nextProps.uploadImage.url}] })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearConfigsDetail()
  }
  render() {
    const {fileList, loading} = this.state;
    const {data} = this.props
    const {getFieldDecorator} = this.props.form;
    return (
      <Card loading={loading} title={`链接修改 —— ${data && data.title}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputItem label="链接标题" getFieldDecorator={getFieldDecorator} id='title' initialValue={data.title} required={true}/>
            <LinksTypeItem label="类型" getFieldDecorator={getFieldDecorator} id='type' initialValue={data.type} required={true}/>
            <InputNumItem label="排序"  getFieldDecorator={getFieldDecorator} id='sort' initialValue={data.sort} required={true}/>
            <TextAreaItem label="链接描述" getFieldDecorator={getFieldDecorator} id='description' initialValue={data.description}/>
            <ChooseSelectItem label="是否在新窗口中打开" getFieldDecorator={getFieldDecorator} id='blank' initialValue={data.blank}/>
            <ChooseSelectItem label="是否可用" getFieldDecorator={getFieldDecorator} id='enabled' initialValue={data.enabled}/>
            <InputItem label="链接" getFieldDecorator={getFieldDecorator} id='href' initialValue={data.href}/>
            <UploadCustomItem fileList={fileList} customRequest={this.customRequest} handleRemove={this.handleRemove}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const LinksModify = Form.create()(DataModify);

LinksModify.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LinksModify)
