import React, {Component} from 'react';
import {Button, Card, Form, Input, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/userCenter/groups/actions/index'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {userGroupsUrl} from "../../../../api/url";

const {TextArea} = Input;
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
    const {group, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
            siteId: values.siteId,
            groupName: values.groupName,
            description: values.description,
            enabled: values.enabled,
          }
        }
        console.log(values)
        actions.editGroupsData(group.items.id, values)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${userGroupsUrl}/${params.id}`)
  }

  componentWillReceiveProps({group}) {
    group.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {group} = this.props
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`修改群组信息 -- ${group.items && group.items.groupName}`} bordered={true}>
            {group.items &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
              <FormItem label="站点ID：" {...formItemLayout} >
                {getFieldDecorator('siteId', {
                  rules: [{required: true, message: '请输入站点ID！', whitespace: true}],
                  initialValue: String(group.items.siteId)
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="群组名：" {...formItemLayout} >
                {getFieldDecorator('groupName', {
                  rules: [{required: true, message: '请输入群组名！', whitespace: true}],
                  initialValue: group.items.groupName
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="站点描述：" {...formItemLayout} >
                {getFieldDecorator('description', {
                  initialValue: group.items.description
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(group.items.enabled)
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

const GroupsModify = Form.create()(DataModify);

GroupsModify.PropTypes = {
  group: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    group: state.group
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsModify)
