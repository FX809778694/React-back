import React from 'react'
import {Button, Input} from 'antd';

const Search = Input.Search;

export default function Screening({onTitleInputChange, onIdInputChange, searchId, searchText, onSearch, handleReset, title, titlePlaceholder}) {
  return (
    <div className="search" style={{marginBottom: '20px'}}>
      <label>
        ID：
        <Search
          placeholder="请输入标识ID -- 完全匹配"
          value={searchId}//必须跟品牌id完全匹配，才能搜索到，要加输入条件
          onSearch={onSearch}
          onPressEnter={onSearch}//按下Enter键搜索标题关键字
          onChange={onIdInputChange}
        />
      </label>

      <label style={{marginLeft: '20px'}}>
        {title}
        <Search
          placeholder={titlePlaceholder || "请输入标题 -- 模糊匹配"}
          style={{width: 200}}
          value={searchText}
          onSearch={onSearch}
          onPressEnter={onSearch}//按下Enter键搜索标题关键字
          onChange={onTitleInputChange}
        />
      </label>

      <Button type="primary" onClick={onSearch} style={{marginLeft: '20px'}}>搜索</Button>
      <Button type="info" onClick={handleReset} style={{marginLeft: '20px'}}>重置筛选条件</Button>
    </div>
  )
}

