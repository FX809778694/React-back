import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/articles/actions'
import {Card, Form, Table} from 'antd';
import PropTypes from 'prop-types'
import {featuresColumns} from '../../../../constants/FormConst'
import {Items, BackButton} from "../../../../component/FormItem";
import {TOPIC_TUNE_TYPE} from "../../../../utils/config";

class TunesDetail extends React.Component {
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
          <Items label="美频标题：" data={data.post && data.post.title}/>
          <Items label="美频描述：" data={data.post && data.post.description}/>
          <Items label="语言：" data={ data.post && (
            data.post.language === 0 ? '未知'
              : data.post.language === 1 ? '中文'
              : data.post.language === 2 ? '英文'
                : data.post.language
          )}/>
          <Items label="美频内容：" data={data.post &&
          <div style={{border: '1px solid #eee', padding: '24px 32px'}} dangerouslySetInnerHTML={{__html: data.post.content}}/>}/>
          <Items label="种子ID：" data={data.from && data.from.seedId}/>
          <Items label="人工分类ID：" data={data.categoryId}/>
          <Items label="美频属性：" data={data.post &&
            <Table size="small" columns={featuresColumns} dataSource={data.post.features}
                   rowKey={record => record._name} pagination={false} loading={loading} bordered />}
          />
          <Items label="类别：" data={data.post && data.post.categories.join(' ， ')}/>
          <Items label="标签：" data={data.post && data.post.tags.join(' ， ')}/>
          <Items label="美频文章类型：" data={ data.tune && TOPIC_TUNE_TYPE.find(i => i.id === data.tune.type).name }/>
          <Items label="发表作者：" data={data.tune && data.tune.author}/>
          <Items label="关联品牌：" data={data.tune && data.tune.brand}/>
          <Items label="标题别名：" data={data.tune && data.tune.name}/>
          <Items label="下载地址：" data={data.tune && data.tune.download}/>
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
TunesDetail.PropTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(TunesDetail)

