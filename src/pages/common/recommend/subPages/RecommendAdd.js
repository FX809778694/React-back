import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/articles/actions'
import {Card, Form} from 'antd';
import {uploadInfo} from '../../../../other/UploadInfo'
import {WEEKLY_RECOMMEND_SEED_ID} from '../../../../utils/config'
import {format} from '../../../../other/FeatureFormat'
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

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articleType: -1,
      fileList: [],
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
    const { actions, form } = this.props
    const { fileList, tags, category, postDate } = this.state
    const attachments = []
    fileList.map(i => attachments.push({ id: i.id }))
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const forumId = values.forumId
        const arr = {
          data: {
            forumId: forumId,
            seedId: WEEKLY_RECOMMEND_SEED_ID,
            creator: 0,
            attachments: attachments,
            post :{
              parentId: 0,
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
        actions.addArticlesData(arr)
      }
    });
  }

  render() {
    const { articleType, fileList } = this.state;
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    return (
      <Card title='周刊录入' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <ArticleTypeItem getFieldDecorator={getFieldDecorator} articleTypeChange={this.articleTypeChange}/>
          <InputItem label="标题" getFieldDecorator={getFieldDecorator} id="title"  required={true}/>
          <TextAreaItem label="描述" getFieldDecorator={getFieldDecorator} id="description" required={true}/>
          <LanguageItem getFieldDecorator={getFieldDecorator} required={true}/>
          <ContentItem label="内容" getFieldDecorator={getFieldDecorator} required={true}/>
          <FeaturesItem label="属性" getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue} setFieldsValue={setFieldsValue}/>
          <UploadItem fileList={fileList} handleChange={this.handleChange}/>
          <TagsItem label="类别" name="category" changeValue={this.tagsChange}/>
          <TagsItem label="标签" name="tags" changeValue={this.tagsChange}/>
          {
            articleType !== -1 &&
            (articleType === 1
            ? <div>
                <div className="optional">产品选项</div>
                <PriceItem getFieldDecorator={getFieldDecorator}/>
                <PriceUnitItem getFieldDecorator={getFieldDecorator}/>
                <InputItem label="关联品牌" getFieldDecorator={getFieldDecorator} id="brand"/>
              </div>
            : articleType === 2
            ? <div>
                <div className="optional">品牌选项</div>
                <InputItem label="品牌LOGO" getFieldDecorator={getFieldDecorator} id="logo"/>
              </div>
            : articleType === 7
            ? <div>
                <div className="optional">美频选项</div>
                <TuneTypeItem getFieldDecorator={getFieldDecorator}/>
                <InputItem label="发表作者" getFieldDecorator={getFieldDecorator} id="author"/>
                <InputItem label="关联品牌" getFieldDecorator={getFieldDecorator} id="brand"/>
                <InputItem label="标题别名" getFieldDecorator={getFieldDecorator} id="name"/>
                <InputItem label="下载地址" getFieldDecorator={getFieldDecorator} id="download"/>
              </div>
            : <div>
                <div className="optional">
                  {
                    articleType === 3 ? '新闻' : articleType === 4 ? '评测' : articleType === 5 ? '视频' : articleType === 6 ? '直播' : ''
                  }
                  选项
                </div>
                <CalendarItem label="发表时间" id="postDate" getFieldDecorator={getFieldDecorator} onChangeData={this.onChangeData}/>
                <InputItem label="发表作者" getFieldDecorator={getFieldDecorator} id="author"/>
                <BrandsSelectItem label="关联品牌" getFieldDecorator={getFieldDecorator} setFieldsValue={setFieldsValue} id="brands"/>
              </div>)
          }
          <ButtonItem/>
        </Form>
    </Card>
    )
  }
}
const RecommendAdd = Form.create()(DataAdd);

RecommendAdd.PropTypes = {
  actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => {
  return {}
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecommendAdd)
