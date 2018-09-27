import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/dictionaries'
import {Card, Form} from 'antd';
import {ButtonItem, InputItem} from "../../../../component/FormItem";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    let {actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            wordEn: values.wordEn,
            wordCn: values.wordCn
          }
        }
        actions.addDictionariesData(values)
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title='新增双语词典' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="英文词" getFieldDecorator={getFieldDecorator} id="wordEn" required={true}/>
          <InputItem label="中文词" getFieldDecorator={getFieldDecorator} id="wordCn" required={true}/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const DictionaryAdd = Form.create()(DataAdd);

DictionaryAdd.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DictionaryAdd)
