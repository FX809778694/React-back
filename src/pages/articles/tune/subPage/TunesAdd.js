import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PropTypes from 'prop-types'
import * as Actions from '../../../../store/articles/actions'
import * as SeedAction from '../../../../store/SeedIdSelected/index'
import {Card, Form} from 'antd';
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
import {format} from "../../../../other/FeatureFormat";

class DataAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.onSeedIdChange = this.onSeedIdChange.bind(this)
    this.tagsChange = this.tagsChange.bind(this)
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
    const { actions, form } = this.props
    const { fileList, channelId, seedId, creatorId, tags, categories } = this.state
    const attachments = []
    fileList.map(i => attachments.push({ id: i.id }))
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        values = {
          data: {
            forumId: 7,
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
              parentId: 0
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
        actions.addArticlesData(values)
      }
    });
  }
  render() {
    const {fileList, channel, seed, creator, channelId} = this.state;
    const {getFieldDecorator, getFieldValue, setFieldsValue} = this.props.form;
    const {channelSelect, seedSelect, creatorSelect, seedAction} = this.props
    return (
      <Card title='添加美频信息' bordered={true}>
        <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <InputItem label="美频标题" getFieldDecorator={getFieldDecorator} id="title"  required={true}/>
          <TextAreaItem label="美频描述" getFieldDecorator={getFieldDecorator} id="description" required={true}/>
          <LanguageItem getFieldDecorator={getFieldDecorator} required={true}/>
          <ContentItem label="美频内容" getFieldDecorator={getFieldDecorator} required={true}/>
          <SeedIdItem getFieldDecorator={getFieldDecorator} setFieldsValue={setFieldsValue}
                      channel={channel} channelSelect={channelSelect} channelId={channelId}
                      creator={creator} creatorSelect={creatorSelect} seed={seed} seedSelect={seedSelect}
                      seedAction={seedAction} onSeedIdChange={this.onSeedIdChange}/>
          <InputNumItem label="人工分类ID" getFieldDecorator={getFieldDecorator} id="categoryId"/>
          <FeaturesItem label="美频属性" getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue} setFieldsValue={setFieldsValue}/>
          <UploadItem fileList={fileList} handleChange={this.handleChange}/>
          <TagsItem label="类别" name="categories" changeValue={this.tagsChange}/>
          <TagsItem label="标签" name="tags" changeValue={this.tagsChange}/>
          <TuneTypeItem getFieldDecorator={getFieldDecorator}/>
          <InputItem label="发表作者" getFieldDecorator={getFieldDecorator} id="author"/>
          <InputItem label="关联品牌" getFieldDecorator={getFieldDecorator} id="brand"/>
          <InputItem label="标题别名" getFieldDecorator={getFieldDecorator} id="name"/>
          <InputItem label="下载地址" getFieldDecorator={getFieldDecorator} id="download"/>
          <ButtonItem/>
        </Form>
      </Card>
    )
  }
}
const TunesAdd = Form.create()(DataAdd);

TunesAdd.PropTypes = {
  actions: PropTypes.object.isRequired,
  seedAction: PropTypes.object.isRequired
}
const mapStateToProps = state => {
  return {
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
export default connect(mapStateToProps, mapDispatchToProps)(TunesAdd)



