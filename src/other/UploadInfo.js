import {Notification} from '../other/ShowMsg'

export function uploadInfo(status) {
  status === 'done' && Notification('success', '图片上传成功！')
  status === 'error' && Notification('error', '图片上传失败！')
  status === 'removed' && Notification('warning', '图片已移除！')
}
