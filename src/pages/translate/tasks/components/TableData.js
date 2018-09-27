import {Link} from 'react-router';
import PropTypes from 'prop-types'
import React from 'react'
import {Icon, Badge} from 'antd';
import {FRONT_DOMAIN} from "../../../../utils/config"
import {TRANSLATE_TASKS} from "../../../../utils/routePath"
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({sorter, filByState, filByEnabled, handleDelete, ...props}) {
  const states = ['待领取', '未提交', '待审核', '审核中', '审核失败', '审核成功', '已支付']
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${TRANSLATE_TASKS}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/)? 'descend': sorter.match(/id/) ? 'ascend' : false,
    },
    {
      title: 'topicID',
      dataIndex: 'topicId',
      key: 'topicId',
      render: (text, record) => (
        <a href={`${FRONT_DOMAIN}/p/${record.topicId}`} target="_blank">{text}</a>
      ),
    },
    {
      title: '任务标题',
      dataIndex: 'title',
      key: 'title',
      width: '30%',
      render: (text, record) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>
          <Link to={`${TRANSLATE_TASKS}/id/${record.id}`}>{text}</Link>
        </span>
      ),
    },
    {
      title: '单词数',
      dataIndex: 'wordsNum',
      key: 'wordsNum',
    }, {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (state) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>{states[state - 1]}</span>
      ),
      filters: [
        { text: '待领取', value: 1 },
        { text: '未提交', value: 2 },
        { text: '待审核', value: 3 },
        { text: '审核中', value: 4 },
        { text: '审核失败', value: 5 },
        { text: '审核成功', value: 6 },
        { text: '已支付', value: 7 },
      ],
      filterMultiple: false,
      filteredValue: filByState ? [filByState] : null,
    }, {
      title: '奖励分数',
      dataIndex: 'bonus',
      key: 'bonus',
      render: text => text ? text : '--'
    }, {
      title: '中文字数',
      dataIndex: 'wordsNumCn',
      key: 'wordsNumCn',
      render: text => text ? text : '--'
    }, {
      title: '可用',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (text) => (
        text === 0
          ? <Badge status="error" text={'不可用'}/>
          : text === 1
          ? <Badge status="processing" text={'可用'}/>
          : text
      ),
      filters: [
        { text: '可用', value: 1 },
        { text: '不可用', value: 0 },
      ],
      filterMultiple: false,
      filteredValue: filByEnabled ? [filByEnabled] : null,
    }, {
      title: '创建人ID',
      dataIndex: 'creator',
      key: 'creator',
    }, {
      title: '修改人ID',
      dataIndex: 'modifier',
      key: 'modifier',
    }, {
      title: '创建人',
      dataIndex: 'creatorAccount',
      key: 'creatorAccount',
    }, {
      title: '修改人',
      dataIndex: 'modifierAccount',
      key: 'modifierAccount',
    }, {
      title: '创建时间',
      dataIndex: 'created',
      key: 'created',
      sorter: true,
      sortOrder: sorter.match(/-created/)? 'descend': sorter.match(/created/) ? 'ascend' : false,
    }, {
      title: '修改时间',
      dataIndex: 'modified',
      key: 'modified',
      render: (text) => (
        <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span>
      ),
      sorter: true,
      sortOrder: sorter.match(/-modified/)? 'descend': sorter.match(/modified/) ? 'ascend' : false,
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span style={{fontSize: 16}}>
          <Link to={`${TRANSLATE_TASKS}/modify/${record.id}`}>
            <Icon type="edit" title="编辑"/>
          </Link>
          {
            record.enabled === 1 && record.state === 1 &&
            <span>
              <span className="ant-divider"/>
                <a>
                  <Icon data-id={record.id} onClick={handleDelete} type="delete" title="删除"/>
                </a>
            </span>
          }

        </span>
      ),
    }
  ]
  return (
    <TableComponent label="任务列表" addLink={`${TRANSLATE_TASKS}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired,
}
