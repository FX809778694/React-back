import React, {Component} from 'react';
import {Form, Input, Button, Spin, Card, Select, InputNumber} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/dbCategory/actions/index'
import {formItemLayout, buttonItemLayout} from '../../../../constants/FormConst'
import {rewardCateUrl} from "../../../../api/url";

const Option = Select.Option;
const FormItem = Form.Item;

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  //点击提交按钮
  handleSubmit = (e) => {
    const {dbCategory, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
            name: values.name,
            cssClass: values.cssClass,
            enabled: values.enabled,
            order: values.order
          }
        }
        console.log(values)
        actions.editDbCategoriesData(dbCategory.items.id, values)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${rewardCateUrl}/${params.id}`)
  }

  componentWillReceiveProps({dbCategory}) {
    dbCategory.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {dbCategory} = this.props
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`夺宝类别修改 —— ${dbCategory.items && dbCategory.items.name}`} bordered={true}>
            {dbCategory.items &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              {/*类别名称*/}
              <FormItem label="类别名称：" {...formItemLayout} >
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入类别名称！', whitespace: true}],
                  initialValue: dbCategory.items.name
                })(
                  <Input/>
                )}
              </FormItem>

              {/*显示css的class*/}
              <FormItem label="显示css的class：" {...formItemLayout} >
                {getFieldDecorator('cssClass', {
                  rules: [{required: true, message: '请输入显示css的class！', whitespace: true}],
                  initialValue: dbCategory.items.cssClass
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="排序：" {...formItemLayout} >
                {getFieldDecorator('order', {
                  initialValue: String(dbCategory.items.order)
                })(
                  <InputNumber/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(dbCategory.items.enabled)
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

const DbCategoriesModify = Form.create()(DataModify);

DbCategoriesModify.PropTypes = {
  dbCategory: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    dbCategory: state.dbCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DbCategoriesModify)
