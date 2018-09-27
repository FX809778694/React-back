import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../store/articles/actions'
import {Form, Card, Table} from 'antd';
import PropTypes from 'prop-types'
import {featuresColumns} from '../../../constants/FormConst'
import {Items, BackButton} from "../../../component/FormItem";

class SubDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchSubDetailByKey(params.id[params.id.length-1])
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearSubArticleDetail()
  }
  render() {
    const { data } = this.props
    const { loading } = this.state
    return (
      <Card loading={loading} title={`二级详情 -- ${ data && data.title }`} bordered={true}>
        { data &&
          <Form layout={'horizontal'}>
            <Items label="ID：" data={data.id}/>
            <Items label="父ID：" data={data.parentId}/>
            <Items label="TopicID：" data={data.topicId}/>
            <Items label="产品标题：" data={data.title}/>
            <Items label="文章类型：" data={data.postTypeValue}/>
            <Items label="是否可用：" data={data.enabled === 0 ? '不可用' : data.enabled === 1 ? '可用' : data.enabled}/>
            <Items label="描述：" data={data.post && data.post.description}/>
            <Items label="内容：" data={
              <div style={{border: '1px solid #eee', padding: '24px 32px'}}
                   dangerouslySetInnerHTML={{__html: data.content}}/>}/>
            <Items label="属性：" data={
              <Table size="small" columns={featuresColumns} dataSource={data.features}
                     rowKey={record => record._name} pagination={false} loading={loading} bordered />}
            />
            <Items label="语言：" data={ data.language === 0 ? '未知'
                : data.language === 1 ? '中文' : data.language === 2 ? '英文' : data.language
            }/>
            <Items label="优先级：" data={data.priority}/>
            <Items label="创建人：" data={data.creator}/>
            <Items label="修改人：" data={data.modifier}/>
            <Items label="创建时间：" data={data.created}/>
            <Items label="修改时间：" data={data.modified}/>
            <BackButton />
          </Form>
        }
      </Card>
    )
  }
}
SubDetail.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.articles.subTableDetail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SubDetail)
