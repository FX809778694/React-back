import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/data/actions/topicModal'
import {Card, Form} from 'antd';
import {ArticleTypeItem, InputItem, ButtonItem} from "../../../../component/FormItem";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    let {actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            forumId: values.forumId,
            modelName: values.modelName,
          }
        }
        actions.addTopicsModelData(values)
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title='添加模型' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="模型名称" getFieldDecorator={getFieldDecorator} id='modelName' required={true}/>
          <ArticleTypeItem label="版块名称" getFieldDecorator={getFieldDecorator} required={true}/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const TopicsModelAdd = Form.create()(DataAdd);

TopicsModelAdd.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(TopicsModelAdd)
