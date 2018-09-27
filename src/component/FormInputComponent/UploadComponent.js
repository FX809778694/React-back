import React, {Component} from 'react';
import {getJwt} from "../../utils/auth";
import {Icon, Upload} from 'antd';
import {UPLOAD_HOST} from '../../utils/config';

export default class UploadComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setHeader: {
        Authorization: 'Bearer ' + getJwt()
      },
    }
  }

  render() {
    const {fileNum, fileList, handlePreview, handleChange} = this.props
    // const {previewVisible, handleCancel, previewImage} = this.props
    const uploadButton = (
      <div style={{lineHeight: '30px'}}>
        <Icon type="plus"/>
        <div className="ant-upload-text">选择图片</div>
      </div>
    );
    const locale = {previewFile: '复制图片链接'}
  return (
      <span>
        <Upload
          action={UPLOAD_HOST}
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          headers={this.state.setHeader}
          locale={locale}
        >
          {
            fileNum
              ? fileList.length < fileNum && uploadButton
              : uploadButton
          }
        </Upload>
        {/*<Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>*/}
      </span>
    )
  }
}
