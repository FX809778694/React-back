import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/translate/actions/task'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";

class TasksDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchTranslateTask(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const { actions } = this.props
    actions.clearTranslateTasks()
  }
  render() {
    const {data} = this.props
    const {loading} = this.state
    return (
      <Card loading={loading} title={data && data.title} bordered={true}>
        { data &&
          <Form layout={'horizontal'}>
            <Items label="ID" data={data.id}/>
            <Items label="翻译标题" data={data.post && data.post.title}/>
            <Items label="翻译描述" data={data.post && data.post.description}/>
            <Items label="翻译内容" data={data.post &&
              <div style={{border: '1px solid #eee', padding: '24px 32px'}}
                   dangerouslySetInnerHTML={{__html: data.post.content}}/>}/>
            <Items label="创建人" data={data.creater}/>
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

TasksDetail.PropTypes = {
  videosDetail: PropTypes.array.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(TasksDetail)
