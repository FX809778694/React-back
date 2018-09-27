import {Message} from '../other/ShowMsg'

export function copyImageUrl(content) {
  let url = document.createElement('input');
  try {
    url.setAttribute("value", content);
    document.body.appendChild(url);
    url.select();
    document.execCommand("Copy"); // 执行浏览器复制命令
    Message('success', '复制图片链接成功！')
    document.body.removeChild(url);
  }
  catch (error) {
    Message('error', '复制图片链接失败！')
  }
}
