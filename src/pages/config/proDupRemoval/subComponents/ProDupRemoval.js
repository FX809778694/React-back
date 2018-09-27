import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Input, Form, Modal} from 'antd';
import {InputNumItem} from "../../../../component/FormItem";

const Search = Input.Search;
const confirm = Modal.confirm;

class Screening extends Component {
  render() {
    const {topicId, targetId, onTopicIdChange, onTargetIdChange, onSearch} = this.props
    return (
      <div>
        <label className='mar-bottom-10 display-block'>
          <div className='display-inline-block width-60'>TopicId：</div>
          <Search
            placeholder="请输入TopicId"
            value={topicId}
            onChange={onTopicIdChange}
            onSearch={onSearch}
            onPressEnter={onSearch}
          />
          <span className='mar-left-20 prompt-red'>* 必填</span>
        </label>
        <label className='mar-bottom-20 display-block'>
          <div className='display-inline-block width-60'>TargetId：</div>
          <Search
            placeholder="请输入TargetId"
            value={targetId}
            onChange={onTargetIdChange}
            onSearch={onSearch}
            onPressEnter={onSearch}
          />
        </label>
      </div>
    )
  }
}

const FormModal = ({visible, onCancel, onCreate, form}) => (
  <Modal visible={visible} title="增加去重" okText="提交" onCancel={onCancel} onOk={onCreate} >
    <Form layout="vertical">
      <InputNumItem label="TopicID" getFieldDecorator={form.getFieldDecorator} id='topicId' required={true} placeholder='请输入TopicID'/>
      <InputNumItem label="TargetId" getFieldDecorator={form.getFieldDecorator} id='targetId' required={true} placeholder='请输入TargetID'/>
    </Form>
  </Modal>
)
const CollectionCreateForm = Form.create()(FormModal);

export default class ProDupRemoval extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      page: 1,
      topicId: '',
      targetId: '',
      visible: false,
    }
    this.getData = this.getData.bind(this)
    this.onTopicIdChange = this.onTopicIdChange.bind(this)
    this.onTargetIdChange = this.onTargetIdChange.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }
  getData() {
    const {page, topicId, targetId} = this.state
    const {actions} = this.props
    actions.fetchProDupRemovalData(page, topicId, targetId)
  }
  onTopicIdChange = (e) => {
    this.setState({ topicId: e.target.value })
  }
  onTargetIdChange = (e) => {
    this.setState({ targetId: e.target.value })
  }
  onSearch = () => {
    this.setState({ loading: true })
    this.getData()
  }
  onPaginationChange(page) {
    this.setState({
      loading: true,
      page
    })
  }
  handleDelete(event) {
    const { id } = event.target.dataset
    const { actions } = this.props
    const that = this
    confirm({
      title: '确定要删除此条数据？',
      content: '删除后无法恢复',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        actions.deleteProDupRemovalData(id, that.getData)
        that.setState({ loading: true })
      }
    });
  }
  addRemoval = () => {
    this.setState({visible: true});
  }
  handleCancel = () => {
    this.setState({visible: false});
  }
  handleCreate = () => {
    const form = this.form;
    const { actions } = this.props
    const { topicId } = this.state
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values = {
        data: {
          topicId: values.topicId,
          targetId: values.targetId
        }
      }
      form.resetFields();
      this.setState({visible: false});
      actions.addProDupRemovalData(values, topicId && this.getData)
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  componentDidMount() {
    const { topicId } = this.state
    topicId && this.getData()
  }
  componentWillUpdate(nextProps, nextState){
    this.props.data !== nextProps.data && this.setState({ loading: false })
  }
  componentDidUpdate(nextProps, nextState){
    const { page } = this.state
    page !== nextState.page && this.getData()
  }
  render() {
    const {data, meta} = this.props
    const {loading, topicId, targetId, visible} = this.state
    console.log(topicId)
    return (
      <div>
        <Screening
          topicId={topicId}
          targetId={targetId}
          onTopicIdChange={this.onTopicIdChange}
          onTargetIdChange={this.onTargetIdChange}
          onSearch={this.onSearch}
        />
        <TableData
          loading={loading}
          data={data}
          meta={meta}
          addRemoval={this.addRemoval}
          onPaginationChange={this.onPaginationChange}
          handleDelete={this.handleDelete}
        />
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          maskClosable={false}
        />
      </div>
    )
  }
}
ProDupRemoval.PropTypes = {
  data: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}
