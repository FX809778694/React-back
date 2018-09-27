import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/dbCategory/actions/index'
import {Form, Button, Card, Input, Select, InputNumber} from 'antd';
import {formItemLayout, buttonItemLayout} from '../../../../constants/FormConst'

const FormItem = Form.Item;
const Option = Select.Option;

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
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
            name: values.name,
            cssClass: values.cssClass,
            enabled: values.enabled,
            order: values.order
          }
        }
        console.log(values)
        actions.addDbCategoriesData(values)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Card title='添加夺宝类别' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="类别名称：" {...formItemLayout} >
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入类别名称！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="显示css的class：" {...formItemLayout} >
                {getFieldDecorator('cssClass', {
                  rules: [{required: true, message: '请输入显示css的class！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="排序：" {...formItemLayout} >
                {getFieldDecorator('order', {})(
                  <InputNumber/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {})(
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

const DBCategoriesAdd = Form.create()(DataAdd);

DBCategoriesAdd.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DBCategoriesAdd)



