import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/configs/actions/topics'
import {InputNumItem, Items, ChooseSelectItem, ButtonItem} from "../../../../component/FormItem";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    const {data, actions, form} = this.props
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            boost: values.boost,
            trainSample: values.trainSample,
            categoryId:values.categoryId
          }
        }
        actions.editTopicsData(values, data.id)
      }
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchTopicsDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearConfigsDetail()
  }
  render() {
    const { data } = this.props
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state
    return (
      <Card loading={loading} title={`主题修改 —— ${data.post && data.post.title}`} bordered={true}>
        { data &&
          <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
            <Items label="标题：" data={data.post && data.post.title}/>
            <InputNumItem label="搜索引擎助推数" getFieldDecorator={getFieldDecorator} id='boost' initialValue={data.boost}/>
            <ChooseSelectItem label='是否加入到训练样本集中' id='trainSample' getFieldDecorator={getFieldDecorator} initialValue={data.trainSample}/>
            <InputNumItem label="人工标注的分类ID" getFieldDecorator={getFieldDecorator} id='categoryId' initialValue={data.categoryId}/>
            <ButtonItem/>
          </Form>
        }
      </Card>
    )
  }
}
const TopicsModify = Form.create()(DataModify);

TopicsModify.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.configs.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopicsModify)
