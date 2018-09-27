/**
 * Created by Administrator on 2017/12/13/013.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/extendInfomation/actions/SubIndex'
import {Button, Card, Form, Input, InputNumber} from 'antd';
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'


const FormItem = Form.Item;

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      featuresData: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  //点击提交按钮
  handleSubmit = (e) => {
    let {actions,params} = this.props
    console.log(params)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      if (!err) {
        values = {
          data: {
            userId: params.id,
            code: values.code,
            province: values.province,
            city: values.city,
            district: values.district,
            mobile: values.mobile,
            consignee: values.consignee,
            address: values.address,
            addressLabel: values.addressLabel,
            postalCode: values.postalCode,
            priority: values.priority,
          }
        }
        console.log(values)
        actions.addSubExtendData(values)
      }
    });
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="ant-layout-content">
        <Card title='添加地址信息' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="行政区划代码：" {...formItemLayout} >
                {getFieldDecorator('code', {
                  rules: [{required: true, message: '请输入行政区划代码！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="省：" {...formItemLayout} >
                {getFieldDecorator('province', {
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="市：" {...formItemLayout} >
                {getFieldDecorator('city', {
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="区：" {...formItemLayout} >
                {getFieldDecorator('district', {
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="手机：" {...formItemLayout} >
                {getFieldDecorator('mobile', {
                  rules: [{required: true, message: '请输入手机号码！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="收件人：" {...formItemLayout} >
                {getFieldDecorator('consignee', {
                  rules: [{required: true, message: '请输入收件人！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="地址：" {...formItemLayout} >
                {getFieldDecorator('address', {
                  rules: [{required: true, message: '请输入地址！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="地址标签：" {...formItemLayout} >
                {getFieldDecorator('addressLabel', {
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="邮政编码：" {...formItemLayout} >
                {getFieldDecorator('postalCode', {
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="优先级：" {...formItemLayout} >
                {getFieldDecorator('priority', {})(
                  <InputNumber placeholder="可输入0-9的数字" style={{width: 200}} min={0} max={9}/>
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

const SubExtendAdd = Form.create()(DataAdd);

SubExtendAdd.PropTypes = {
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    extendInfomationData: state.extendInfomationData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubExtendAdd)



