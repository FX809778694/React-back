import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as Actions from '../../../../store/configs/actions/categories'
import {Card, Form} from 'antd';
import PropTypes from 'prop-types'
import {Items, BackButton} from "../../../../component/FormItem";

class CategoryManageDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    const {actions, params} = this.props
    actions.fetchCategoriesDetail(params.id)
  }
  componentWillReceiveProps({data}) {
    data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const {actions} = this.props
    actions.clearConfigsDetail()
  }
  render() {
    const {data} = this.props
    const {loading} = this.state
    return (
      <Card loading={loading} title={data && data.title} bordered={true}>
        { data &&
          <Form layout={'horizontal'}>
            <Items label="ID" data={data.id}/>
            <Items label="模块ID" data={data.forumId}/>
            <Items label="根节点ID" data={data.rootId}/>
            <Items label="父节点ID" data={data.parentId}/>
            <Items label="类别名称" data={data.title}/>
            <Items label="是否可用" data={data.enabled === 0 ? '不可用' : data.enabled === 1 ? '可用' : data.enabled}/>
            <Items label="节点路径" data={data.path}/>
            <Items label="深度" data={data.depth}/>
            <Items label="是否是叶子节点" data={data.leaf === 0 ? '否' : data.leaf === 1 ? '是' : data.leaf}/>
            <Items label="排序字段" data={data.displayOrder}/>
            <Items label="图片" data={data.filename ?
              <Card bodyStyle={{padding: 5}}>
                <img src={data.filename} alt="" style={{width: '100%'}}/>
              </Card>: '无'}/>
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
CategoryManageDetail.PropTypes = {
  categoryManage: PropTypes.array.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(CategoryManageDetail)
