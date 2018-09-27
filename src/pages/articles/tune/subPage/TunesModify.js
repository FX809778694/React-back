import React, {Component} from 'react';
import {Card, Form} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/articles/actions'
import * as SeedAction from '../../../../store/SeedIdSelected/index'
import {uploadInfo} from '../../../../other/UploadInfo'
import {
  ButtonItem,
  ContentItem,
  InputItem,
  InputNumItem,
  LanguageItem,
  SeedIdItem,
  FeaturesItem,
  TagsItem,
  TextAreaItem,
  UploadItem,
  TuneTypeItem
} from '../../../../component/FormItem'
import {format, reFormat} from "../../../../other/FeatureFormat";

class DataModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fileList: [],
      postDate: '',
      categories: [],
      tags: [],
      brands: [],
      channelId: null,
      channel: '-',
      seedId: null,
      seed: '-',
      creatorId: null,
      creator: '-',
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.tagsChange = this.tagsChange.bind(this)
    this.onSeedIdChange = this.onSeedIdChange.bind(this)
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
  onSeedIdChange(data){
    data.channelId !== undefined && this.setState({ channelId: data.channelId })
    data.channel !== undefined && this.setState({ channel: data.channel })
    data.seedId !== undefined && this.setState({ seedId: data.seedId })
    data.seed !== undefined && this.setState({ seed: data.seed })
    data.creator !== undefined && this.setState({ creator: data.creator })
    data.creatorId !== undefined && this.setState({ creatorId: data.creatorId })
  }
  tagsChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }
  handleSubmit = (e) => {
    const { data, actions, form } = this.props
    const { fileList, channelId, seedId, creatorId, tags, categories } = this.state
    const attachments = []
    fileList.map(i => attachments.push({ id: i.id }))
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            forumId: 7,
            id: data.id,
            seedId: channelId ? seedId : null,
            creator: creatorId,
            categoryId: values.categoryId,
            attachments: attachments,
            post: {
              title: values.title,
              description: values.description,
              language: values.language,
              content: values.content,
              features: format(values.feature) || [],
              tags: tags,
              categories: categories,
              parentId: data.post.parentId,
              creator: data.post.creator
            },
            tune: {
              type: values.tuneType,
              author: values.author,
              brand: values.brand,
              name: values.name,
              download: values.download
            }
          }
        }
        actions.editArticlesData(values)
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
    data !== nextProps.data && nextProps.data.post && this.setState({ tags: nextProps.data.post.tags, categories: nextProps.data.post.categories })
    data !== nextProps.data && nextProps.data && this.setState({ loading: false })
  }
  componentWillUnmount() {
    const { actions } = this.props
    actions.clearArticleDetail()
  }

  render() {
    const { fileList, channel, seed, creator, channelId, loading } = this.state;
    const { data, channelSelect, seedSelect, creatorSelect, seedAction } = this.props
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
    return (
      <Card loading={loading} title={`美频修改 —— ${data.post && data.post.title}`} bordered={true}>
        { data.post &&
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="美频标题" getFieldDecorator={getFieldDecorator} id="title" initialValue={data.post.title} required={true}/>
          <TextAreaItem label="美频描述" getFieldDecorator={getFieldDecorator} id="description" initialValue={data.post.description} required={true}/>
          <LanguageItem getFieldDecorator={getFieldDecorator} initialValue={data.post.language} required={true}/>
          { data.post.content &&
          <ContentItem label="美频内容" getFieldDecorator={getFieldDecorator} initialValue={data.post.content} required={true}/>}
          <SeedIdItem getFieldDecorator={getFieldDecorator} setFieldsValue={setFieldsValue} data={data}
                      channel={channel} channelSelect={channelSelect} channelId={channelId}
                      creator={creator} creatorSelect={creatorSelect} seed={seed} seedSelect={seedSelect}
                      seedAction={seedAction} onSeedIdChange={this.onSeedIdChange}/>
          <InputNumItem label="人工分类ID" getFieldDecorator={getFieldDecorator} id="categoryId" initialValue={data.categoryId}/>
          <FeaturesItem label="美频属性" getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue}
                        setFieldsValue={setFieldsValue} initialData={reFormat(data.post.features)}/>
          <UploadItem fileList={fileList} handleChange={this.handleChange}/>
          <TagsItem label="类别" name="categories" initialValue={data.post.categories} changeValue={this.tagsChange}/>
          <TagsItem label="标签" name="tags" initialValue={data.post.tags} changeValue={this.tagsChange}/>
          <TuneTypeItem getFieldDecorator={getFieldDecorator} initialValue={data.tune.type}/>
          <InputItem label="发表作者" getFieldDecorator={getFieldDecorator} id="author" initialValue={data.tune && data.tune.author}/>
          <InputItem label="关联品牌" getFieldDecorator={getFieldDecorator} id="brand" initialValue={data.tune && data.tune.brand}/>
          <InputItem label="标题别名" getFieldDecorator={getFieldDecorator} id="name" initialValue={data.tune && data.tune.name}/>
          <InputItem label="下载地址" getFieldDecorator={getFieldDecorator} id="download" initialValue={data.tune && data.tune.author}/>
          <ButtonItem/>
        </Form>
        }
      </Card>
    )
  }
}
const TunesModify = Form.create()(DataModify);

TunesModify.PropTypes = {
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
    actions: bindActionCreators(Actions, dispatch),
    seedAction: bindActionCreators(SeedAction, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TunesModify)
