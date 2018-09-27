import React, {Component} from 'react';
import {Button, Card, DatePicker, Form, Input, InputNumber, Radio, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/votes/actions/index'
import {buttonItemLayout, dateFormat, formItemLayout} from '../../../../constants/FormConst'
import moment from 'moment';
import {articleVotesUrl} from "../../../../api/url";

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postDate: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeData = this.onChangeData.bind(this)
  }

  //选择日期时触发
  onChangeData(data, dateString) {
    this.setState({
      postDate: dateString
    })
  }
  //点击提交按钮
  handleSubmit = (e) => {
    const {vote, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
            voteType: values.voteType,
            voteText: values.voteText,
            voteStart: this.state.postDate,
            voteLength: values.voteLength,
            enabled: values.enabled
          }
        }
        console.log(values)
        actions.editVotesData(values, vote.items.id)
      }
    });
  }

  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchDataByKey(`${articleVotesUrl}/${params.id}`)
  }

  componentWillReceiveProps({vote}) {
    vote.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {vote} = this.props
    const {getFieldDecorator} = this.props.form;

    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`投票信息修改 —— ${vote.items && vote.items.voteText}`} bordered={true}>
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
              <FormItem label="投票描述：" {...formItemLayout} >
                {getFieldDecorator('voteText', {
                  initialValue: vote.items.voteText
                })(
                  <Input/>
                )}
              </FormItem>

              <FormItem label="投票类型：" {...formItemLayout} >
                {getFieldDecorator('voteType', {
                  initialValue: String(vote.items.voteType)
                })(
                  <RadioGroup>
                    <Radio value='CHECKBOX'>CHECKBOX</Radio>
                    <Radio value='RADIO'>RADIO</Radio>
                  </RadioGroup>
                )}
              </FormItem>

              <FormItem label="投票开始时间：" {...formItemLayout} >
                {getFieldDecorator('voteStart', {
                  initialValue: vote.items.voteStart && moment(vote.items.voteStart, dateFormat)
                })(
                  <DatePicker
                    showTime
                    format={dateFormat}
                    onChange={this.onChangeData}/>
                )}
              </FormItem>

              <FormItem label="投票期限：" {...formItemLayout} >
                {getFieldDecorator('voteLength', {
                  initialValue: vote.items.voteLength
                })(
                  <InputNumber />
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(vote.items.enabled)
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
          </Card>
        </Spin>
      </div>
    )
  }
}

const VotesModify = Form.create()(DataModify);

VotesModify.PropTypes = {
  vote: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    vote: state.vote
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VotesModify)
