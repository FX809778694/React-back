import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/data/actions/logDictionary'
import {Card, Form} from 'antd';
import {InputItem, TextAreaItem, ButtonItem} from "../../../../component/FormItem";

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
        values = {
          data: {
            eventType: values.eventType,
            eventCode: values.eventCode,
            eventDescribe: values.eventDescribe,
          }
        }
        actions.addLogDictionaryData(values)
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title='添加日志字典' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="来源" getFieldDecorator={getFieldDecorator} id="eventType" required={true}/>
          <InputItem label="事件字典" getFieldDecorator={getFieldDecorator} id="eventCode" required={true}/>
          <TextAreaItem label="描述" getFieldDecorator={getFieldDecorator} id="eventDescribe" required={true}/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const LogDictionaryAdd = Form.create()(DataAdd);

LogDictionaryAdd.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LogDictionaryAdd)
