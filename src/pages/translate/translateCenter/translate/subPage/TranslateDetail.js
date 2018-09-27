import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../../store/translate/actions/translate'
import {Button, Card, Form, Input, Select, Table} from 'antd';
import PropTypes from 'prop-types'
import '../../../../../assets/translate.less'

const FormItem = Form.Item;
const Option = Select.Option;

class DataCollection extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.Audit = this.Audit.bind(this)
  }
  Audit(e) {
    let {actions, data} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            state: values.state,
            remark: values.remark,
          }
        }
        actions.AuditData(data.moderation.id, values)
      }
    })
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchTranslateAuditDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearTranslateDetail()
  }
  render() {
    const {data} = this.props
    const {getFieldDecorator} = this.props.form;
    const {loading} = this.state
    const columns = [
      {
        title: '名称',
        dataIndex: '_name',
        key: '_name',
      }, {
        title: '参数',
        dataIndex: '_value',
        key: '_value',
      }
    ];
    return (
      <Card loading={loading} title='精翻详情' bordered={true}>
        {
          data.parent &&
          <div>
            <div className="middle-title">
              <div className="middle-title-con trans-box-l">原文</div>
              <div className="middle-title-con trans-box-r">翻译</div>
            </div>
            <div className="small-title">
              <div className="small-title-item trans-box-l"><span>原文标题</span></div>
              <div className="small-title-item trans-box-r"><span>精翻标题</span></div>
            </div>
            <div className="trans-title">
              <div className="trans-box-l">{data.parent.title}</div>
              <div className="trans-box-r">{data.title}</div>
            </div>
            <div className="small-title">
              <div className="small-title-item trans-box-l"><span>原文描述</span></div>
              <div className="small-title-item trans-box-r"><span>精翻描述</span></div>
            </div>
            <div className="trans-description">
              <div className="trans-box-l">{data.parent.description}</div>
              <div className="trans-box-r">{data.description}</div>
            </div>
            <div className="small-title">
              <div className="small-title-item trans-box-l"><span>原文内容</span></div>
              <div className="small-title-item trans-box-r"><span>精翻内容</span></div>
            </div>
            <div className="trans-description">
              <div className="trans-box-l" dangerouslySetInnerHTML={{__html: data.parent.content}}/>
              <div className="trans-box-r" dangerouslySetInnerHTML={{__html: data.content}}/>
            </div>
            <div className="small-title">
              <div className="small-title-item trans-box-l"><span>原文参数</span></div>
              <div className="small-title-item trans-box-r"><span>精翻参数</span></div>
            </div>
            <div className="trans-description">
              <div className="trans-box-l">
                <Table
                  size="small"
                  columns={columns}
                  dataSource={data.parent.features}
                  rowKey={record => record._name}
                  pagination={false}
                  loading={this.state.loading}
                  bordered
                />
              </div>
              <div className="trans-box-r">
                <Table
                  size="small"
                  columns={columns}
                  dataSource={data.features}
                  rowKey={record => record._name}
                  pagination={false}
                  loading={this.state.loading}
                  bordered
                />
              </div>
            </div>

            {
              // 应设置审核的from表单在已翻状态时才显示，现在数据里没有state的字段，故无法判断
              data.moderation && data.moderation.state === 2 &&
              <div className="form">
                <div className="trans-box-l"/>
                <div className="trans-box-r">
                  <Form layout={'horizontal'} onSubmit={this.Audit}>
                    <FormItem label="审核状态：">
                      {getFieldDecorator('state', {
                        rules: [{required: true, message: '请选择审核状态！', whitespace: true}],
                      })(
                        <Select>
                          <Option value="3">审核通过</Option>
                          <Option value="4">审核失败</Option>
                        </Select>
                      )}
                    </FormItem>
                    <FormItem label="审核标记：">
                      {getFieldDecorator('remark', {
                        rules: [{required: true, message: '请填写审核标记！', whitespace: true}],
                      })(
                        <Input type="textarea" rows={4}/>
                      )}
                    </FormItem>
                    <div className="buttonGroup">
                      <Button size="large" type="primary" htmlType="submit">审核</Button>
                      <Button type="info"
                              size="large"
                              className="customBtn"
                              onClick={() => {
                                window.history.back()
                              }}
                              style={{marginLeft: '20px'}}
                      >返回</Button>
                    </div>
                  </Form>
                </div>
              </div>
            }
          </div>
        }
      </Card>
    )
  }
}
const TranslateDetail = Form.create()(DataCollection);

TranslateDetail.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.translate.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TranslateDetail)

