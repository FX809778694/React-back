import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/data/actions/logDictionary'
import {InputItem, TextAreaItem, ButtonItem} from "../../../../component/FormItem";

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
            eventType: values.eventType,
            eventCode: values.eventCode,
            eventDescribe: values.eventDescribe,
          }
        }
        actions.editLogDictionaryData(values, id)
      }
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchLogDictionaryDetail(params.id)
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
    const {loading} = this.state

    return (
      <Card loading={loading} title={`字典修改 —— ${data && data.eventType}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputItem label="来源" getFieldDecorator={getFieldDecorator} id="eventType" initialValue={String(data.eventType)} required={true}/>
            <InputItem label="事件字典" getFieldDecorator={getFieldDecorator} id="eventCode" initialValue={data.eventCode} required={true}/>
            <TextAreaItem label="描述" getFieldDecorator={getFieldDecorator} id="eventDescribe" initialValue={data.eventDescribe} required={true}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const LogDictionaryModify = Form.create()(DataModify);

LogDictionaryModify.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(LogDictionaryModify)
