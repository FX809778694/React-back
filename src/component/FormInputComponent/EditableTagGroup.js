import React from 'react';
import {Button, Input, Tag, Tooltip} from 'antd';

export default class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags:props.initial ? props.initial : [],
      inputVisible: false,
      inputValue: ''
    }
  }
  //删除标签
  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({tags});
    const{changeValue,name} = this.props;
    changeValue(name,tags)
  }
  //显示输入框
  showInput = () => {
    this.setState({inputVisible: true}, () => this.input.focus());
  }
  //处理输入框
  handleInputChange = (e) => {
    this.setState({inputValue: e.target.value});
  }
  //确定输入框
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
    const{changeValue,name} = this.props;
    changeValue(name,tags)
  }

  saveInputRef = input => this.input = input

  render() {
    const {tags, inputVisible, inputValue} = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index >= 0} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip key={index} title={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible ?
          <Input
            ref={this.saveInputRef}
            type="text"
            size="large"
            style={{width: 78}}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
          : <Button size="large" type="dashed" onClick={this.showInput}>+添加</Button>
        }
      </div>
    );
  }
}
