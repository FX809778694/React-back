import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../../store/translate/actions/translate'
import {Button, Card, Form, Input, Modal, Table} from 'antd';
import PropTypes from 'prop-types'
import {buttonItemLayout, formItemLayout} from '../../../../../constants/FormConst'
import {Items} from "../../../../../component/FormItem";

const FormItem = Form.Item;

class FormModal extends Component {
  render() {
    const {visible, onCancel, onCreate, form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Modal
        visible={visible}
        title="填写驳回原因"
        okText="提交"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="驳回原因">
            {getFieldDecorator('feedBack', {
              rules: [{required: true, message: '请输入驳回原因！'}],
            })(
              <Input type="textarea" rows={4}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const CollectionCreateForm = Form.create()(FormModal);

class ArticleDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      feedBackId: ''
    };
    this.FeedBack = this.FeedBack.bind(this)
  }

  //驳回希望精翻 start
  FeedBack(event) {
    const {id} = event.target.dataset
    console.log(id)
    this.setState({
      visible: true,
      feedBackId: id
    });
  }

  handleCancel = () => {
    this.setState({visible: false});
  }
  handleCreate = () => {
    const form = this.form;
    const {actions} = this.props
    const {feedBackId} = this.state
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values = {
        data: {
          feedBack: values.feedBack
        }
      }
      form.resetFields();
      this.setState({visible: false});
      actions.feedBackData(feedBackId, values)
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  //驳回希望精翻 end

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchTranslateHopeDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearTranslateDetail()
  }
  render() {
    const {data, params} = this.props
    const { loading, visible } = this.state
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      }, {
        title: '用户ID',
        dataIndex: 'userId',
        key: 'userId',
      }, {
        title: '扩展ID',
        dataIndex: 'extendId',
        key: 'extendId',
      }, {
        title: '是否可用',
        dataIndex: 'enabled',
        key: 'enabled',
      }, {
        title: '对我有什么帮助',
        dataIndex: 'why',
        key: 'why',
        width: 120
      }, {
        title: '创建时间',
        dataIndex: 'created',
        key: 'created',
      }, {
        title: '修改时间',
        dataIndex: 'modified',
        key: 'modified',
      }
    ];
    return (
      <Card loading={loading} title={data && data.title} bordered={true}>
        {
          data &&
          <Form layout={'horizontal'}>
            <Items label="ID：" data={data.id}/>
            <Items label="文章标识：" data={data.topicId}/>
            <Items label="文章标题：" data={data.title}/>
            <Items label="状态：" data={data.state === 0 ? '待翻' : data.state === 1 ? '已翻' : data.state === 2 ? '已驳回' : data.state}/>
            <Items label="多少人希望精翻：" data={data.userCount}/>
            <FormItem label="Hopes：" {...formItemLayout} >
              { data.hopes &&
                <Table
                  size="small"
                  columns={columns}
                  dataSource={data.hopes}
                  rowKey={record => record.id}
                  pagination={false}
                  loading={this.state.loading}
                  bordered
                />
              }
            </FormItem>

            <FormItem {...buttonItemLayout}>
              {/*只有当状态是待翻（0）时，才显示驳回按钮*/}
              {
                data.state === 0 && params.id &&
                <button
                  type="primary"
                  data-id={params.id}
                  onClick={this.FeedBack}
                  className="ant-btn customBtn ant-btn-info ant-btn-lg"
                >
                  驳回希望精翻
                </button>
              }
              <Button type="info"
                      className="customBtn"
                      onClick={() => {
                        window.history.back()
                      }}
                      style={{marginLeft: '20px'}}
              >返回</Button>
            </FormItem>
          </Form>
        }
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </Card>
    )
  }
}
ArticleDetail.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.translate.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail)
