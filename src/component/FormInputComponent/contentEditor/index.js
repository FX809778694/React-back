import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ContentState, convertToRaw, EditorState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import translations from './contentEditor'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Input, Switch} from 'antd'

const {TextArea} = Input;

const getEditorState = (content) => {
  if (!content) {
    return EditorState.createEmpty()
  } else {
    const blocksFromHtml = htmlToDraft(content);
    const {contentBlocks, entityMap} = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
  }
}

class ContentEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: props.content,
      switchState: true,
      disabled: false
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onSwitchChange = this.onSwitchChange.bind(this)
  }

  componentDidMount() {
    const { content } = this.state
    const isImg = /^\s*<img\w*/.test(content)
    this.setState({
      editorStates: getEditorState('<span>' + (isImg ? '<p></p>' + content + '<p></p>' :content) + '</span>'),
    })
  }

  onEditorStateChange(editorStates) {
    const {onChange} = this.props
    this.setState({
      editorStates,
      content: draftToHtml(convertToRaw(editorStates.getCurrentContent()))
    });
    onChange(draftToHtml(convertToRaw(editorStates.getCurrentContent())))
  };

  onTextAreaChange(e) {
    const {onChange} = this.props
    this.setState({
      content: e.target.value,
      editorStates: getEditorState(e.target.value),
    })
    onChange(e.target.value)
  }

  onSwitchChange(checked) {
    this.setState({
      switchState: false,
      disabled: true
    })
  }

  render() {
    const { error, onlyContent } = this.props
    const { switchState, disabled, editorStates, content } = this.state
    return (
      <div>
        {
          !onlyContent &&
          <label className="display-block mar-bottom-10">
            编辑方式：
            <Switch
              defaultChecked={switchState}
              onChange={this.onSwitchChange}
              checkedChildren="富文本"
              unCheckedChildren="文本域"
              disabled={disabled}
            /><span className="prompt-red mar-left-10">* 只允许切换一次</span>
          </label>
        }
        {
          switchState ?
            <div className={`border ${!error ? 'border-normal' : 'border-error'}`}>
              <Editor
                border={true}
                wrapperClassName="home-wrapper"
                editorClassName="home-editor"
                toolbarClassName="home-toolbar"
                editorState={editorStates}
                onEditorStateChange={this.onEditorStateChange}
                placeholder="请输入内容"
                localization={{translations: translations}}
                toolbar={{
                  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link', 'embedded', 'image', 'remove', 'history'],
                  inline: {
                    options: ['bold', 'italic',],
                  },
                  embedded: {
                    defaultSize: {
                      height: '100%',
                      width: '100%',//图片宽度100%
                    },
                  },
                  image: {
                    defaultSize: {
                      height: 'auto',
                      width: '100%',//图片宽度100%
                    },
                  },
                }}
              />
            </div>:
            <TextArea rows={10} value={content} onChange={this.onTextAreaChange} placeholder="请输入内容" />
        }

        <style>{`
          .home-editor {
            min-height: 200px;
            max-height: 600px;
          }
          .border {
            padding: 25px;
            border-radius: 3px;
          }
          .border-normal {
            border: 1px solid #ddd;
          }
          .border-error {
            border: 1px solid red;
          }
        `}</style>
      </div>
    )
  }
}

ContentEditor.propTypes = {
  content: PropTypes.string
}

export default ContentEditor;
