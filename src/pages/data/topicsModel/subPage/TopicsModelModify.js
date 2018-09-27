import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/data/actions/topicModal'
import {SelectItem, InputNumItem, ButtonItem} from "../../../../component/FormItem";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    const {actions} = this.props
    const id = this.props.params.id
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            priority: values.priority,
            modelStatus: values.modelStatus,
          }
        }
        actions.editTopicsModelData(values, id)
      }
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchTopicModelDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearDataCenterData()
  }
  render() {
    const {data} = this.props;
    const {getFieldDecorator} = this.props.form;

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
      <Card title={`模型修改 —— ${data.modelName}`} bordered={true}>
        {data &&
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <SelectItem label="模型状态" getFieldDecorator={getFieldDecorator} id="modelStatus" OptionsData={OptionsData} initialValue={data.modelStatus} required={true}/>
          <InputNumItem label="模型优先级取值为[0,100]" getFieldDecorator={getFieldDecorator} id="priority" initialValue={data.priority} min={0} max={100} placeholder="请输入优先级" required={true} />
          <ButtonItem/>
        </Form>
        }
      </Card>
    )
  }
}

const TopicsModelModify = Form.create()(DataModify);

TopicsModelModify.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    data: state.dataCenter.detail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsModelModify)
