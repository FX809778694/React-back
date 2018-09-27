import React, {Component} from 'react';
import {getJwt} from "../../utils/auth";
import {Icon, Upload} from 'antd';

export default class UploadCustom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setHeader: {
        Authorization: 'Bearer ' + getJwt().replace(/(^\\")|(\\"$)/g, '')
      },
      fileIdList: [],
    }
  }

  render() {
    const {fileList, handlePreview, handleRemove, customRequest} = this.props
    // const {previewVisible, handleCancel, previewImage} = this.props
    const uploadButton = (
      <div style={{lineHeight: '30px'}}>
        <Icon type="plus"/>
        <div className="ant-upload-text">选择图片</div>
      </div>
    );
    const locale = {previewFile: '复制图片链接', previewIcon: { type: 'bars' }}
    return (
      <span>
        <Upload
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onRemove={handleRemove}
          headers={this.state.setHeader}
          customRequest={customRequest}
          locale={locale}
        >
        {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {/*<Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>*/}
      </span>
    )
  }
}
