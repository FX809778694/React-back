import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/question/actions/quizsCount'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";

class QuizsDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
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
    const {loading} = this.state
    return (
      <Card loading={loading} title={data && data.title} bordered={true}>
        { data &&
        <Form layout={'horizontal'}>
          <Items label="ID" data={data.id}/>
          <Items label="问卷ID" data={data.quizId}/>
          <Items label="答题人数" data={data.peoples}/>
          <Items label="是否可用" data={data.enabled === 0 ? '不可用' : data.enabled === 1 ? '可用' : data.enabled}/>
          <Items label="0-9%" data={data.first}/>
          <Items label="10-19%" data={data.second}/>
          <Items label="20-29%" data={data.third}/>
          <Items label="30-39%" data={data.fourth}/>
          <Items label="40-49%" data={data.fifth}/>
          <Items label="50-59%" data={data.sixth}/>
          <Items label="60-69%" data={data.seventh}/>
          <Items label="70-89%" data={data.eighth}/>
          <Items label="80-89%" data={data.ninth}/>
          <Items label="90-100%" data={data.tenth}/>
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
