import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/categories'
import {
  ButtonItem, ChooseSelectItem, InputItem, InputNumItem, UploadCustomItem
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
            id: values.id,
            enabled: values.enabled,
            title: values.title,
            displayOrder: values.displayOrder,
            filename: fileList.length > 0 && fileList[0].url,
          }
        }
        actions.editCategoriesData(values, data.id)
      }
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchCategoriesDetail(params.id)
  }
  componentWillReceiveProps(nextProps) {
    const {data} = this.props
    data !== nextProps.data && this.setState({ loading: false })
    data !== nextProps.data && nextProps.data.filename && this.setState({ fileList: [{ uid: -1, url: nextProps.data.filename }] })
    nextProps.uploadImage.url && this.setState({ fileList: [{uid: -1, url: nextProps.uploadImage.url}] })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearConfigsDetail()
  }
  render() {
    const {data} = this.props
    const {getFieldDecorator} = this.props.form;
    const {loading, fileList} = this.state;
    return (
      <Card loading={loading} title={`类别修改 —— ${data && data.title}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputItem label="类别名称" getFieldDecorator={getFieldDecorator} id='title' initialValue={data.title} required={true}/>
            <ChooseSelectItem label="是否可用" getFieldDecorator={getFieldDecorator} id='enabled' initialValue={data.enabled}/>
            <InputNumItem label="排序字段" getFieldDecorator={getFieldDecorator} id='displayOrder' initialValue={data.displayOrder}/>
            <UploadCustomItem fileList={fileList} customRequest={this.customRequest} handleRemove={this.handleRemove}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const CategoryManageModify = Form.create()(DataModify);

CategoryManageModify.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryManageModify)
