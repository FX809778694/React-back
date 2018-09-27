import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/seeds'
import {Card, Form} from 'antd';
import {
  ButtonItem, ChooseSelectItem, InputItem, InputNumItem, LanguageChooseItem, TextAreaItem,
} from "../../../../component/FormItem";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    let { actions } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            source: values.source,
            url: values.url,
            conf: values.conf,
            language: values.language,
            enabled: values.enabled,
            name: values.name,
            description: values.description,
            charset: values.charset,
            agencyIp: values.agencyIp,
            agencyIpPort: values.agencyIpPort
          }
        }
        actions.addSeedsData(values)
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title='添加种子网站信息' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="种子来源名称/简称" getFieldDecorator={getFieldDecorator} id='source' required={true}/>
          <InputItem label="种子URL" getFieldDecorator={getFieldDecorator} id='url' required={true}/>
          <TextAreaItem label="种子配置" getFieldDecorator={getFieldDecorator} id="conf" required={true}/>
          <LanguageChooseItem getFieldDecorator={getFieldDecorator} required={true}/>
          <ChooseSelectItem label='是否可用' getFieldDecorator={getFieldDecorator} id='enabled'/>
          <InputItem label="类型名称" getFieldDecorator={getFieldDecorator} id='name'/>
          <TextAreaItem label="种子描述" getFieldDecorator={getFieldDecorator} id="description"/>
          <InputItem label="字符集" getFieldDecorator={getFieldDecorator} id='charset'/>
          <InputItem label="代理IP" getFieldDecorator={getFieldDecorator} id='agencyIp'/>
          <InputNumItem label="代理端口" getFieldDecorator={getFieldDecorator} id='agencyIpPort'/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const SeedsAdd = Form.create()(DataAdd);

SeedsAdd.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(SeedsAdd)
