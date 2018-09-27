/**
 * Created by Freeman on 2017/4/13.
 * 校验规则
 */
import {PHONE_REGEXP} from '@/utils/config'
const required = label => value => value ? undefined : `${label}不能为空`
const maxLength = max => value =>
  value && value.length > max ? `不能多于${max}位` : undefined
const minLength = min => value =>
  value && value.length < min ? `不能少于${min}位` : undefined
//const maxLength15 = maxLength(15)
const number = value => value && isNaN(Number(value)) ? '必须是数字' : undefined
const minValue = min => value =>
  value && value < min ? `不能小于${min}` : undefined
//const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? '格式有误' : undefined

const validatePhone = value =>
  PHONE_REGEXP.test(value)

const phone = value =>
  value && !validatePhone(value) ? '格式有误' : undefined
const validatePassword = value => /^\w+$/i.test(value)
const password = value =>
  value && !validatePassword(value) ? '密码格式中只能包含字母数字和下划线' : undefined


export {
  required,
  maxLength,
  minLength,
  number,
  minValue,
  email,
  phone,
  validatePhone,
  password,
}
