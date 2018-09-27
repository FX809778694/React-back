import {Notification} from "./ShowMsg";

export const errorAction = (err) => {
  const { status, data } = err.response
  err.response && status
    ? Notification('error', `信息添加失败！错误代码：${status}`, data.error ? data.error : data.errors ? data.errors[0].detail : data)
    : Notification('error', '信息添加失败！')
}
