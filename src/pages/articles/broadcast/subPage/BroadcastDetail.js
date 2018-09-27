import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/articles/actions'
import {Card, Form, Table} from 'antd';
import PropTypes from 'prop-types'
import {featuresColumns} from '../../../../constants/FormConst'
import {Items, BackButton} from "../../../../component/FormItem";

class BroadcastDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const { actions, params } = this.props
    actions.fetchArticlesDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data &&
    this.setState({
      loading: false,
    })
  }
  componentWillUnmount() {
    const { actions } = this.props
    actions.clearArticleDetail()
  }
  render() {
    const { data } = this.props
    const { loading } = this.state
    return (
      <Card loading={loading} title={data.post && data.post.title} bordered={true}>
        { data &&
        <Form layout={'horizontal'}>
          <Items label="ID：" data={data.id}/>
          <Items label="模块标识：" data={data.forumName}/>
          <Items label="直播标题：" data={data.post && data.post.title}/>
          <Items label="直播描述：" data={data.post && data.post.description}/>
          <Items label="语言：" data={ data.post && (
            data.post.language === 0 ? '未知'
              : data.post.language === 1 ? '中文'
              : data.post.language === 2 ? '英文'
                : data.post.language
          )}/>
          <Items label="直播内容：" data={data.post &&
          <div style={{border: '1px solid #eee', padding: '24px 32px'}} dangerouslySetInnerHTML={{__html: data.post.content}}/>}/>
          <Items label="种子ID：" data={data.from && data.from.seedId}/>
          <Items label="人工分类ID：" data={data.categoryId}/>
          <Items label="直播属性：" data={data.post &&
            <Table size="small" columns={featuresColumns} dataSource={data.post.features}
                   rowKey={record => record._name} pagination={false} loading={loading} bordered />}
          />
          <Items label="类别：" data={data.post && data.post.categories.join(' ， ')}/>
          <Items label="标签：" data={data.post && data.post.tags.join(' ， ')}/>
          <Items label="发表时间：" data={data.created}/>
          <Items label="发表作者：" data={data.document && data.document.author}/>
          <Items label="关联品牌：" data={data.document && data.document.brands.join(' ， ')}/>
          <Items label="图片：" data={
            data.images && data.images.map(item =>
              <Card key={item.id} bodyStyle={{padding: 5}}>
                <img src={item.filename} alt="" style={{width: '100%'}}/>
              </Card>
            )}
          />
          <Items label="来源：" data={data.from && data.from.source}/>
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
BroadcastDetail.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.articles.detail
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BroadcastDetail)

