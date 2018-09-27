import React, {Component} from 'react';
import {Button, Card, Form, Input, InputNumber, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/extendInfomation/actions/SubIndex'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {addressUrl} from "../../../../api/url";

const FormItem = Form.Item;

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //点击提交按钮
  handleSubmit = (e) => {
    const {extendInfomationDetail, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
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
        actions.EditSubExtendData(values, extendInfomationDetail.items.id)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props

    actions.fetchDataByKey(`${addressUrl}/${params.id[params.id.length-1]}`)
  }

  componentWillReceiveProps({extendInfomationDetail}) {
    extendInfomationDetail.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {extendInfomationDetail} = this.props
    const {getFieldDecorator} = this.props.form

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`地址信息修改 —— ${extendInfomationDetail.items.id}`} bordered={true}>
            {extendInfomationDetail.items.id &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="行政区划代码：" {...formItemLayout} >
                {getFieldDecorator('code', {
                  rules: [{required: true, suggestion: '请输入行政区划代码！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.code)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="省：" {...formItemLayout} >
                {getFieldDecorator('province', {
                  initialValue: String(extendInfomationDetail.items.province)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="市：" {...formItemLayout} >
                {getFieldDecorator('city', {
                  initialValue: String(extendInfomationDetail.items.city)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="区：" {...formItemLayout} >
                {getFieldDecorator('district', {
                  initialValue: String(extendInfomationDetail.items.district)
                })(
                  <Input/>
                )}
              </FormItem>


              <FormItem label="手机：" {...formItemLayout} >
                {getFieldDecorator('mobile', {
                  rules: [{required: true, suggestion: '请输入手机！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.mobile)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="收件人：" {...formItemLayout} >
                {getFieldDecorator('consignee', {
                  rules: [{required: true, suggestion: '请输入收件人！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.consignee)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="地址：" {...formItemLayout} >
                {getFieldDecorator('address', {
                  rules: [{required: true, suggestion: '请输入地址！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.address)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="地址标签：" {...formItemLayout} >
                {getFieldDecorator('addressLabel', {
                  initialValue: String(extendInfomationDetail.items.addressLabel)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="邮政编码：" {...formItemLayout} >
                {getFieldDecorator('postalCode', {
                  initialValue: String(extendInfomationDetail.items.postalCode)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="优先级：" {...formItemLayout} >
                {getFieldDecorator('priority', {
                  initialValue: String(extendInfomationDetail.items.priority)
                })(
                  <InputNumber placeholder="可输入0-9的数字" style={{width: 200}} min={0} max={9}/>
                )}
              </FormItem>

              {/*按钮组*/}
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
        </Spin>
      </div>
    )
  }
}

const SubExtendModify = Form.create()(DataModify);

SubExtendModify.PropTypes = {
  extendInfomationDetail: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    extendInfomationDetail: state.extendInfomationDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubExtendModify)
