+ 2017年9月20日
    + API初始化

## 站点管理
+ Data
    + id (long) 
    + name (String) 站点名
    + domain (String) 域名
    + appKey (String)
    + appSecret (String)
    + description (String) 描述
    + enabled (int) 是否启用 0：否，1：是
    + created (date) 创建时间
    + modified (date) 修改时间

### 站点列表 [GET] /user/sites?filter[enabled]=0
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + enabled
    + name

    
    {
        "meta": {
        "totalPages": 1,
        "totalElements": 1,
        "size": 10,
        "number": 1,
        "numberOfElements": 1,
        "first": true,
        "last": true,
        "sort": null
      },
      "links": {
        "self": "/user/sites?filter[enabled]=0&page[number]=1&page[size]=10",
        "first": "/user/sites?filter[enabled]=0&page[number]=1&page[size]=10",
        "last": "/user/sites?filter[enabled]=0&page[number]=1&page[size]=10"
      },
      "data": [
        {
          "id": 16,
          "enabled": 0,
          "created": "2015-12-09 07:17:29",
          "modified": "2015-12-09 13:37:21",
          "name": "s",
          "appKey": "a2202739-5a2b-4538-9a61-d00ad82c275e",
          "appSecret": "e9bd30bb-bdfe-4cc1-a5ed-700e8e6a4639",
          "description": "ssss"
        }
      ]
    }

### 增加新站点 [POST] /user/sites
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + name 必填
    + domain
    + appKey 为空时，后台生成
    + appSecret 为空时，后台生成
    + description
    + enabled 默认1

+ 新增Request (application/json)
    

    {
        "data":{
            "name":"测试站点222",
            "domain":"永伟",
            "app_key":"11111111",
            "app_secret":"12121212212112",
            "descripiton":"miao'shu描述 1232132"
        }
    }
+ Response 201 (application/json)

    + Headers
    
            Location: /user/sites/53
    + Body
    
            {
                "data": {
                    "id": 53,
                    "type": "/user/sites"
                }
            }
### 修改站点 [PATCH] /user/sites/{id}
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN
    
+ Parameters
    + name
    + domain
    + appKey 为空时，后台生成
    + appSecret 为空时，后台生成
    + description
    + enabled 默认1
+ 修改Request (application/json)

    
    {
        "data":{
            "name":"测试",
            "enabled":0
        }
    }
