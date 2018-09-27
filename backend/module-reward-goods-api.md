## (POST|DELETE|PATCH|GET) 商品信息 单资源 接口 [/reward/admin/goods]
+ Description
  + [MUST] Authenticated
  + [MUST] Administritor
  + [MAY] 只查询需要用到的字段 
    + fields[goods]=id,title
  + [MAY] 只修改需要修改的字段
  + NOTE : PATCH要在资源对象(Primary Data)中明确指定id
  
+ Fields
+ Fields
  + categoryId (int) [NOT NULL] - 类别id
  + title (string) [NOT NULL] - 奖项标题
  + desc (string) - 奖项描述
  + price (int) [NOT NULL] - 奖项价格
  + buyUnit (int) [NOT NULL] - 奖项夺宝单词所需米粒数量
  + buyTimes (int) [NOT NULL] - 奖项夺宝单词所需夺宝数目
  + state (int)  - 1:创建完成, 2:首页显示, 3:首页不显示, 9:审核不通过(缺省1)
  + headImages (array)
    + images (object) - 图片
      + id (int)  [UPDATE NOT NULL] - 图片id
      + image (string) [NOT NULL] - 图片URL地址
      + title (string) - 图片标题
      + alt (string) - 图片鼠标悬浮显示文字
  + contentImages (array)
      + images (object) - 图片
        + id (int) [UPDATE NOT NULL] - 图片id
        + image (string)  [NOT NULL] - 图片URL地址
        + title (string) - 图片标题
        + alt (string) - 图片鼠标悬浮显示文字
  + enabled (int)  - 1:已启用, 0:已删除 (缺省1)

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
    
### 新增公告 [POST] /reward/admin/goods
+ Request (application/json)
```
  {
    "data": {
      "categoryId": 1,
      "title": "新增奖项标题",
      "desc": "新增奖项描述，我要成为海贼王的男人",
      "price": 5,
      "buyUnit": 10,
      "buyTimes": 5,
      "headImages": [
        {
          "image": "http://img.alicdn.com/imgextra/i1/2837078797/TB2H83Ac5GO.eBjSZFpXXb3tFXa_!!2837078797.jpg"
        }
      ],
      "contentImages": [
        {
          "image": "http://img.alicdn.com/imgextra/i1/2837078797/TB2H83Ac5GO.eBjSZFpXXb3tFXa_!!2837078797.jpg"
        }
      ]
    }
  }
```
+ Response 201 (application/json)
  + Headers
```
  Location: /reward/goods/10
```
  + Body
```
  {
    "data": {
      "id": 10,
      "type": "goods"
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
### 删除夺宝类别 [DELETE] /reward/admin/goods/{id} 
+ Response 204 (application/json)

  
### 修改夺宝类别 [PATCH] /reward/admin/goods/{id}
+ Description
  + [MUST] Authenticated
  + [MUST] Administritor

+ Request (application/json)
```  
  {
    "data": {
      "categoryId": 1,
      "title": "新增奖项标题",
      "desc": "新增奖项描述，我要成为海贼王的男人",
      "price": 5,
      "buyUnit": 10,
      "buyTimes": 5,
      "headImages": [
        {
          "image": "http://img.alicdn.com/imgextra/i1/2837078797/TB2H83Ac5GO.eBjSZFpXXb3tFXa_!!2837078797.jpg"
        }
      ],
      "contentImages": [
        {
          "image": "http://img.alicdn.com/imgextra/i1/2837078797/TB2H83Ac5GO.eBjSZFpXXb3tFXa_!!2837078797.jpg"
        }
      ]
    }
  }
```          
+ Response 200 (application/json)
+ Response 204 (application/json)

### 查询夺宝类别详情 [GET] /reward/admin/goods/{id}
+ Response 200 (application/json)
``` 
  {
    "data": {
      "id": 3,
      "enabled": 1,
      "creator": 0,
      "modifier": 0,
      "categoryId": 1,
      "title": "Blue snowball专业电容话筒麦克风 K歌录音直播 USB直插原装进口",
      "desc": "降噪低失真 三种拾音模式 可调节支架",
      "price": 598,
      "buyUnit": 10,
      "buyTimes": 598,
      "state": 0,
      "headImages": [
        {
          "id": 31,
          "image": "http://img.alicdn.com/imgextra/i1/2837078797/TB2H83Ac5GO.eBjSZFpXXb3tFXa_!!2837078797.jpg"
        }
      ],
      "contentImages": [
        {
          "id": 31,
          "image": "http://img.alicdn.com/imgextra/i1/2837078797/TB2H83Ac5GO.eBjSZFpXXb3tFXa_!!2837078797.jpg"
        }
      ]    
    }
  }
``` 

## (GET) 夺宝公告 多资源 接口 [/reward/admin/goods]
+ Description
  + [MUST] Authenticated
  + [MUST] Administritor
  + [MAY] 只查询需要用到的字段 
    + ?fields[goods]=id,name,title
  + [MAY] 查询列表时降序排序 __?sort=-created__
  
+ Fields
  + categoryId (int) 类别id
  + title (string) - 奖项标题
  + desc (string) - 奖项描述
  + price (int) - 奖项价格
  + buyUnit (int) - 奖项夺宝单词所需米粒数量
  + buyTimes (int) - 奖项夺宝单词所需夺宝数目
  + state (int)  - 1:创建完成, 2:首页显示, 3:首页不显示, 9:审核不通过(缺省1)
  + headImages (array)
    + images (object) - 图片
      + id (int) - 图片id
      + image (string) - 图片URL地址
      + title (string) - 图片标题
      + alt (string) - 图片鼠标悬浮显示文字
  + contentImages (array)
      + images (object) - 图片
        + id (int) - 图片id
        + image (string) - 图片URL地址
        + title (string) - 图片标题
        + alt (string) - 图片鼠标悬浮显示文字
  + enabled (int)  - 1:已启用, 0:已删除 (缺省1)

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
### 查询夺宝类别列表 [GET] /reward/admin/goods
+ Response 200 (application/json)
``` 
  {
    "meta": {
      "totalPages": 10,
      "totalElements": 19,
      "size": 2,
      "number": 1,
      "numberOfElements": 2,
      "first": true,
      "last": false,
      "sort": null
    },
    "links": {
      "self": "/reward/admin/goods?page[number]=1&page[size]=2",
      "first": "/reward/admin/goods?page[number]=1&page[size]=2",
      "next": "/reward/admin/goods?page[number]=2&page[size]=2",
      "last": "/reward/admin/goods?page[number]=10&page[size]=2"
    },
    "data": [
      {
        "id": 1,
        "enabled": 1,
        "creator": 0,
        "modifier": 0,
        "created": "2017-08-28 16:44:06",
        "modified": "2017-08-28 16:44:06",
        "categoryId": 2,
        "title": "德国大师 GERMAN MAESTRO 3can116 耳机 歌德耳机 HiFi耳机",
        "desc": "2个版本 线控版439 普通版399 线控通话",
        "price": 399,
        "buyUnit": 10,
        "buyTimes": 399,
        "state": 0,
        "headImages": [
          {
            "id": 1,
            "image": "https://img.alicdn.com/imgextra/i3/2670472914/TB2jzajnFXXXXX5XpXXXXXXXXXX_!!2670472914.jpg_430x430q90.jpg",
            "title": "德国大师",
            "alt": "德国大师 GERMAN MAESTRO 3can116 耳机 歌德耳机 HiFi耳机"
          },
          {
            "id": 2,
            "image": "http://static.budee.com/yyren/image/banner/maestro.jpg",
            "title": "德国大师",
            "alt": "德国大师 GERMAN MAESTRO 3can116 耳机 歌德耳机 HiFi耳机"
          },
          {
            "id": 3,
            "image": "https://img.alicdn.com/imgextra/i1/2670472914/TB2qjqXnFXXXXb9XpXXXXXXXXXX_!!2670472914.jpg_430x430q90.jpg"
          },
          {
            "id": 4,
            "image": "https://img.alicdn.com/imgextra/i2/2670472914/TB2A7SXnFXXXXbIXpXXXXXXXXXX_!!2670472914.jpg_430x430q90.jpg"
          },
          {
            "id": 5,
            "image": "https://img.alicdn.com/imgextra/i4/2670472914/TB20ph9nFXXXXckXpXXXXXXXXXX_!!2670472914.jpg_430x430q90.jpg"
          }
        ],
        "contentImages": [
          {
            "id": 2,
            "image": "http://static.budee.com/yyren/image/banner/maestro.jpg",
            "title": "德国大师",
            "alt": "德国大师 GERMAN MAESTRO 3can116 耳机 歌德耳机 HiFi耳机"
          },
          {
            "id": 6,
            "image": "https://img.alicdn.com/imgextra/i2/2670472914/TB2i4R_jVXXXXaVXpXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 7,
            "image": "https://img.alicdn.com/imgextra/i1/2670472914/TB2wb9vjVXXXXaIXXXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 8,
            "image": "https://img.alicdn.com/imgextra/i4/2670472914/TB2TUOBjVXXXXXCXXXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 9,
            "image": "https://img.alicdn.com/imgextra/i2/2670472914/TB2tY5zjVXXXXX8XXXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 10,
            "image": "https://img.alicdn.com/imgextra/i3/2670472914/TB2uhyujVXXXXa4XXXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 11,
            "image": "https://img.alicdn.com/imgextra/i2/2670472914/TB2tsX8jVXXXXa7XpXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 12,
            "image": "https://img.alicdn.com/imgextra/i3/2670472914/TB2dh1ajVXXXXapXpXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 13,
            "image": "https://img.alicdn.com/imgextra/i3/2670472914/TB2G4F_jVXXXXbgXpXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 14,
            "image": "https://img.alicdn.com/imgextra/i3/2670472914/TB2SQ1ujVXXXXa5XXXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 15,
            "image": "https://img.alicdn.com/imgextra/i2/2670472914/TB2FUOcjVXXXXXuXpXXXXXXXXXX_!!2670472914.jpg"
          },
          {
             "id": 16,
            "image": "https://img.alicdn.com/imgextra/i1/2670472914/TB2RWX8jVXXXXbGXpXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 17,
            "image": "https://img.alicdn.com/imgextra/i2/2670472914/TB2k0l2jVXXXXakXpXXXXXXXXXX_!!2670472914.jpg"
          },
          {
             "id": 18,
            "image": "https://img.alicdn.com/imgextra/i1/2670472914/TB26qCgjVXXXXc.XXXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 19,
            "image": "https://img.alicdn.com/imgextra/i4/2670472914/TB2R3SXjVXXXXaZXpXXXXXXXXXX_!!2670472914.jpg"
          },
          {
            "id": 20,
            "image": "https://img.alicdn.com/imgextra/i1/2670472914/TB2..WnjVXXXXcrXXXXXXXXXXXX_!!2670472914.jpg"
          }
        ]
      },
      {
        "id": 2,
        "enabled": 1,
        "creator": 0,
        "modifier": 0,
        "categoryId": 3,
        "title": "小米随身wifi 官方正品包邮 便携路由器网卡USB无线信号接收器",
        "desc": "小巧便携",
        "price": 12,
        "buyUnit": 10,
        "buyTimes": 12,
        "state": 0,
        "headImages": [
          {
            "id": 21,
            "image": "http://img.alicdn.com/imgextra/i4/2993967042/TB2W0CJbOlnpuFjSZFgXXbi7FXa_!!2993967042.jpg"
          },
          {
            "id": 22,
            "image": "http://img.alicdn.com/imgextra/i4/2993967042/TB2LHHKd98mpuFjSZFMXXaxpVXa_!!2993967042.jpg"
          },
          {
            "id": 23,
            "image": "http://img.alicdn.com/imgextra/i1/2993967042/TB2kH2yd4BmpuFjSZFsXXcXpFXa_!!2993967042.jpg"
          }
        ],
        "contentImages": [
          {
            "id": 24,
            "image": "http://img.alicdn.com/imgextra/i3/2993967042/TB2MGiVbOBnpuFjSZFzXXaSrpXa_!!2993967042.jpg"
          },
          {
            "id": 25,
            "image": "http://img.alicdn.com/imgextra/i2/2993967042/TB2Uw3mbmhlpuFjSspkXXa1ApXa_!!2993967042.jpg"
          },
          {
            "id": 26,
            "image": "http://img.alicdn.com/imgextra/i1/2993967042/TB2OXeMbNBmpuFjSZFDXXXD8pXa_!!2993967042.jpg"
          },
          {
            "id": 27,
            "image": "http://img.alicdn.com/imgextra/i1/2993967042/TB2LuuLbUhnpuFjSZFEXXX0PFXa_!!2993967042.jpg"
          },
          {
             "id": 28,
             "image": "http://img.alicdn.com/imgextra/i1/2993967042/TB2CdyJbUhnpuFjSZFPXXb_4XXa_!!2993967042.jpg"
          },
          {
            "id": 29,
            "image": "http://img.alicdn.com/imgextra/i3/2993967042/TB28dGAbJBopuFjSZPcXXc9EpXa_!!2993967042.jpg"
          },
          {
            "id": 30,
            "image": "http://img.alicdn.com/imgextra/i1/2993967042/TB2.v1PbHBmpuFjSZFAXXaQ0pXa_!!2993967042.jpg"
          }
        ]
      }
    ]
  }
``` 
