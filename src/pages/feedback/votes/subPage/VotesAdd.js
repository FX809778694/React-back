import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/votes/actions/index'
import {Button, Card, DatePicker, Form, Input, InputNumber, Radio, Select} from 'antd';
import {buttonItemLayout, dateFormat, formItemLayout} from '../../../../constants/FormConst'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postDate: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeData = this.onChangeData.bind(this)
  }

  //选择日期时触发
  onChangeData(data, dateString) {
    this.setState({
      postDate: dateString
    })
  }

  //点击提交按钮
  handleSubmit = (e) => {
    let {actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        values = {
          data: {
            voteType: values.voteType,
            voteText: values.voteText,
            voteStart: this.state.postDate,
            voteLength: values.voteLength,
            enabled: values.enabled
          }
        }
        actions.addVotesData(values)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="ant-layout-content">
        <Card title='添加投票信息' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
              <FormItem label="投票描述：" {...formItemLayout} >
                {getFieldDecorator('voteText', { })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="投票类型：" {...formItemLayout} >
                {getFieldDecorator('voteType', {
                  // rules: [{required: true, message: '请选择语言！', whitespace: true}],
                })(
                  <RadioGroup>
                    <Radio value='CHECKBOX'>CHECKBOX</Radio>
                    <Radio value='RADIO'>RADIO</Radio>
                  </RadioGroup>
                )}
              </FormItem>

              <FormItem label="投票开始时间：" {...formItemLayout} >
                {getFieldDecorator('voteStart', {})(
                  <DatePicker
                    showTime
                    format={dateFormat}
                    onChange={this.onChangeData}/>
                )}
              </FormItem>

              <FormItem label="投票期限：" {...formItemLayout} >
                {getFieldDecorator('voteLength', {
                  initialValue: 0
                })(
                  <InputNumber />
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(1)
                })(
                  <Select>
                    <Option value="0">删除</Option>
                    <Option value="1">启用</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem {...buttonItemLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
                <Button
                  type="info"
                  style={{marginLeft: '20px'}}
                  className="customBtn"
                  onClick={() => {
                    window.history.back()
                  }}>返回</Button>
              </FormItem>
            </Form>
          }
        </Card>
      </div>
    )
  }
}

const VotesAdd = Form.create()(DataAdd);

VotesAdd.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(VotesAdd)



