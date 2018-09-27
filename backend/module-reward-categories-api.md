## (POST|DELETE|PATCH|GET) 夺宝类别 单资源 接口 [/reward/admin/categories]
+ Description
  + [MUST] Authenticated
  + [MUST] Administritor
  + [MAY] 只查询需要用到的字段 
    + fields[categories]=id,name
  + [MAY] 只修改需要修改的字段
  + NOTE : PATCH要在资源对象(Primary Data)中明确指定id
  
+ Fields
  + name (string) [NOT NULL] - 类别名称
  + cssClass (string) [NOT NULL] - 显示css的class
  + order (int) - 排序(缺省0)
  + enabled (int)  - 1:已启用, 0:已删除(缺省1)

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
    
### 新增类别 [POST] /reward/admin/categories
+ Request (application/json)
```
  {
    "data": {
      "name": "新增类别",
      "cssClass": "icon-add",
      "order": 10
    }
  }
```
+ Response 201 (application/json)
  + Headers
```
  Location: /reward/categories/10
```
  + Body
```
  {
    "data": {
      "id": 10,
      "type": "categories"
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
### 删除夺宝类别 [DELETE] /reward/admin/categories/{id} 
+ Response 204 (application/json)

  
### 修改夺宝类别 [PATCH] /reward/admin/categories/{id}
+ Description
  + [MUST] Authenticated
  + [MUST] Administritor

+ Request (application/json)
```  
  {
    "data": {
      "name": "我是修改的夺宝类别"
    }
  }
```          
+ Response 200 (application/json)
+ Response 204 (application/json)

### 查询夺宝类别详情 [GET] /reward/admin/categories/{id}
+ Response 200 (application/json)
``` 
  {
    "data": {
      "id": 5,
      "enabled": 1,
      "creator": 0,
      "modifier": 0,
      "created": "2017-08-28 16:27:25",
      "modified": "2017-08-28 16:27:25",
      "name": "录音专场",
      "cssClass": "icon-record",
      "order": 5
    }
  }
``` 

## (GET) 夺宝类别 多资源 接口 [/reward/admin/categories]
+ Description
  + [MUST] Authenticated
  + [MUST] Administritor
  + [MAY] 只查询需要用到的字段 
    + ?fields[categories]=id,name
  + [MAY] 查询列表时降序排序 __?sort=-created__
  
+ Fields
  + name (string) - 类别名称
  + cssClass (string) - 显示css的class
  + order (int) - 排序(缺省0)
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
### 查询夺宝类别列表 [GET] /reward/admin/categories
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
      "self": "/reward/admin/categories?page[number]=1&page[size]=2",
      "first": "/reward/admin/categories?page[number]=1&page[size]=2",
      "next": "/reward/admin/categories?page[number]=2&page[size]=2",
      "last": "/reward/admin/categories?page[number]=3&page[size]=2"
    },
    "data": [
      {
        "id": 1,
        "enabled": 1,
        "creator": 0,
        "modifier": 0,
        "created": "2017-08-24 16:20:03",
        "modified": "2017-08-24 16:20:06",
        "name": "话筒天地",
        "cssClass": "icon-microphone",
        "order": 1
      },
      {
        "id": 2,
        "enabled": 1,
        "creator": 0,
        "modifier": 0,
        "created": "2017-08-25 17:03:36",
        "modified": "2017-08-25 17:38:42",
        "name": "耳机新品",
        "cssClass": "icon-earphone",
        "order": 2
      }
    ]
  }
``` 
