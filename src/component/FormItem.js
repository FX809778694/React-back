import React, {Component} from 'react';
import {Button, DatePicker, Form, Input, InputNumber, Select, Spin, Radio, Modal} from 'antd';
import debounce from 'lodash.debounce';
import UploadComponent from './FormInputComponent/UploadComponent'
import UploadCustom from './FormInputComponent/UploadCustom'
import FeaturesComponent from './FormInputComponent/FeaturesComponent'
import {buttonItemLayout, dateFormat, formItemLayout} from '../constants/FormConst'
import ContentEditor from "./FormInputComponent/contentEditor/index";
import {copyImageUrl} from '../other/copyImageUrl'
import EditableTagGroup from "./FormInputComponent/EditableTagGroup";
import moment from 'moment';
import {ARTICLE_TYPE, TOPIC_TUNE_TYPE} from '../utils/config'
import api from '../api/index'
import {Message} from "../other/ShowMsg";
import QuestionsComponent from "./FormInputComponent/QuestionsComponent";

const {TextArea} = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

export const Items = ({label, data}) => (
  <FormItem label={label} {...formItemLayout}> {data} </FormItem>
)

export const BackButton = () => (
  <FormItem {...buttonItemLayout}>
    <Button type="info" className="customBtn" onClick={() => { window.history.back()}}>返回</Button>
  </FormItem>
)

export const InputItem = ({label, getFieldDecorator, id, initialValue, required}) => (
  <FormItem label={label && `${label}：`} {...formItemLayout} >
    {getFieldDecorator(id, {
      rules: [
        required ? {required: true, message: `请输入${label}！`, whitespace: true} : {}
      ],
      initialValue: initialValue
    })(
      <Input placeholder={`请输入${label}`}/>
    )}
  </FormItem>
)

export const InputNumItem = ({label, id, getFieldDecorator, initialValue, placeholder, required, ...props}) => (
  <FormItem label={`${label}：`} {...formItemLayout} >
    {getFieldDecorator(id, {
      rules: [
        required ? {required: true, message: `请输入${label}！`, whitespace: true} : {}
      ],
      validateTrigger: ['onBlur'],
      initialValue: initialValue !== undefined ? String(initialValue) : undefined
    })(
      <InputNumber placeholder={placeholder ? placeholder : `请输入${label}`} {...props}/>
    )}
  </FormItem>
)

export const TextAreaItem = ({label, getFieldDecorator, id, initialValue, required}) => (
  <FormItem label={`${label}：`} {...formItemLayout} >
    {getFieldDecorator(id, {
      rules: [
        required ? {required: true, message: `请输入${label}！`, whitespace: true} : {}
      ],
      initialValue: initialValue
    })(
      <TextArea rows={4} placeholder={`请输入${label}`}/>
    )}
  </FormItem>
)

export const SelectItem = ({label, getFieldDecorator, id, OptionsData, initialValue, required}) => (
  <FormItem label={`${label}：`} {...formItemLayout} >
    {getFieldDecorator(id, {
      rules: [
        required ? {required: true, message: `请选择${label}！`, whitespace: true} : {}
      ],
      initialValue: initialValue
    })(
      <Select placeholder={`请输入${label}`}>
        { OptionsData.map(i => <Option key={i.value} value={i.value}>{i.name}</Option>) }
      </Select>
    )}
  </FormItem>
)


export const LanguageItem = ({getFieldDecorator, initialValue, required}) => {
  const arr = [{value: '0', name: '未知'}, {value: '1', name: '中文'}, {value: '2', name: '英文'}]
  return (
    <FormItem label="语言：" {...formItemLayout} >
      {getFieldDecorator('language', {
        rules: [
          required ? {required: true, message: "请选择语言！", whitespace: true} : {}
        ],
        initialValue: initialValue !== undefined ? String(initialValue) : undefined
      })(
        <Select placeholder="请选择语言">
          { arr.map(i => <Option key={i.value} value={i.value}>{i.name}</Option>) }
        </Select>
      )}
    </FormItem>
  )
}

export const LanguageChooseItem = ({getFieldDecorator, initialValue, required}) => {
  const arr = [{value: '1', name: '中文'}, {value: '2', name: '英文'}]
  return (
    <FormItem label="语言：" {...formItemLayout} >
      {getFieldDecorator('language', {
        rules: [
          required ? {required: true, message: "请选择语言！", whitespace: true} : {}
        ],
        initialValue: initialValue !== undefined ? String(initialValue) : undefined
      })(
        <Select placeholder="请选择语言">
          { arr.map(i => <Option key={i.value} value={i.value}>{i.name}</Option>) }
        </Select>
      )}
    </FormItem>
  )
}

export class SeedIdItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChannelChange = this.onChannelChange.bind(this)
    this.onCreatorChange = this.onCreatorChange.bind(this)
    this.onSeedChange = this.onSeedChange.bind(this)
  }
  onChannelChange(value) {
    const {channelSelect, seedAction, onSeedIdChange, setFieldsValue} = this.props
    const channelId = channelSelect.items.find(i => {return i.channelName === value})
    const data = {
      channelId: channelId ? channelId.id : null,
      channel: value,
      seedId: null,
      creatorId: 0,
      seed: '-',
      creator: '-'
    }
    onSeedIdChange(data)
    setFieldsValue({
      seedId: '-' //指的是getFieldDecorator的id
    })
    value !== '-' ? seedAction.fetchSeedsData(channelId.id) : (seedAction.clearSeedSelectData() && seedAction.fetchCreatorData())
  }
  onCreatorChange(value) {
    const {creatorSelect, onSeedIdChange} = this.props
    const creatorId = creatorSelect.items.find(i => {return i.channelName === value})
    const data = {
      creator: value,
      creatorId: creatorId ? creatorId.creator : null
    }
    onSeedIdChange(data)
  }
  onSeedChange(value) {
    const {seedSelect, onSeedIdChange} = this.props
    const seedId = seedSelect.items.find(i => {return i.source === value})
    const data = {
      seed: value,
      seedId: seedId ? seedId.id : null,
      creatorId: 0
    }
    onSeedIdChange(data)
  }
  componentDidMount() {
    const {seedAction, data} = this.props
    seedAction.fetchChannelsData()
    !data && seedAction.fetchCreatorData()
    data && data.creator === 0 && data.from && data.from.channelId ? seedAction.fetchSeedsData(data.from.channelId) : seedAction.fetchCreatorData()
  }
  componentWillReceiveProps(nextProps) {
    const {data, channelSelect, creatorSelect, seedSelect, onSeedIdChange} = this.props
    const channel = data && data.from && data.from.channelId ? nextProps.channelSelect.items.find(i => {return i.id === data.from.channelId}) : null
    const creator = data? nextProps.creatorSelect.items.find(i => {return i.creator === data.creator}) : null
    const seed = data && data.from && data.from.seedId ? nextProps.seedSelect.items.find(i => {return i.id === data.from.seedId}) : null

    data && channelSelect !== nextProps.channelSelect&& onSeedIdChange({
      channel: channel ? channel.channelName : '-',
      channelId : data.creator === 0 ? data.from.channelId : null
    })
    data && creatorSelect !== nextProps.creatorSelect && onSeedIdChange({
      creator: creator ? creator.channelName : '-',
      creatorId : data.creator
    })
    data && seedSelect !== nextProps.seedSelect && onSeedIdChange({
      seed: seed ? seed.source : '-',
      seedId : data.from.seedId || null
    })
  }
  render(){
    const {getFieldDecorator,  channel, channelSelect, channelId, creator, creatorSelect, seed, seedSelect} =this.props
    return(
      <FormItem label="种子ID：" {...formItemLayout} >
        <Select key="channel" value={channel} className="width-200" onChange={this.onChannelChange}>
          <Option value='-'>不选择频道</Option>
          {channelSelect.items.map(channel => <Option key={channel.id} value={channel.channelName}>{channel.channelName}</Option>)}
        </Select>
        {channelId === null ?
          <Select key="creator" value={creator} className="mar-left-20 width-200" onChange={this.onCreatorChange}>
            <Option value='-'>请选择创建人</Option>
            {creatorSelect.items.map(creator => <Option  key={creator.id} value={creator.channelName}>{creator.channelName}</Option>)}
          </Select> :
          getFieldDecorator('seedId', {
            rules: [
              {validator: (rule, value, callback) => (value === '-' ? callback('请选择二级下拉框中的seedId！') : callback()) }
            ],
            initialValue: seed
          })(
            <Select key="seed" className="mar-left-20 width-200" onChange={this.onSeedChange}>
              <Option value='-'>请选择种子Id</Option>
              {seedSelect.items.map(seed => <Option  key={seed.id} value={seed.source}>{seed.source}</Option>)}
            </Select>
          )
        }
      </FormItem>
    )
  }
}

export const FeaturesItem = ({label, initialData, ...props}) => (
  <FormItem label={`${label}：`} {...formItemLayout} >
    <FeaturesComponent
      initialData={initialData || []}
      {...props}
    />
  </FormItem>
)

export class UploadItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
    };
    this.handleCancel = this.handleCancel.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
  }
  handleCancel = () => this.setState({previewVisible: false})
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
    copyImageUrl(file.url)
  }
  render() {
    const {...props} = this.props
    const {previewVisible, previewImage} = this.state
    return(
      <FormItem label="图片：" {...formItemLayout} >
        <UploadComponent
          previewVisible={previewVisible}
          previewImage={previewImage}
          handleCancel={this.handleCancel}
          handlePreview={this.handlePreview}
          {...props}
        />
      </FormItem>
    )
  }
}

export class UploadCustomItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
    };
    this.handleCancel = this.handleCancel.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
  }
  handleCancel = () => this.setState({previewVisible: false})
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
    copyImageUrl(file.url)
  }
  render() {
    const {label, required, ...props} = this.props
    const {previewVisible, previewImage} = this.state
    return(
      <FormItem label={label ? `${label}：` : "图片："} {...formItemLayout} required={required || false}>
        <UploadCustom
          previewVisible={previewVisible}
          previewImage={previewImage}
          handleCancel={this.handleCancel}
          handlePreview={this.handlePreview}
          fileNum={1}
          {...props}
        />
      </FormItem>
    )
  }
}

export const ButtonItem = () => (
  <FormItem {...buttonItemLayout}>
    <Button type="primary" htmlType="submit">提交</Button>
    <Button
      type="info"
      className="customBtn mar-left-20"
      onClick={() => {
        window.history.back()
      }}>返回</Button>
  </FormItem>
)

export class ContentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
    this.contentValidate = this.contentValidate.bind(this)
  }
  contentValidate = (rule, value, callback) => {
    const regContent = /^<p><\/p>\s$/
    if (value && (regContent.test(value))) {
      callback('内容不能为空！')
    }
    callback()
    this.setState({ error: regContent.test(value) })
  }
  render() {
    const {label, getFieldDecorator, initialValue} = this.props
    return(
      <FormItem label={`${label}：`} {...formItemLayout} >
        {getFieldDecorator('content', {
          rules: [
            {required: true, message: `请输入${label}！`, whitespace: true},
            {validator: this.contentValidate}
          ],
          initialValue: initialValue
        })(
          <ContentEditor content={initialValue || ''} error={this.state.error}/>
        )}
      </FormItem>
    )
  }
}

export const PriceItem = ({getFieldDecorator, initialValue}) => (
  <FormItem label="价格：" {...formItemLayout} >
    {getFieldDecorator('price', {
      rules: [
        {validator: (rule, value, callback) => (value < 0 ? callback('价格不能为负数！') : callback()) }
      ],
      initialValue: initialValue
    })(
      <InputNumber/>
    )}
  </FormItem>
)

export const PriceUnitItem = ({getFieldDecorator, initialValue}) => (
  <FormItem label="价格单位：" {...formItemLayout} >
    {getFieldDecorator('priceUnit', {
      initialValue: initialValue
    })(
      <Select placeholder="请选择价格单位">
        <Option value="CNY">CNY</Option>
        <Option value="EUR">EUR</Option>
        <Option value="GBP">GBP</Option>
        <Option value="USD">USD</Option>
      </Select>
    )}
  </FormItem>
)

export const TagsItem = ({label, getFieldDecorator, tagsValidate, initialValue, name, changeValue, required}) => (
  <FormItem label={`${label}：`} {...formItemLayout} required={required}>
    <EditableTagGroup initial={initialValue} name={name} changeValue={changeValue} />
  </FormItem>
)

export const CalendarItem = ({label, id, getFieldDecorator, initialValue, onChangeData}) => (
  <FormItem label={`${label}：`} {...formItemLayout} >
    {getFieldDecorator(id, {
      initialValue: initialValue && moment(initialValue, dateFormat)
    })(
      <DatePicker showTime format={dateFormat} onChange={onChangeData}/>
    )}
  </FormItem>
)

export const ArticleTypeItem = ({getFieldDecorator, articleTypeChange, initialValue}) => (
  <FormItem label="文章类型：" {...formItemLayout} >
    {getFieldDecorator('forumId', {
      rules: [{required: true, message: '请选择文章类型！', whitespace: true}],
      initialValue: initialValue !== undefined ? String(initialValue) : undefined
    })(
      <Select placeholder="请选择文章类型" onChange={articleTypeChange}>
        { ARTICLE_TYPE.map(i => <Option key={i.type} value={i.type}>{i.name}</Option>)}
      </Select>
    )}
  </FormItem>
)

export const TuneTypeItem = ({getFieldDecorator, initialValue}) => (
  <FormItem label="美频文章类型：" {...formItemLayout} >
    {getFieldDecorator('tuneType', {
      initialValue: initialValue !== undefined ? String(initialValue) : undefined
    })(
      <Select placeholder="请选择美频文章类型">
        { TOPIC_TUNE_TYPE.map(i => <Option key={i.id} value={i.type}>{i.name}</Option>) }
      </Select>
    )}
  </FormItem>
)

export const ChooseSelectItem = ({label, getFieldDecorator, id, initialValue, style}) => (
  <FormItem label={`${label}：`} {...formItemLayout} >
    {getFieldDecorator(id, {
      initialValue: initialValue !== undefined ? String(initialValue) : undefined
    })(
      <Select placeholder={`请选择${label}`} style={style}>
        <Option value="1">是</Option>
        <Option value="0">否</Option>
      </Select>
    )}
  </FormItem>
)

export const ChannelsTypeItem = ({label, getFieldDecorator, id, required, initialValue, onChannelTypeChange}) => {
  const channelsType = [
    {value: '1', name: '版面频道'}, {value: '2', name: '标签频道'},
    {value: '3', name: '用户频道'}, {value: '4', name: '来源频道'}, {value: '5', name: '排行频道'},
  ]
  return(
    <FormItem label={`${label}：`} {...formItemLayout} >
      {getFieldDecorator(id, {
        rules: [{required: true, message: `请选择${label}！`, whitespace: true}],
        initialValue: initialValue !== undefined ? String(initialValue) : undefined
      })(
        <Select onChange={onChannelTypeChange} placeholder={`请选择${label}`}>
          {channelsType.map(i => <Option key={i.value} value={i.value}>{i.name}</Option>)}
        </Select>
      )}
    </FormItem>
  )
}

export const TaskStateItem = ({label, getFieldDecorator, id, required, initialValue, onChannelTypeChange}) => {
  const taskState = [
    {value: '1', name: '待领取'}, {value: '2', name: '未提交'}, {value: '3', name: '待审核'}, {value: '4', name: '审核中'},
    {value: '5', name: '审核失败'}, {value: '6', name: '审核成功'}, {value: '7', name: '已支付'},
  ]
  return(
    <FormItem label={`${label}：`} {...formItemLayout} >
      {getFieldDecorator(id, {
        rules: [{required: true, message: `请选择${label}！`, whitespace: true}],
        initialValue: initialValue !== undefined ? String(initialValue) : undefined
      })(
        <Select onChange={onChannelTypeChange} placeholder={`请选择${label}`}>
          {taskState.map(i => <Option key={i.value} value={i.value}>{i.name}</Option>)}
        </Select>
      )}
    </FormItem>
  )
}

export const LinksTypeItem = ({label, getFieldDecorator, id, required, initialValue}) => {
  const taskState = [
    {value: '1', name: 'PC导航'}, {value: '2', name: '手机快速入口'}, {value: '3', name: '手机导航'},
    {value: '4', name: '友情链接'}, {value: '5', name: '广告'}, {value: '6', name: '新Banner图'},
  ]
  return(
    <FormItem label={`${label}：`} {...formItemLayout} >
      {getFieldDecorator(id, {
        rules: [{required: true, message: `请选择${label}！`, whitespace: true}],
        initialValue: initialValue !== undefined ? String(initialValue) : undefined
      })(
        <Select placeholder={`请选择${label}`}>
          {taskState.map(i => <Option key={i.value} value={i.value}>{i.name}</Option>)}
        </Select>
      )}
    </FormItem>
  )
}

export class BrandsSelectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [],
      fetching: false,
    }
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 1000);
  }
  fetchUser = (value) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], value: '' });
    value !== '' && this.setState({ fetching: true, value });
    const condition = {
      'page[size]': 200,
      'filter[forumId]': 2,
      'filter[title:like]': '%' + value + '%'
    }
    value !== '' && api.filterArticlesData({params: condition})
      .then(res => {
        if (fetchId !== this.lastFetchId) {
          return;
        }
        const data = res.data.data.map(i => ({
          text: i.title,
          value: i.id,
          fetching: false,
        }));
        this.setState({ data, fetching: false,});
      }).catch(err => {
      if (err.response && err.response.status) {
        Message('error', `错误代码：${err.response.status}`)
      }
    })
  }
  handleChange = (value) => {
    const {setFieldsValue} = this.props
    setFieldsValue({
      brands: value //指的是getFieldDecorator的id
    })
    this.setState({
      data: [],
      value: ''
    });
  }
  render() {
    const { fetching, data, value } = this.state;
    const { label, getFieldDecorator, id, initialValue } = this.props
    const initial = []
    initialValue && initialValue.map(i => initial.push({key: i, label: i}))
    return (
      <FormItem label={`${label}：`} {...formItemLayout} >
        {getFieldDecorator(id, {
          initialValue: initialValue !== undefined ? initial : undefined
        })(
          <Select mode="multiple" labelInValue placeholder={`请输入并选择${label}`} style={{width: '500px'}}
            notFoundContent={fetching ? <Spin size="small" /> : (data.length === 0 ? (value !== '' ? '无结果' : null) : null)} filterOption={false}
            onSearch={this.fetchUser} onChange={this.handleChange}
          >
            {data.map(i => <Option key={i.value}>{i.text}</Option>)}
          </Select>
        )}
      </FormItem>
    )
  }
}

export const FunctionChooseItem = ({label, getFieldDecorator, id, initialValue}) => {
  const FuncType = [
    {value: 'NONE'}, {value: 'LOG'}, {value: 'LOG1P'}, {value: 'LOG2P'}, {value: 'LN'},
    {value: 'LN1P'}, {value: 'LN2P'}, {value: 'SQUARE'}, {value: 'SQRT'}, {value: 'RECIPROCAL'},
  ]
  return (
      <FormItem label={`${label}：`} {...formItemLayout} >
        {getFieldDecorator(id, {
          initialValue: initialValue !== undefined ? String(initialValue) : undefined
        })(
          <Select placeholder={`请选择${label}`}>
            {FuncType.map(i => <Option key={i.value} value={i.value}>{i.value}</Option>)}
          </Select>
        )}
      </FormItem>
    )
}

export const LabelQueryChooseItem = ({label, getFieldDecorator, id, initialValue}) => {
  const FuncType = [
    {value: 'FIRST'}, {value: 'MULTIPLY'}, {value: 'SUM'}, {value: 'AVG'}, {value: 'MAX'}, {value: 'MIN'}
  ]
  return (
      <FormItem label={`${label}：`} {...formItemLayout} >
        {getFieldDecorator(id, {
          initialValue: initialValue !== undefined ? String(initialValue) : undefined
        })(
          <Select placeholder={`请选择${label}`}>
            {FuncType.map(i => <Option key={i.value} value={i.value}>{i.value}</Option>)}
          </Select>
        )}
      </FormItem>
    )
}

export const QuizsStateItem = ({label, getFieldDecorator, id, initialValue}) => {
  const state = [
    {value: '0', name: '待发布'}, {value: '1', name: '发布中'}, {value: '2', name: '结束发布'}
  ]
  return (
    <FormItem label={`${label}：`} {...formItemLayout} >
      {getFieldDecorator(id, {
        initialValue: initialValue !== undefined ? String(initialValue) : undefined
      })(
        <Select placeholder={`请选择${label}`}>
          {state.map(i => <Option key={i.value} value={i.value}>{i.name}</Option>)}
        </Select>
      )}
    </FormItem>
  )
}

export const Questions = ({initialValue, ...props}) => {
  return(
    <QuestionsComponent initialValue={initialValue || {}} {...props} />
  )
}

export const QuesTypeItem = ({label, getFieldDecorator, id, initialValue, required}) => (
  <FormItem label={`${label}：`} {...formItemLayout} >
    {getFieldDecorator(id, {
      rules: [
        required ? {required: true, message: `请选择${label}！`, whitespace: true} : {}
      ],
      initialValue: initialValue !== undefined ? String(initialValue) : undefined
    })(
      <RadioGroup placeholder={`请选择${label}`}>
        <Radio value='1'>单选</Radio>
        <Radio value='2'>多选</Radio>
      </RadioGroup>
    )}
  </FormItem>
)

export class QuesTitleItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      content: props.initialValue
    }
    this.showContent = this.showContent.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCreate = this.onCreate.bind(this)
  }
  showContent(){
    const {getFieldValue, id} = this.props
    const content = getFieldValue(id);
    this.setState({ visible: true, content })
  }
  onChange(content){
    const regContent = /^<p><\/p>\s$/
    this.setState({
      content: regContent.test(content) ? undefined : content
    })
  }
  onCancel(){
    this.setState({ visible: false })
  }
  onCreate(){
    const {setFieldsValue, id} = this.props
    const {content} = this.state
    this.setState({ visible: false })
    setFieldsValue({
      [id]: content ? content.replace(/^<p><\/p>/, "").replace(/<p><\/p>\s$/, "") : undefined
    })
  }
  render(){
    const {label, getFieldDecorator, id, initialValue, required} = this.props
    const {visible} = this.state
    return (
      <FormItem label={label && `${label}：`} {...formItemLayout} >
        {getFieldDecorator(id, {
          rules: [
            required ? {required: true, message: `请输入${label}！`, whitespace: true} : {}
          ],
          initialValue: initialValue
        })(
          <Input placeholder={`请输入${label}`} onClick={this.showContent}/>
        )}
        <Modal className="content-modal" visible={visible} title={label} okText="保存" onCancel={this.onCancel} onOk={this.onCreate}>
          <ContentEditor content={initialValue || ''} onlyContent={true} onChange={this.onChange}/>
        </Modal>
        <style>
          {`
            .content-modal{
              width: 900px !important;
            }
          `}
        </style>
      </FormItem>
    )
  }
}

