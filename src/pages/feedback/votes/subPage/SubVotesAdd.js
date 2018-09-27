import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/votes/actions/votesOptions'
import {Button, Card, Form, Input, InputNumber, Select} from 'antd';

import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;


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
    let {actions, params} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        values = {
          data: {
            voteId: params.id,
            voteOptionText: values.voteOptionText,
            voteOptionCount: values.voteOptionCount,
            displayOrder: values.displayOrder,
            enabled: values.enabled
          }
        }
        actions.addVotesOptionsData(values)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="ant-layout-content">
        <Card title='添加投票选项' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
              <FormItem label="选项描述：" {...formItemLayout} >
                {getFieldDecorator('voteOptionText', { })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="选项票数：" {...formItemLayout} >
                {getFieldDecorator('voteOptionCount', {
                  initialValue: 0
                })(
                  <InputNumber/>
                )}
              </FormItem>

              <FormItem label="选项排序：" {...formItemLayout} >
                {getFieldDecorator('displayOrder', { })(
                  <InputNumber/>
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

const SubVotesAdd = Form.create()(DataAdd);

SubVotesAdd.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SubVotesAdd)



