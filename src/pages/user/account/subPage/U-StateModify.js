import React, {Component} from 'react';
import {Button, Card, Form, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/userCenter/user/actions/index'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {apiUserUrl} from "../../../../api/url";

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
    const {userDetail, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
            enabled: values.enabled,
          }
        }
        console.log(values)
        actions.editUserData(userDetail.items.id, values)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${apiUserUrl}/${params.id}`)
  }

  componentWillReceiveProps({userDetail}) {
    userDetail.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {userDetail} = this.props
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`修改用户状态 -- ${userDetail.items && userDetail.items.username}`} bordered={true}>
            {userDetail.items &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>

              <FormItem label="用户ID：" {...formItemLayout} >
                {userDetail.items && userDetail.items.id}
              </FormItem>

              <FormItem label="用户名：" {...formItemLayout} >
                {userDetail.items && userDetail.items.username}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  rules: [{
                    required: true, message: '用选择启用状态！', whitespace: true,
                  }],
                  initialValue: String(userDetail.items.enabled)
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

const UStateModify = Form.create()(DataModify);

UStateModify.PropTypes = {
  userDetail: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    userDetail: state.userDetail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UStateModify)
