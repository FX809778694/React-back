import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/translate/actions/task'
import {InputNumItem, TaskStateItem, ButtonItem} from "../../../../component/FormItem";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    const {params:{id}, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const data = {
        state: values.state,
        bonus: values.bonus,
        wordsNum: values.wordsNum,
        wordsNumCn: values.wordsNumCn,
      }
      actions.editTranslateTasks(id, data)
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchTranslateTask(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const { actions } = this.props
    actions.clearTranslateTasks()
  }
  render() {
    const {data} = this.props;
    const {getFieldDecorator} = this.props.form;
    const {loading} = this.state
    return (
      <Card loading={loading} title={`任务修改 —— ${data && data.title }`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputNumItem label="翻译单词数" getFieldDecorator={getFieldDecorator} id='wordsNum' initialValue={data.wordsNum}/>
            <TaskStateItem label="状态" getFieldDecorator={getFieldDecorator} id='state' initialValue={data.state}/>
            <InputNumItem label="翻译后中文字数" getFieldDecorator={getFieldDecorator} id='wordsNumCn' initialValue={data.wordsNumCn}/>
            <InputNumItem label="翻译奖励数" getFieldDecorator={getFieldDecorator} id='bonus' initialValue={data.bonus}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const TasksModify = Form.create()(DataModify);

TasksModify.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(TasksModify)
