import React, {Component} from 'react';
import {Button, Card, Form, Input, InputNumber, Select, Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/votes/actions/votesOptions'
import {buttonItemLayout, formItemLayout} from '../../../../constants/FormConst'
import {articleVotesOptUrl} from "../../../../api/url";

const Option = Select.Option;
const FormItem = Form.Item;
const {TextArea} = Input;

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postDate: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getData(){
    const {actions,params} = this.props
    actions.fetchDataByKey(`${articleVotesOptUrl}/${params.id[params.id.length-1]}`)
  }

  //点击提交按钮
  handleSubmit = (e) => {
    const {votesOption, actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = {
          data: {
            voteId: votesOption.items.voteId,
            voteOptionText: values.voteOptionText,
            voteOptionCount: values.voteOptionCount,
            displayOrder: values.displayOrder,
            enabled: values.enabled
          }
        }
        console.log(values)
        actions.editVotesOptionsData(values, votesOption.items.id)
      }
    });
  }

  componentDidMount() {
    this.getData()
  }

  componentWillReceiveProps({votesOption}) {
    votesOption.items &&
    this.setState({
      loading: false,
    })
  }

  componentWillUnmount() {
    const {actions} = this.props
    actions.clearData()
  }

  render() {
    const {votesOption} = this.props
    const {getFieldDecorator} = this.props.form;


    return (
      <div className="ant-layout-content">
        <Spin spinning={this.state.loading}>
          <Card title={`投票信息修改 —— ${votesOption.items && votesOption.items.voteOptionText}`} bordered={true}>
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
              <FormItem label="选项描述：" {...formItemLayout} >
                {getFieldDecorator('voteOptionText', {
                  initialValue: votesOption.items.voteOptionText
                })(
                  <TextArea rows={4}/>
                )}
              </FormItem>

              <FormItem label="选项票数：" {...formItemLayout} >
                {getFieldDecorator('voteOptionCount', {
                  initialValue: votesOption.items.voteOptionCount
                })(
                  <InputNumber/>
                )}
              </FormItem>

              <FormItem label="选项排序：" {...formItemLayout} >
                {getFieldDecorator('displayOrder', {
                  initialValue: votesOption.items.displayOrder
                })(
                  <InputNumber/>
                )}
              </FormItem>

              <FormItem label="是否可用：" {...formItemLayout} >
                {getFieldDecorator('enabled', {
                  initialValue: String(votesOption.items.enabled)
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

const SubVotesModify = Form.create()(DataModify);

SubVotesModify.PropTypes = {
  votesOption: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    votesOption: state.votesOption
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubVotesModify)
