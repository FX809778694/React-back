import React, {Component} from 'react';
import {Button, Card, Form, Input, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/extendInfomation/actions/index'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {profilesUrl} from "../../../../api/url";

const FormItem = Form.Item;
const Option = Select.Option;

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
            nickname: values.nickname,
            cityId: values.cityId,
            fullname: values.fullname,
            mobile: values.mobile,
            email: values.email,
            userAvatar: values.userAvatar,
            company: values.company,
            birthday: values.birthday,
            gender: values.gender,
            profession: values.profession
          }
        }
        console.log(values)
        actions.EditExtendInfomationData(values, extendInfomationDetail.items.id)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${profilesUrl}/${params.id}/admin`)
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
          <Card title={`扩展信息修改 —— ${extendInfomationDetail.items.id}`} bordered={true}>
            {extendInfomationDetail.items.id &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="昵称：" {...formItemLayout} >
                {getFieldDecorator('nickname', {
                  rules: [{required: true, suggestion: '请输入昵称！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.nickname)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="城市ID：" {...formItemLayout} >
                {getFieldDecorator('cityId', {
                  rules: [{required: true, suggestion: '请输入城市ID！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.cityId)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="真实姓名：" {...formItemLayout} >
                {getFieldDecorator('fullname', {
                  initialValue: String(extendInfomationDetail.items.fullname)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="手机：" {...formItemLayout} >
                {getFieldDecorator('mobile', {
                  initialValue: String(extendInfomationDetail.items.mobile)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="邮箱：" {...formItemLayout} >
                {getFieldDecorator('email', {
                  rules: [{required: true, suggestion: '请输入邮箱！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.email)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="用户头像：" {...formItemLayout} >
                {getFieldDecorator('userAvatar', {
                  initialValue: String(extendInfomationDetail.items.userAvatar)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="公司：" {...formItemLayout} >
                {getFieldDecorator('company', {
                  rules: [{required: true, suggestion: '请输入公司！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.company)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="职业：" {...formItemLayout} >
                {getFieldDecorator('profession', {
                  rules: [{required: true, suggestion: '请输入职业！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.profession)
                })(
                  <Input/>
                )}
              </FormItem>
              <FormItem label="生日：" {...formItemLayout} >
                {getFieldDecorator('birthday', {
                  rules: [{required: true, suggestion: '请输入职业生日！', whitespace: true}],
                  initialValue: String(extendInfomationDetail.items.birthday)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="性别：" {...formItemLayout} >
                {getFieldDecorator('gender', {
                  initialValue: String(extendInfomationDetail.items.gender)
                })(
                  <Select>
                    <Option value="0">保密</Option>
                    <Option value="1">男</Option>
                    <Option value="2">女</Option>
                  </Select>
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

const ExtendInfomationModify = Form.create()(DataModify);

ExtendInfomationModify.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtendInfomationModify)
