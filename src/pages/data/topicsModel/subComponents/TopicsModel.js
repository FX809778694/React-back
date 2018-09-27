import React, {Component} from 'react'
import TableData from './TableData'
import PropTypes from 'prop-types'
import {Form, Modal} from 'antd';
import {InputNumItem, SelectItem} from "../../../../component/FormItem";
const confirm = Modal.confirm;

const ModifyModel= Form.create()(
  (props) => {
    const {visible, onCancel, onCreate, form, type, data, dataId} = props
    const {getFieldDecorator} = form
    const dataItem = data.find(i => i.id === Number(dataId))
    const OptionsData = [
      {value: 'NEW', name: '新建'},
      {value: 'RUNNABLE', name: '训练'},
      {value: 'CLASSIFICATION', name: '分类'},
      {value: 'WAITING', name: '等待'},
      {value: 'DONE', name: '已完成'},
      {value: 'DELETE', name: '已删除'},
      {value: 'TERMINATED', name: '已终止'},
    ]
    return (
      <Modal visible={visible}
             title={`${dataItem && dataItem.modelName} -- ${type === 'state' ? '修改模型状态' : type === 'priority' ? '修改模型优先级' : ''}`}
             okText="确定" onCancel={onCancel} onOk={onCreate}>
        <Form layout="vertical">
          { type === "state" ?
            <SelectItem label="模型状态" getFieldDecorator={getFieldDecorator} id="modelStatus" OptionsData={OptionsData} initialValue={dataItem && dataItem.modelStatus} required={true}/>
            : type === 'priority' ?
              <InputNumItem label="模型优先级取值为[0,100]" getFieldDecorator={getFieldDecorator} id="priority" initialValue={dataItem && dataItem.priority} min={0} max={100} placeholder="请输入优先级" required={true} />
              : ''
          }
        </Form>
      </Modal>
    )
  }
)

export default class topicsModel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      page: null,
      sorter: '',
      filByState: '',
      reset: false,
      visible: false,
      dataId: '',
      type: ''
    }
    this.getData = this.getData.bind(this)
    this.onTableChange = this.onTableChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.onPaginationChange = this.onPaginationChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.showModal = this.showModal.bind(this)
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      dataId: ''
    });
  }
  handleCreate  = () =>{
    const {actions} = this.props
    const {dataId} = this.state
    const form = this.form
    form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            modelStatus: values.modelStatus,
            priority: values.priority
          }
        }
      }
      actions.editTopicsModelData(values, dataId, this.getData())
      this.setState({
        visible: false,
        dataId: ''
      });
      this.getData()
    })
  }
  showModal = (event) => {
    const {id} = event.target.dataset
    this.setState({
      visible: true,
      dataId: id,
      type: event.target.getAttribute('id')
    });
  }
  getData() {
    const { actions } = this.props
    const { page, sorter, filByState } = this.state
    actions.fetchTopicModelData(page, sorter, filByState)
  }
  onSearch = () => {
    this.getData()
  }
  handleReset = () => {
    this.setState({
      sorter: '',
      filByState: '',
      reset: !this.state.reset
    })
  }
  onPaginationChange(page) {
    this.setState({
      page
    })
  }
  onTableChange = (pagination, filters, sorter) => {
    this.setState({
      sorter: (sorter.order === 'descend' ? '-' : '') + sorter.field,
      filByState: filters.modelStatus ? filters.modelStatus.join(',') : '',
    })
  }
  handleDelete(event) {
    const {id} = event.target.dataset
    const {actions} = this.props
    const that = this
    confirm({
      title: '确定要删除此条数据？',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        actions.deleteTopicsModelData(id, that.getData)
        that.setState({ loading: true })
      }
    });
  }
  componentDidMount() {
    this.getData()
  }
  componentWillUpdate(nextProps, nextState){
    this.props.data !== nextProps.data && this.setState({ loading: false })
  }
  componentDidUpdate(nextProps, nextState){
    const { reset, page, sorter, filByState } = this.state
    const condition = reset !== nextState.reset
      || page !== nextState.page || sorter !== nextState.sorter || filByState !== nextState.filByState
    condition && this.getData()
    condition && this.setState({ loading: true })
  }

  render() {
    const {data, meta} = this.props
    const {loading, sorter, filByState, visible, type, dataId} = this.state
    return (
      <div className='mar-top-20'>
        <TableData
          loading={loading}
          data={data}
          meta={meta}
          sorter={sorter}
          filByState={filByState}
          onTableChange={this.onTableChange}
          onPaginationChange={this.onPaginationChange}
          handleDelete={this.handleDelete}
          showModal={this.showModal}
        />
        <ModifyModel
          ref={form => this.form = form}
          data={data}
          dataId={dataId}
          type={type}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}
topicsModel.PropTypes = {
  data: PropTypes.array.isRequired,
  meta: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
