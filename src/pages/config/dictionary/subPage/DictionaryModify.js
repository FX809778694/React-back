import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/dictionaries'
import {ButtonItem, InputItem, ChooseSelectItem} from "../../../../component/FormItem";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    const {data, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            wordEn: values.wordEn,
            wordCn: values.wordCn,
            enabled: values.enabled,
          }
        }
        actions.editDictionariesData(values, data.id)
      }
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDictionariesDetail(params.id)
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
      <Card loading={loading} title={`双语词典修改 —— ${data && data.wordEn}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <InputItem label="英文词" getFieldDecorator={getFieldDecorator} id="wordEn" initialValue={data.wordEn} required={true}/>
            <InputItem label="中文词" getFieldDecorator={getFieldDecorator} id="wordCn" initialValue={data.wordCn} required={true}/>
            <ChooseSelectItem label="是否可用" getFieldDecorator={getFieldDecorator} id="enabled" initialValue={data.enabled}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const DictionaryModify = Form.create()(DataModify);

DictionaryModify.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(DictionaryModify)
