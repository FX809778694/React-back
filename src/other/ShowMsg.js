import {notification, message} from 'antd';

export function Notification(type, message, description) {
  notification[type]({
    message: message,
    description: description,
  });
}

message.config({
  top: 100
})

//message方法调用结束时触发
/*function messageClose() {
  window.history.back()
}*/

export function Message(type, content) {
  message[type](content, 5/*, messageClose*/);
}


