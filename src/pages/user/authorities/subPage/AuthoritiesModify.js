import React, {Component} from 'react';
import {Button, Card, Form, Input, InputNumber, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/userCenter/authorities/actions/index'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {userAuthUrl} from "../../../../api/url";

const {TextArea} = Input;
const Option = Select.Option;
const FormItem = Form.Item;

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authType: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onAuthTypeChange = this.onAuthTypeChange.bind(this)
  }

  onAuthTypeChange(selected){
    this.setState({
      authType: selected
    })
  }

  //点击提交按钮
  handleSubmit = (e) => {
    const {authority, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
        actions.editAuthoritiesData(authority.items.id, values)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${userAuthUrl}/${params.id}`)
  }

  componentWillReceiveProps({authority}) {
    authority.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUpdate(nextProps, nextState){
    this.props.authority !== nextProps.authority &&
      this.setState({
        authType: String(nextProps.authority.items.authType)
      })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {authority} = this.props
    const {getFieldDecorator} = this.props.form;
    console.log(this.state.authType)

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`修改群组信息 -- ${authority.items && authority.items.name}`} bordered={true}>
            {authority.items &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
              <FormItem label="站点ID：" {...formItemLayout} >
                {getFieldDecorator('siteId', {
                  rules: [{required: true, message: '请输入站点ID！', whitespace: true}],
                  initialValue: String(authority.items.siteId)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="权限名：" {...formItemLayout} >
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入群组名！', whitespace: true}],
                  initialValue: authority.items.name
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="权限类型：" {...formItemLayout} >
                {getFieldDecorator('authType', {
                  rules: [{required: true, message: '请输入权限类型！', whitespace: true}],
                  initialValue: String(authority.items.authType)
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
                  initialValue: authority.items.description
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="优先级：" {...formItemLayout} >
                {getFieldDecorator('priority', {
                  initialValue: String(authority.items.priority)
                })(
                  <InputNumber placeholder="取值为-128~127" min={-128} max={127}/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(authority.items.enabled)
                })(
                  <Select>
                    <Option value="0">删除</Option>
                    <Option value="1">启用</Option>
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

const AuthoritiesModify = Form.create()(DataModify);

AuthoritiesModify.PropTypes = {
  authority: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    authority: state.authority
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthoritiesModify)
