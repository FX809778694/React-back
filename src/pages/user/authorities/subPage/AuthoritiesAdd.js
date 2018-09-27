import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/userCenter/authorities/actions/index'
import {Button, Card, Form, Input, InputNumber, Select} from 'antd';
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authType: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onAuthTypeChange = this.onAuthTypeChange.bind(this)
    this.functionClassValidate = this.functionClassValidate.bind(this)
    this.functionSignatureValidate = this.functionSignatureValidate.bind(this)
  }

  functionClassValidate = (rule, value, callback) => {
    const regFunClass = /([a-zA-Z0-9]+(.[a-zA-Z0-9]+)*)/
    if (value && (regFunClass.test(value))) {
      callback()
    }
    callback('需符合正则表达式 ([a-zA-Z0-9]+(.[a-zA-Z0-9]+)*)')
  }

  functionSignatureValidate = (rule, value, callback) => {
    const regFunClass = /^[a-zA-Z_][a-zA-Z0-9_]*/
    if (value && (regFunClass.test(value))) {
      callback()
    }
    callback('需符合正则表达式 ^[a-zA-Z_][a-zA-Z0-9_]*')
  }

  onAuthTypeChange(selected){
    this.setState({
      authType: selected
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
            siteId: values.siteId,
            authType: values.authType,
            name: values.name,
            description: values.description,
            priority: values.priority,
            enabled: values.enabled,
            authOperation : {
              args: values.authOperation.args,
              argsLength: values.authOperation.argsLength,
              functionSignature: values.authOperation.functionSignature,
              functionClass: values.authOperation.functionClass,
              enabled: values.authOperation.enabled,
            }
          }
        }
        console.log(values)
        actions.addAuthoritiesData(values)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Card title='添加权限信息' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="站点ID：" {...formItemLayout} >
                {getFieldDecorator('siteId', {
                  rules: [{required: true, message: '请输入站点ID！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="权限名：" {...formItemLayout} >
                {getFieldDecorator('name', {
                  rules: [
                    {required: true, message: '请输入角色名！', whitespace: true},
                    {min: 2, message: '角色名过短，字符限制 2-100！'},
                    {max: 100, message: '角色名过长，字符限制 2-100！'}
                  ],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="权限类型：" {...formItemLayout} >
                {getFieldDecorator('authType', {
                  rules: [{required: true, message: '请输入权限类型！', whitespace: true}],
                  initialValue: String(1)
                })(
                  <Select onChange={this.onAuthTypeChange}>
                    <Option value="1">1</Option>
                    <Option value="0">0</Option>
                  </Select>
                )}
              </FormItem>

              {
                this.state.authType === '0' &&
                <div>
                  <FormItem label="参数列表字符串：" {...formItemLayout} >
                    {getFieldDecorator('authOperation.args', {})(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem label="参数数量：" {...formItemLayout} >
                    {getFieldDecorator('authOperation.argsLength', {})(
                      <InputNumber min={0} max={255}/>
                    )}
                  </FormItem>
                  <FormItem label="authorityId：" {...formItemLayout} >
                    {getFieldDecorator('authOperation.authorityId', {})(
                      <InputNumber/>
                    )}
                  </FormItem>
                  <FormItem label="functionClass：" {...formItemLayout} >
                    {getFieldDecorator('authOperation.functionClass', {
                      rules: [
                        {required: true, message: '请输入functionClass', whitespace: true},
                        {max: 255, message: 'functionClass过长！'},
                        {validator: this.functionClassValidate}
                      ],
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem label="functionSignature：" {...formItemLayout} >
                    {getFieldDecorator('authOperation.functionSignature', {
                      rules: [
                        {required: true, message: '请输入functionSignature', whitespace: true},
                        {max: 50, message: 'functionClass过长！'},
                        {validator: this.functionSignatureValidate}
                      ],
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem label="authOperation是否启用：" {...formItemLayout} >
                    {getFieldDecorator('authOperation.enabled', {
                      initialValue: String(1)
                    })(
                      <Select>
                        <Option value="0">否</Option>
                        <Option value="1">是</Option>
                      </Select>
                    )}
                  </FormItem>
                </div>
              }

              <FormItem label="权限描述：" {...formItemLayout} >
                {getFieldDecorator('description', {
                  rules: [
                    {max: 255, message: '权限描述过长！'}
                  ],
                })(
                  <TextArea rows={4} />
                )}
              </FormItem>

              <FormItem label="优先级：" {...formItemLayout} >
                {getFieldDecorator('priority', {})(
                  <InputNumber placeholder="取值为-128~127" min={-128} max={127}/>
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

const RolesAdd = Form.create()(DataAdd);

RolesAdd.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RolesAdd)



