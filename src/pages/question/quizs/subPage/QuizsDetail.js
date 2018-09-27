import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/question/actions/quizs'
import {Card, Form, Icon} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";
import {formItemLayout} from "../../../../constants/FormConst";
const FormItem = Form.Item;

class QuizsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchQuizsDetail(params.id)
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
    const {loading} = this.state
    const ques = data.questions || []
    return (
      <Card loading={loading} title={data && data.title} bordered={true}>
        { data &&
        <Form layout={'horizontal'}>
          <Items label="ID" data={data.id}/>
          <Items label="问卷标题" data={data.title}/>
          <Items label="问卷描述：" data={data.description}/>
          <Items label="是否可用" data={data.enabled === 0 ? '不可用' : data.enabled === 1 ? '可用' : data.enabled}/>
          <Items label="题目个数：" data={data.questionNum}/>
          <Items label="问卷状态" data={data.state === 0 ? '待发布' : data.state === 1 ? '发布中' : data.state === 2 ? '结束发布' : data.state}/>
          { ques.map((i, index) =>
            <Card title={<div className="textAlign-center">{`试题${index + 1}`}</div>} key={index + 1} style={{marginBottom: '30px'}} noHovering={true}>
              <Items label="试题ID" data={i.id}/>
              <Items label="试题标题" data={i.questionTitle}/>
              <Items label="试题类型" data={i.type === 1 ? '单选' : i.type === 2 ? '多选' : i.type}/>
              <Items label="排序" data={i.displayOrder}/>
              <FormItem label="选项" {...formItemLayout}>
                { i.options.map((i, index) => <div key={index} style={{lineHeight: '1.5'}}>{i.isCorrect ? <Icon style={{color: 'green'}} type="check" /> : <Icon style={{color: 'red'}} type="close" />} {i.optionTitle}</div>) }
              </FormItem>
            </Card>
          )}
          <Items label="创建人" data={data.creator}/>
          <Items label="修改人" data={data.modifier}/>
          <Items label="创建时间" data={data.created}/>
          <Items label="修改时间" data={data.modified}/>
          <BackButton/>
        </Form>
        }
      </Card>
    )
  }
}
QuizsDetail.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(QuizsDetail)
