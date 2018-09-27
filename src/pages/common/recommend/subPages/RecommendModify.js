import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/articles/actions'
import {format, reFormat} from '../../../../other/FeatureFormat'
import {uploadInfo} from "../../../../other/UploadInfo"
import {
  ArticleTypeItem,
  ButtonItem,
  CalendarItem,
  ContentItem,
  FeaturesItem,
  InputItem,
  LanguageItem,
  TagsItem,
  TextAreaItem,
  UploadItem,
  PriceItem,
  PriceUnitItem,
  TuneTypeItem,
  BrandsSelectItem
} from '../../../../component/FormItem'
import {WEEKLY_RECOMMEND_SEED_ID} from "../../../../utils/config";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      articleType: -1,
      fileList: [],
      featuresData: null,
      postDate: '',
      category: [],
      tags: [],
    };
    this.handleChange = this.handleChange.bind(this)
    this.onChangeData = this.onChangeData.bind(this)
    this.tagsChange = this.tagsChange.bind(this)
    this.articleTypeChange = this.articleTypeChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = ({file, fileList}) => {
    fileList = fileList.map((file) => {
      if (file.response) {
        file.id = file.response.data.id
        file.url = file.response.data.filename
      }
      return file
    })
    this.setState({ fileList })
    uploadInfo(file.status)
  }
  onChangeData(date, dateString) {
    this.setState({
      postDate: dateString
    })
  }
  tagsChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  articleTypeChange(selected) {
    this.setState({ articleType: Number(selected), postDate: '', })
  }
  handleSubmit = (e) => {
    const { data, actions, form } = this.props
    const { fileList, tags, category, postDate } = this.state
    const attachments = []
    fileList.map(i => attachments.push({ id: i.id }))
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const forumId = values.forumId
        const arr = {
          data: {
            id: data.id,
            forumId: forumId,
            seedId: WEEKLY_RECOMMEND_SEED_ID,
            creator: 0,
            attachments: attachments,
            post :{
              creator: data.post.creator,
              parentId: data.post.parentId,
              title: values.title,
              description: values.description,
              language: values.language,
              content: values.content,
              features: format(values.feature),
              categories: category,
              tags: tags,
            }
          }
        }
        forumId === '1' && (
          arr.data['product'] = {
            price : values.price,
            priceUnit: values.priceUnit,
            brand: values.brand
          }
        )
        forumId === '2' && (
          arr.data['topicsBrand'] = { logo: values.logo }
        )
        const forumType = ['3', '4', '5', '6']
        const brands = []
        values.brands && values.brands.map(i => brands.push(i.label))
        forumType.indexOf(forumId) !== -1 && (
          arr.data['document'] = {
            postDate: postDate,
            author: values.author,
            brands: brands
          }
        )
        forumId === '7' && (
          arr.data['tune'] = {
            type: values.tuneType,
            author: values.author,
            brand: values.brand,
            name: values.name,
            download: values.download
          }
        )
        actions.editArticlesData(arr, data.id)
      }
    });
  }
  componentDidMount() {
    const { actions, params } = this.props
    actions.fetchArticlesDetail(params.id)
  }
  componentWillReceiveProps(nextProps) {
    const {data} = this.props
    const fileList = []
    data !== nextProps.data && nextProps.data.images.map(i => fileList.push({ uid: i.id, id: i.id, url: i.filename })) && this.setState({ fileList })
    data !== nextProps.data && nextProps.data.post && this.setState({ featuresData: reFormat(nextProps.data.post.features), tags: nextProps.data.post.tags, category: nextProps.data.post.categories })
    data !== nextProps.data && nextProps.data && this.setState({ loading: false, articleType: data.forumId, })
  }
  componentWillUnmount() {
    const { actions } = this.props
    actions.clearArticleDetail()
  }
  render() {
    const { articleType, fileList, loading, featuresData } = this.state;
    const { data } = this.props
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    return (
      <Card loading={loading} title={`周刊修改 —— ${data.post && data.post.title}`} bordered={true}>
        {data.post &&
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <ArticleTypeItem getFieldDecorator={getFieldDecorator} initialValue={data.forumId} articleTypeChange={this.articleTypeChange}/>
          <InputItem label="标题" getFieldDecorator={getFieldDecorator} id="title" initialValue={data.post.title}  required={true}/>
          <TextAreaItem label="描述" getFieldDecorator={getFieldDecorator} id="description" initialValue={data.post.description} required={true}/>
          <LanguageItem getFieldDecorator={getFieldDecorator} initialValue={data.post.language} required={true}/>
          <ContentItem label="内容" getFieldDecorator={getFieldDecorator} initialValue={data.post.content} required={true}/>
          { featuresData &&
          <FeaturesItem label="属性" getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue}
                        setFieldsValue={setFieldsValue} initialData={featuresData}/> }
          <UploadItem fileList={fileList} handleChange={this.handleChange}/>
          <TagsItem label="类别" name="category" initialValue={data.post.categories} changeValue={this.tagsChange}/>
          <TagsItem label="标签" name="tags" initialValue={data.post.tags} changeValue={this.tagsChange}/>
          {
            articleType !== -1 &&
            (articleType === 1
              ? <div>
                <div className="optional">产品选项</div>
                <PriceItem getFieldDecorator={getFieldDecorator} initialValue={data.product.price}/>
                <PriceUnitItem getFieldDecorator={getFieldDecorator} initialValue={data.product.priceUnit}/>
                <InputItem label="关联品牌" getFieldDecorator={getFieldDecorator} id="brand" initialValue={data.product.brand}/>
              </div>
              : articleType === 2
                ? <div>
                  <div className="optional">品牌选项</div>
                  <InputItem label="品牌LOGO URL" getFieldDecorator={getFieldDecorator} id="logo" initialValue={data.topicsBrand.logo}/>
                </div>
                : articleType === 7
                  ? <div>
                    <div className="optional">美频选项</div>
                    <TuneTypeItem getFieldDecorator={getFieldDecorator} initialValue={data.tune.type}/>
                    <InputItem label="发表作者" getFieldDecorator={getFieldDecorator} id="author" initialValue={data.tune.author}/>
                    <InputItem label="关联品牌" getFieldDecorator={getFieldDecorator} id="brand" initialValue={data.tune.brand}/>
                    <InputItem label="标题别名" getFieldDecorator={getFieldDecorator} id="name" initialValue={data.tune.name}/>
                    <InputItem label="下载地址" getFieldDecorator={getFieldDecorator} id="download" initialValue={data.tune.author}/>
                  </div>
                  : <div>
                    <div className="optional">
                      {
                        articleType === 3 ? '新闻' : articleType === 4 ? '评测' : articleType === 5 ? '视频' : articleType === 6 ? '直播' : ''
                      }
                      选项
                    </div>
                    <CalendarItem label="发表时间" id="postDate" getFieldDecorator={getFieldDecorator} onChangeData={this.onChangeData} initialValue={data.document.postDate}/>
                    <InputItem label="发表作者" getFieldDecorator={getFieldDecorator} id="author" initialValue={data.document.author}/>
                    <BrandsSelectItem label="关联品牌" getFieldDecorator={getFieldDecorator} setFieldsValue={setFieldsValue} initialValue={data.document && data.document.brands} id="brands"/>
                    <TagsItem label="关联品牌" name="brands" changeValue={this.tagsChange} initialValue={data.document.brands}/>
                  </div>)
          }
          <ButtonItem/>
        </Form>
        }
      </Card>
    )
  }
}
const RecommendModify = Form.create()(DataModify);

RecommendModify.PropTypes = {
  data: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {
    data: state.articles.detail,
    channelSelect: state.channelSelect,
    seedSelect: state.seedSelect,
    creatorSelect: state.creatorSelect,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecommendModify)
