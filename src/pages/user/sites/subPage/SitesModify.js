import React, {Component} from 'react';
import {Button, Card, Form, Input, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/userCenter/sites/actions/index'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {userSitesUrl} from "../../../../api/url";

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
    const {site, actions} = this.props
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
        actions.editSitesData(site.items.id, values)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${userSitesUrl}/${params.id}`)
  }

  componentWillReceiveProps({site}) {
    site.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {site} = this.props
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`修改站点信息 -- ${site.items && site.items.name}`} bordered={true}>
            {site.items &&
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
              <FormItem label="站点名：" {...formItemLayout} >
                {getFieldDecorator('name', {
                  rules: [{required: true, message: '请输入用户名！', whitespace: true}],
                  initialValue: site.items.name
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="域名：" {...formItemLayout} >
                {getFieldDecorator('domain', {
                  rules: [{required: true, message: '请输入用户名！', whitespace: true}],
                  initialValue: site.items.domain
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="appKey：" {...formItemLayout} >
                {getFieldDecorator('appKey', {
                  initialValue: site.items.appKey
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="appSecret：" {...formItemLayout} >
                {getFieldDecorator('appSecret', {
                  initialValue: site.items.appSecret
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="站点描述：" {...formItemLayout} >
                {getFieldDecorator('description', {
                  initialValue: site.items.description
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(site.items.enabled)
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

const SitesModify = Form.create()(DataModify);

SitesModify.PropTypes = {
  site: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    site: state.site
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SitesModify)
