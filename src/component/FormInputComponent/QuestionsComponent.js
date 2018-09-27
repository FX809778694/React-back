import React, {Component} from 'react'
import {Icon, Button, Card, Input, Form, Checkbox, Modal} from 'antd';
import {InputNumItem, QuesTypeItem, QuesTitleItem} from "../FormItem";
import {formItemLayout} from "../../constants/FormConst";
import ContentEditor from "./contentEditor";

const FormItem = Form.Item;

class DynamicFieldSet extends Component {
  constructor(props) {
    super(props)
    this.uuidOption = 1
    this.state = {
      visible: false,
      content: '',
      optionKey: null
    }
    this.showContent = this.showContent.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onCreate = this.onCreate.bind(this)
  }
  showContent(event){
    const {id} = event.target.dataset
    const {getFieldValue} = this.props
    const content = getFieldValue(`questions.${id}`);
    this.setState({ optionKey: id, visible: true, content })
  }
  onChange(content){
    const regContent = /^<p><\/p>\s$/
    this.setState({
      content: regContent.test(content) ? undefined : content
    })
  }
  onCancel(){
    this.setState({ visible: false, optionKey: null })
  }
  onCreate(){
    const {setFieldsValue} = this.props
    const {optionKey, content} = this.state
    setFieldsValue({
      [`questions.${optionKey}`]: content ? content.replace(/^<p><\/p>/, "").replace(/<p><\/p>\s$/, "") : undefined
    })
    this.setState({ visible: false, optionKey: null })
  }
  removeOption = (k) => {
    const { getFieldValue, setFieldsValue, id } = this.props;
    const optionKeys = getFieldValue(`questions.optionKeys_${id}`);
    if (optionKeys.length === 1) {
      return;
    }
    setFieldsValue({
      ['questions.optionKeys_'+id]: optionKeys.filter(key => key !== k),
    });
  }
  addOption = () => {
    this.uuidOption++;
    console.log(this.uuidOption);
    const { getFieldValue, setFieldsValue, id } = this.props;
    const optionKeys = getFieldValue(`questions.optionKeys_${id}`);
    const nextKeys = optionKeys.concat(this.uuidOption);
    setFieldsValue({
      ['questions.optionKeys_'+id]: nextKeys,
    });
  }
  componentDidMount() {
    const { setFieldsValue, initialValue, id } = this.props
    initialValue !== {} && initialValue[`optionKeys_${id}`] && setFieldsValue({
      ['questions.optionKeys_'+id]: initialValue[`optionKeys_${id}`],
    });
  }
  render() {
    const {visible} = this.state
    const { getFieldDecorator, getFieldValue, id, initialValue } = this.props;
    getFieldDecorator(`questions.optionKeys_${id}`, { initialValue: [1] });
    const optionKeys = getFieldValue(`questions.optionKeys_${id}`);
    this.uuidOption = optionKeys.length;
    const formItems = optionKeys.map((k, index) => {
      getFieldDecorator(`questions.${id}_optionId_${k}`, { initialValue: initialValue[`${id}_optionId_${k}`] });
      return (
        <div key={k}>
          <FormItem style={{width: '30px', display: 'inline-block', marginBottom: '24px'}}>
            {getFieldDecorator(`questions.${id}_checked_${k}`, {
              valuePropName: 'checked',
              initialValue: initialValue[`${id}_checked_${k}`]
            })(
              <Checkbox style={{ marginRight: 8 }}/>
            )}
          </FormItem>
          {getFieldDecorator(`questions.${id}_${k}`, {
            rules: [{ required: true, whitespace: true, message: "请输入试题选项！" }],
            initialValue: initialValue !== undefined ? initialValue[`${id}_${k}`] : undefined
          })(
            <Input placeholder="请输入试题选项" style={{ width: '90%', marginRight: 8 }} data-id={`${id}_${k}`} onClick={this.showContent}/>
          )}
          {optionKeys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={optionKeys.length === 1}
              onClick={() => this.removeOption(k)}
            />
          ) : null}
        </div>
      );
    });
    const {optionKey, content} = this.state
    return (
      <FormItem label="选项" {...formItemLayout} required={true}>
        {formItems}
        <Modal className="content-modal" key={`questions.${optionKey}`} visible={visible} title={`选项_${optionKey}`} okText="保存" onCancel={this.onCancel} onOk={this.onCreate}>
          <ContentEditor content={content || ''} onlyContent={true} onChange={this.onChange}/>
        </Modal>
        <Button type="dashed" onClick={this.addOption} style={{fontSize: '12px', height: '26px', width: '90%'}}>
          <Icon type="plus"/> 添加试题选项 <span className="FeatureInfo">（如不输入，请去掉该行）</span>
        </Button>
        <style>
          {`
            .content-modal{
              width: 900px !important;
            }
          `}
        </style>
      </FormItem>
    );
  }
}

export default class QuestionsComponent extends Component {
  constructor(props) {
    super(props)
    this.uuid = 1;
  }
  remove = (k) => {
    const { getFieldValue, setFieldsValue } = this.props;
    const keys = getFieldValue('questions.keys');
    console.log(keys);
    if (keys.length === 1) {
      return;
    }
    setFieldsValue({
      'questions.keys': keys.filter(key => key !== k),
    });
  }
  add = () => {
    this.uuid++;
    const { getFieldValue, setFieldsValue } = this.props;
    const keys = getFieldValue('questions.keys');
    const nextKeys = keys.concat(this.uuid);
    setFieldsValue({
      'questions.keys': nextKeys,
    });
  }
  componentDidMount() {
    const {setFieldsValue, initialValue} = this.props
    initialValue !== {} && initialValue.keys && (this.uuid = initialValue.keys.length)
    initialValue !== {} && initialValue.keys && setFieldsValue({
      'questions.keys': initialValue.keys,
    });
  }
  render() {
    const { getFieldDecorator, getFieldValue, setFieldsValue, initialValue } = this.props;
    getFieldDecorator('questions.keys', { initialValue: [1] });
    const keys = getFieldValue('questions.keys');
    const formItems = keys.map((k, index) => {
      const {label} = this.props
      getFieldDecorator(`questions.questionId_${k}`, { initialValue: initialValue[`questionId_${k}`] });
      return (
        <Card key={k} title={<div className="textAlign-center">{`${label} ${k}`}</div>} extra={keys.length > 1 && <a onClick={() => this.remove(k)}>删除试题</a>} style={{marginBottom: '30px'}} noHovering={true}>
          <QuesTitleItem label="题目" getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue} setFieldsValue={setFieldsValue} id={`questions.questionTitle_${k}`} initialValue={initialValue[`questionTitle_${k}`]} required={true}/>
          <QuesTypeItem label="类型" getFieldDecorator={getFieldDecorator} id={`questions.type_${k}`} initialValue={initialValue[`type_${k}`]} required={true}/>
          <InputNumItem label="排序" getFieldDecorator={getFieldDecorator} id={`questions.displayOrder_${k}`} initialValue={initialValue[`displayOrder_${k}`]} required={true}/>
          <DynamicFieldSet getFieldDecorator={getFieldDecorator} getFieldValue={getFieldValue} setFieldsValue={setFieldsValue} id={k} initialValue={initialValue[`options_${k}`] || []}/>
        </Card>
      );
    });
    return (
      <div>
        {formItems}
        <Button type="dashed" onClick={this.add} style={{width: '70%', left: '15%'}}>
          <Icon type="plus"/> 添加试题 <span className="FeatureInfo">（如不输入，请去掉该行）</span>
        </Button>
        <style>
          {`
            .FeatureInfo {
              color: #ccc;
              fontSize: 10px;
              margin-left: 10px;
            }
          `}
        </style>
      </div>
    )
  }
}
