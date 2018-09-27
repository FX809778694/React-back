import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';

const FormItem = Form.Item

export default class FeaturesComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uuid: 0,
    }
  }
  remove = (k) => {
    const {getFieldValue, setFieldsValue} = this.props
    const keys = getFieldValue('keys');

    setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  add = () => {
    this.state.uuid++;
    const {getFieldValue, setFieldsValue} = this.props
    const keys = getFieldValue('keys');
    const nextKeys = keys.concat(this.state.uuid);
    setFieldsValue({
      keys: nextKeys,
    });
  }
  componentDidMount() {
    const {setFieldsValue, initialData} = this.props
    const length = (Object.keys(initialData).length / 2) - 1

    const featureData = []
    for (let i = 0; i <= length; i++) {
      featureData.push(i)
    }

    this.setState({
      uuid: length
    })

    setFieldsValue({
      keys: featureData,
    });
  }
  render() {
    const {getFieldDecorator, getFieldValue, initialData} = this.props
    getFieldDecorator('keys', {initialValue: []})
    const keys = getFieldValue('keys')
    const formItems = keys.map(k => {
      return (
        <span
          required={false} key={k + 1}>
          <FormItem className="featureItem">
            {getFieldDecorator(`feature._name${k + 1}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "请输入名称！",
              }],
              initialValue: initialData[`_name${k + 1}`]
            })(
              <Input size="large" placeholder="名称"
                     onChange={this.nameInputChange}/>
            )}
          </FormItem>
          ：
          <FormItem className="featureItem">
            {getFieldDecorator(`feature._value${k + 1}`, {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{
                required: true,
                whitespace: true,
                message: "请输入参数！",
              }],
              initialValue: initialData[`_value${k + 1}`]
            })(
              <Input size="large" placeholder="参数"/>
            )}
          </FormItem>

          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        </span>
      );
    });
    return (
      <div>
        {formItems}
        <Button type="dashed" onClick={this.add} style={{width: '90%'}}>
          <Icon type="plus"/> 添加属性 <span className="FeatureInfo">（如不输入，请去掉该行）</span>
        </Button>
        <style>
          {`
            .featureItem {
              display: inline-block;
              width: 45%;
              margin-bottom: 8px !important;
              margin-right: 10px;
            }
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
