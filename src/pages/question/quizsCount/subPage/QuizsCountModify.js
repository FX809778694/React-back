import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/question/actions/quizsCount'
import {ButtonItem, ChooseSelectItem, InputNumItem} from "../../../../component/FormItem";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (e) => {
    const {actions, data} = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
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
            enabled: values.enabled
          }
        }
        actions.editQuizsCountData(values, data.id)
      }
    });
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchQuizsCountDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearQuestionsDetail()
  }
  render() {
    const {data} = this.props
    const {getFieldDecorator} = this.props.form;
    const {loading} = this.state
    return (
      <Card loading={loading} title={`调查问卷修改 —— ${data && data.quizId}`} bordered={true}>
        { data &&
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputNumItem label="问卷ID" getFieldDecorator={getFieldDecorator} id="quizId" initialValue={data.quizId} required={true}/>
          <ChooseSelectItem label="是否可用" getFieldDecorator={getFieldDecorator} id='enabled' initialValue={data.enabled} style={{width: '200px'}}/>
          <InputNumItem label="答题人数" getFieldDecorator={getFieldDecorator} id="peoples" initialValue={data.quizId}/>
          <InputNumItem label="0-9%" getFieldDecorator={getFieldDecorator} id="first" initialValue={data.first}/>
          <InputNumItem label="10-19%" getFieldDecorator={getFieldDecorator} id="second" initialValue={data.second}/>
          <InputNumItem label="20-29%" getFieldDecorator={getFieldDecorator} id="third" initialValue={data.third}/>
          <InputNumItem label="30-39%" getFieldDecorator={getFieldDecorator} id="fourth" initialValue={data.fourth}/>
          <InputNumItem label="40-49%" getFieldDecorator={getFieldDecorator} id="fifth" initialValue={data.fifth}/>
          <InputNumItem label="50-59%" getFieldDecorator={getFieldDecorator} id="sixth" initialValue={data.sixth}/>
          <InputNumItem label="60-69%" getFieldDecorator={getFieldDecorator} id="seventh" initialValue={data.seventh}/>
          <InputNumItem label="70-79%" getFieldDecorator={getFieldDecorator} id="eighth" initialValue={data.eighth}/>
          <InputNumItem label="80-89%" getFieldDecorator={getFieldDecorator} id="ninth" initialValue={data.ninth}/>
          <InputNumItem label="90-100%" getFieldDecorator={getFieldDecorator} id="tenth" initialValue={data.tenth}/>
          <ButtonItem/>
        </Form>
        }
      </Card>
    )
  }
}
const QuizsCountModify = Form.create()(DataModify);

QuizsCountModify.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.questions.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizsCountModify)
