## (POST|DELETE|PATCH|GET) 系统公告 单资源 接口 [/reward/admin/notices]
+ Description
  + [MUST] Authenticated
  + [MUST] Administritor
  + [MAY] 只查询需要用到的字段 
    + fields[notices]=id,title
  + [MAY] 只修改需要修改的字段
  + NOTE : PATCH要在资源对象(Primary Data)中明确指定id
  
+ Fields
  + title (string) [NOT NULL] - 标题
  + content (string) [NOT NULL] - 内容
  + state (int) - 2代表首页显示(缺省) 3代表历史通知
  + enabled (int) - 1:已启用, 0:已删除(缺省1)

+ Parameters
  + id (string) - 资源标识符

+ Error Response 400 (application/json)
```
  {
     "errors": [
        {
          "status": "400",
          "code": "应用程序code编码",
          "title": "Bad Request",
          "detail": "错误信息描述"
        }
      ]
  }
```
    
### 新增公告 [POST] /reward/admin/notices
+ Request (application/json)
```
  {
    "data": {
      "title": "我是最新系统公告",
      "content": "今天我代表夺宝请求释放米饭的洪荒之力",
      "state": 3
    }
  }
```
+ Response 201 (application/json)
  + Headers
```
  Location: /reward/notices/6
```
  + Body
```
  {
    "data": {
      "id": 6,
      "type": "notices"
    }
  }
``` 
+ Response 204 (application/json)
+ Response 400 (application/json)
```
  {
    "errors": [
      {
        "status": "400",
        "code": "应用程序code编码",
        "title": "Bad Request",
        "detail": "错误信息描述"
      }
    ]
  }
```      
### 删除系统公告 [DELETE] /reward/admin/notices/{id} 
+ Response 204 (application/json)

  
### 修改系统公告 [PATCH] /reward/admin/notices/{id}
+ Description
  + [MUST] Authenticated
  + [MUST] Administritor

+ Request (application/json)
```  
  {
    "data": {
      "title": "我是修改的系统公告"
    }
  }
```          
+ Response 200 (application/json)
+ Response 204 (application/json)

### 查询系统公告详情 [GET] /reward/admin/notices/{id}
+ Response 200 (application/json)
``` 
  {
    "data": {
      "id": 5,
      "enabled": 1,
      "creator": 1046,
      "modifier": 1046,
      "created": "2017-09-20 15:34:46",
      "modified": "2017-09-20 15:35:34",
      "title": "米饭夺宝 数据被黑 公告启示!!!！",
      "content": "TEST",
      "state": 3
    }
  }
``` 


## (GET) 系统公告 多资源 接口 [/reward/admin/notices]
+ Description
  + [MUST] Authenticated
  + [MUST] Administritor
  + [MAY] 只查询需要用到的字段 
    + ?fields[notices]=id,title
  + [MAY] 查询列表时降序排序 __?sort=-created__
  
+ Fields
  + title (string) - 标题
  + content (string) - 内容
  + state (int) - 2代表首页显示(缺省) 3代表历史通知
  + enabled (int)  - 1:已启用, 0:已删除(缺省1)

+ Meta
  + number (int) - 当前页
  + size (int) - 每页大小
  + numberOfElements (int) - 当前页有多少记录
  + last (boolean) - 是否是最后一页
  + totalPages (int) - 总页数
  + sort (object) - 排序相关信息
  + first (boolean) - 是否是第一页
  + totalElements - 总记录数

+ Error Response 400 (application/json)
```
  {
     "errors": [
        {
          "status": "400",
          "code": "应用程序code编码",
          "title": "Bad Request",
          "detail": "错误信息描述"
        }
      ]
  }
```
### 查询系统公告列表 [GET] /reward/admin/notices
+ Response 200 (application/json)
``` 
  {
    "meta": {
      "totalPages": 3,
      "totalElements": 5,
      "size": 2,
      "number": 1,
      "numberOfElements": 2,
      "first": true,
      "last": false,
      "sort": null
    },
    "links": {
      "self": "/reward/admin/notices?page[number]=1&page[size]=2",
      "first": "/reward/admin/notices?page[number]=1&page[size]=2",
      "next": "/reward/admin/notices?page[number]=2&page[size]=2",
      "last": "/reward/admin/notices?page[number]=3&page[size]=2"
    },
    "data": [
      {
        "id": 1,
        "enabled": 1,
        "creator": 0,
        "modifier": 0,
        "created": "2016-08-20 19:13:49",
        "modified": "2016-08-20 19:13:49",
        "title": "G20峰会期间，物流配送安排",
        "content": "\\r\\n  亲爱的用户，为配合杭州G20峰会安保工作，米饭夺宝的商品物流将会受到不同程度的影响：\\r\\n\\r\\n  1、部分商品发货受限，包含液体、电池、粉末状等的商品将不能发货，因此我们将暂停大疆无人机、智能平衡车、香水、打火机等商品的发货。\\r\\n\\r\\n  2、收货地址为浙江省的商品，快件派送会较慢，其中杭州市四个区域（江干区、萧山区、滨江区、西湖区）在8月22日至9月7日间进行派件的\\r\\n\\r\\n  包裹可能会延迟到9月8日左右进行派送。\\r\\n\\r\\n  3、受限商品发货以及浙江省区域的派送速度将在9月10日左右恢复。\\r\\n\\r\\n  以上影响给您带来不便，敬请见谅，请您耐心等待。\\r\\n",
        "state": 3
      },
      {
        "id": 2,
        "enabled": 1,
        "creator": 0,
        "modifier": 0,
        "created": "2016-09-05 15:19:30",
        "modified": "2016-09-05 15:19:30",
        "title": "MI-FanFan平台第一期",
        "content": "MI-FanFan平台第一期将于2016.12.31上线，敬请期待~~",
        "state": 3
      }
    ]
  }
``` 
