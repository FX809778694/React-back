+ 2017年9月18日
    + API初始化

## links

+ Data
    + parentId (long) - 父id
    + type (int) - 类型，1:PC导航, 2:手机快速入口, 3:手机导航 4:友情链接 5 广告
    + sort (int) - 排序
    + title (String) - 标题
    + description (String) - 描述
    + image (String) - 图片地址
    + href (String) - 点击图片要跳转的链接
    + blank (int) - 0：不在新窗口打开，1：在新窗口打开
    + enabled (int) - 0：删除，1：可用
    + creator (long) - 创建人
    + modifier (long) - 修改人
    + created (date) - 创建时间
    + modified (date) - 修改时间

### 增加link [POST] /links

+ Description
    + [MUST] Authenticated
    + [MUST] administrator

+ Parameters
    + parentId - 默认0
    + type - 必填
    + sort - 必填
    + title - 必填
    + description
    + image
    + href
    + blank - 默认0
    + enabled - 默认1

+ 新增Request (application/json)

        {
            "data":{
                "type":1,
                "sort":8,
                "title":"我是帅比",
                "image":"http://static.budee.com/iyyren/image/201709/19/1133/253568032952172544.jpg",
                "href":"www.mifanxing.com",
                "blank":1
            }
        }
        
+ Response 201 (application/json)

    + Headers

            Location: /links/23
    + Body

            {
                "data": {
                    "id": 23,
                    "type": "humanTranslates"
                }
            }

### 修改links [PATCH] /links/{id}

+ Description
    + [MUST] Authenticated
    + [MUST] administrator
+ Parameters
    + title - 必填
    + parentId - 默认0
    + type
    + sort
    + description
    + image
    + href
    + blank - 默认0
    + enabled - 默认1

+ 修改Request (application/json)

        {
            "data":{
                "title":"你才是大傻缺"
            }
        }
+ Response 200 (application/json)

### 链接列表 [GET] /links?sort=sort&filter[type]=1 
+ Description
    + 列表展示字段：id,type,title,enabled,sort,href,blank

+ Parameters
    + type
    + title
    + blank
    + enabled 范围0~1
    + sort - 排序，用户可以选择是否排序
    
    
        {
          "meta": {
            "totalPages": 1,
            "totalElements": 7,
            "size": 10,
            "number": 1,
            "numberOfElements": 7,
            "first": true,
            "last": true,
            "sort": [
              {
                "direction": "ASC",
                "property": "sort",
                "ignoreCase": false,
                "nullHandling": "NATIVE",
                "ascending": true,
                "descending": false
              }
            ]
          },
          "links": {
            "self": "/links?sort=sort&filter[type]=1&page[number]=1&page[size]=10",
            "first": "/links?sort=sort&filter[type]=1&page[number]=1&page[size]=10",
            "last": "/links?sort=sort&filter[type]=1&page[number]=1&page[size]=10"
          },
          "data": [
            {
              "id": 1,
              "enabled": 1,
              "creator": 1,
              "modifier": 1,
              "created": "2016-12-05 11:47:34",
              "modified": "2017-09-01 12:43:19",
              "parentId": 0,
              "type": 1,
              "sort": 1,
              "title": "概述",
              "description": "desc",
              "image": "http://static.budee.com/yyren/image/banner/banner-01.jpg",
              "href": "/",
              "blank": 0
            },
            {
              "id": 2,
              "enabled": 1,
              "creator": 1,
              "modifier": 1,
              "created": "2016-12-05 11:47:34",
              "modified": "2016-12-05 11:47:34",
              "parentId": 0,
              "type": 1,
              "sort": 2,
              "title": "品牌",
              "description": "desc",
              "image": "http://static.budee.com/yyren/image/banner/banner-02.jpg",
              "href": "/products/filter-brand",
              "blank": 0
            },
            {
              "id": 3,
              "enabled": 1,
              "creator": 1,
              "modifier": 1,
              "created": "2016-12-05 11:47:34",
              "modified": "2016-12-05 11:47:34",
              "parentId": 0,
              "type": 1,
              "sort": 3,
              "title": "分类",
              "description": "desc",
              "image": "http://static.budee.com/yyren/image/banner/banner-03.jpg",
              "href": "/products/category",
              "blank": 0
            }
          ]
        }

### 链接详情 [GET] /links/{id}

    

        {
          "data": {
            "id": 24,
            "enabled": 1,
            "creator": 1031,
            "modifier": 1031,
            "created": "2017-09-19 11:39:06",
            "modified": "2017-09-19 11:39:06",
            "parentId": 0,
            "type": 1,
            "sort": 8,
            "title": "我是帅比",
            "image": "http://static.budee.com/iyyren/image/201709/19/1133/253568032952172544.jpg",
            "href": "www.mifanxing.com",
            "blank": 1
          }
        }

### 删除链接 [DELETE] /links/{id}
+ Description
    + [MUST] Authenticated
    + [MUST] administrator
+ Response 204 (application/json)
+ Response 400 (application/json)