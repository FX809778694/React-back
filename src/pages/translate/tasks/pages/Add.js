import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/translate/actions/task'
import {Card, Form} from 'antd';
import {ButtonItem, InputNumItem} from "../../../../component/FormItem";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    let {actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          bonus: values.bonus,
          topicId: values.topicId,
          wordsNum: values.wordsNum,
        }
        actions.addTranslateTasks({data})
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title='添加视频信息' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputNumItem label='翻译主题ID' getFieldDecorator={getFieldDecorator} id='topicId' required={true}/>
          <InputNumItem label='翻译总字数' getFieldDecorator={getFieldDecorator} id='wordsNum'/>
          <InputNumItem label='奖励数' getFieldDecorator={getFieldDecorator} id='bonus'/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const TasksAdd = Form.create()(DataAdd);

TasksAdd.PropTypes = {
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksAdd)
