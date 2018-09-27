import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/userCenter/roles/actions/index'
import {Button, Card, Form, Input, Select} from 'antd';
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'

const FormItem = Form.Item;
const {TextArea} = Input;
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
            siteId: values.siteId,
            name: values.name,
            description: values.description,
            enabled: values.enabled,
          }
        }
        console.log(values)
        actions.addRolesData(values)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Card title='添加群组信息' bordered={true}>
          {
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="站点ID：" {...formItemLayout} >
                {getFieldDecorator('siteId', {
                  rules: [{required: true, message: '请输入站点ID！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="角色名：" {...formItemLayout} >
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入角色名！', whitespace: true}],
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="群组描述：" {...formItemLayout} >
                {getFieldDecorator('description', {})(
                  <TextArea rows={4}/>
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



