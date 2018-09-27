import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/question/actions/quizsCount'
import {Card, Form} from 'antd';
import {ButtonItem, InputNumItem} from "../../../../component/FormItem";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    const {actions} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        values = {
          data: {
            quizId: values.quizId,
            peoples: values.peoples,
            first: values.first,
            second: values.second,
            third: values.third,
            fourth: values.fourth,
            fifth: values.fifth,
            sixth: values.sixth,
            seventh: values.seventh,
            eighth: values.eighth,
            ninth: values.ninth,
            tenth: values.tenth,
          }
        }
        actions.addQuizsCountData(values)
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Card title='新增问卷统计' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputNumItem label="问卷ID" getFieldDecorator={getFieldDecorator} id="quizId" required={true}/>
          <InputNumItem label="答题人数" getFieldDecorator={getFieldDecorator} id="peoples"/>
          <InputNumItem label="0-9%" getFieldDecorator={getFieldDecorator} id="first"/>
          <InputNumItem label="10-19%" getFieldDecorator={getFieldDecorator} id="second"/>
          <InputNumItem label="20-29%" getFieldDecorator={getFieldDecorator} id="third"/>
          <InputNumItem label="30-39%" getFieldDecorator={getFieldDecorator} id="fourth"/>
          <InputNumItem label="40-49%" getFieldDecorator={getFieldDecorator} id="fifth"/>
          <InputNumItem label="50-59%" getFieldDecorator={getFieldDecorator} id="sixth"/>
          <InputNumItem label="60-69%" getFieldDecorator={getFieldDecorator} id="seventh"/>
          <InputNumItem label="70-79%" getFieldDecorator={getFieldDecorator} id="eighth"/>
          <InputNumItem label="80-89%" getFieldDecorator={getFieldDecorator} id="ninth"/>
          <InputNumItem label="90-100%" getFieldDecorator={getFieldDecorator} id="tenth"/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const QuizsCountAdd = Form.create()(DataAdd);

QuizsCountAdd.PropTypes = {
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    backImg: state.questions.backImg
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizsCountAdd)
