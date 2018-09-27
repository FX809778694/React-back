import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/seeds'
import {
  ButtonItem, ChooseSelectItem, InputItem, InputNumItem, LanguageChooseItem, TextAreaItem,
} from "../../../../component/FormItem";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    const {data, actions} = this.props
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
        actions.editSeedsData(values, data.id)
      }
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchSeedsDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearConfigsDetail()
  }
  render() {
    const {data} = this.props
    const {getFieldDecorator} = this.props.form;
    const {loading} = this.state
    return (
      <Card loading={loading} title={`种子修改 —— ${data.source}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputItem label="种子来源名称/简称" getFieldDecorator={getFieldDecorator} id='source' initialValue={data.source} required={true}/>
            <InputItem label="种子URL" getFieldDecorator={getFieldDecorator} id='url' initialValue={data.url} required={true}/>
            <TextAreaItem label="种子配置" getFieldDecorator={getFieldDecorator} id="conf" initialValue={data.conf} required={true}/>
            <LanguageChooseItem getFieldDecorator={getFieldDecorator} initialValue={data.language} required={true}/>
            <ChooseSelectItem label='是否可用' getFieldDecorator={getFieldDecorator} id='enabled' initialValue={data.enabled}/>
            <InputItem label="类型名称" getFieldDecorator={getFieldDecorator} id='name' initialValue={data.name}/>
            <TextAreaItem label="种子描述" getFieldDecorator={getFieldDecorator} id="description" initialValue={data.description}/>
            <InputItem label="字符集" getFieldDecorator={getFieldDecorator} id='charset' initialValue={data.charset}/>
            <InputItem label="代理IP" getFieldDecorator={getFieldDecorator} id='agencyIp' initialValue={data.agencyIp}/>
            <InputNumItem label="代理端口" getFieldDecorator={getFieldDecorator} id='agencyIpPort' initialValue={data.agencyIpPort}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const SeedsModify = Form.create()(DataModify);

SeedsModify.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.configs.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SeedsModify)
