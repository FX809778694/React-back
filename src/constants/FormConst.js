import React from 'react'

//添加页，修改页，详情页 页面布局参数
export const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 15},
};
export const buttonItemLayout = {
  wrapperCol: {span: 10, offset: 5},
};

//日期初始时间格式参数
export const dateFormat = 'YYYY-MM-DD  HH:mm:ss';

//详情页属性列表
export const featuresColumns = [
  {
    title: '名称',
    dataIndex: '_name',
    key: '_name',
  }, {
    title: '参数',
    dataIndex: '_value',
    key: '_value',
    render: text => <span dangerouslySetInnerHTML={{__html: text}}/>
  }
];
