import React from 'react'
import {Button, Icon} from 'antd';
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {DATA_TOPICSMODEL} from '../../../../utils/routePath'
import {TableComponent} from "../../../../component/TableComponent";

export default function TableData ({sorter, filByState, filByEnabled, handleDelete, showModal, ...props}) {
  const columns = [
    {
      title: '模型ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => (
        <Link to={`${DATA_TOPICSMODEL}/id/${record.id}`}>{text}</Link>
      ),
      sorter: true,
      sortOrder: sorter.match(/-id/)? 'descend': sorter.match(/id/) ? 'ascend' : false,
    },  {
      title: '模型名称',
      dataIndex: 'modelName',
      key: 'modelName',
      render: (text, record) => (
        <Link to={`${DATA_TOPICSMODEL}/id/${record.id}`}>{text}</Link>
      ),
    },{
      title: '版块名称',
      dataIndex: 'forumId',
      key: 'forumId',
      render: (record) =>
      {
        return record===1?'产品'
        :record===2?'品牌'
          :record===3?'新闻'
            :record===4?'评测'
              :record===5?'视频':'暂无'
      }
    }, {
      title: '模型状态',
      dataIndex: 'modelStatus',
      key: 'modelStatus',
      filters: [
        { text: 'NEW', value: 'NEW'},
        { text: 'RUNNABLE', value: 'RUNNABLE'},
        { text: 'CLASSIFICATION', value: 'CLASSIFICATION'},
        { text: 'WAITING', value: 'WAITING'},
        { text: 'DONE', value: 'DONE' },
        { text: 'DELETE', value: 'DELETE'},
        { text: 'TERMINATED', value: 'TERMINATED'},
      ],
      filterMultiple: false,
      filteredValue: filByState ? [filByState] : null,
    }, {
      title: '模型状态描述',
      dataIndex: 'modelStatusValue',
      key: 'modelStatusValue ',
    }, {
      title: '模型优先级',
      dataIndex: 'priority',
      key: 'priority',
    }, {
      title: '测试数据占样本数据百分比',
      dataIndex: 'confRandomSelection',
      key: 'confRandomSelection',
    }, {
      title: '是否覆盖',
      dataIndex: 'confOverwrite',
      key: 'confOverwrite',
      render: (record) =>
        {return record===1?'是':'否'}
    }, {
      title: '样本总数',
      dataIndex: 'resultSamples',
      key: 'resultSamples',
    }, {
      title: '模型分析结果',
      dataIndex: 'resultText',
      key: 'resultText',
      width: '30%',
      render: text => (
        <span style={{WebkitBoxOrient: 'vertical'}}>{text}</span>
      )
    }, {
      title: '操作',
      key: 'action',
        render: (text, record) => (
          <span style={{fontSize: 14}}>
            {/*<Link to={`${DATA_TOPICSMODEL}/modify/${record.id}`}>
              <Icon type="edit" title="编辑"/>
            </Link>
            <span className="ant-divider"/>*/}
            <span>
              <Button ghost size ="small" type="primary" data-id={record.id} id="state" onClick={showModal}>执行</Button>
            </span>
            { record.modelStatus === 'DELETE' ||
              <span>
                <span className="ant-divider"/>
                <Button ghost size ="small" type="primary" data-id={record.id} id="priority" onClick={showModal}>优先级</Button>
                <span className="ant-divider"/>
              </span>
            }
            { record.modelStatus !== 'DELETE' &&

              <a><Icon data-id={record.id} onClick={handleDelete} type="delete" title="删除"/></a>
            }
          </span>
        ),
    }
  ];
  return (
    <TableComponent label="模型列表" addLink={`${DATA_TOPICSMODEL}/add`} columns={columns} {...props}/>
  )
}
TableData.propTypes = {
  data: PropTypes.array.isRequired
}
