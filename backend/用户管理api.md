+ 2017年9月21日
    + API初始化

## 用户管理
+ Data
    + id (long)
    + username (String) 用户名
    + password (String) 密码
    + enabled (int) 是否启用 0：否，1：是
    + regFrom 来源

### 用户列表 [POST] /api/users?filter[enabled]=1
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN
+ Parameters
    + username 
    + enabled
+ Response 200 (application/json)
    

        {
          "meta": {
            "totalPages": 4,
            "totalElements": 34,
            "size": 10,
            "number": 1,
            "numberOfElements": 10,
            "first": true,
            "last": false,
            "sort": null
          },
          "links": {
            "self": "/api/users?filter[enabled]=0&page[number]=1&page[size]=10",
            "first": "/api/users?filter[enabled]=0&page[number]=1&page[size]=10",
            "next": "/api/users?filter[enabled]=0&page[number]=2&page[size]=10",
            "last": "/api/users?filter[enabled]=0&page[number]=4&page[size]=10"
          },
          "data": [
            {
              "id": 239,
              "enabled": 0,
              "created": "2015-12-09 16:29:55",
              "modified": "2015-12-09 16:29:55",
              "username": "13611019226",
              "regFrom": 0,
              "loginTimes": 0
            },
            {
              "id": 245,
              "enabled": 0,
              "created": "2015-12-10 08:50:08",
              "modified": "2015-12-10 08:50:08",
              "username": "13612819211",
              "regFrom": 0,
              "loginTimes": 0
            },
            {
              "id": 246,
              "enabled": 0,
              "created": "2015-12-10 09:14:18",
              "modified": "2015-12-10 09:14:18",
              "username": "13612919211",
              "regFrom": 0,
              "loginTimes": 0
            },
            {
              "id": 248,
              "enabled": 0,
              "created": "2015-12-10 09:17:17",
              "modified": "2015-12-10 09:17:17",
              "username": "13614919211",
              "regFrom": 0,
              "loginTimes": 0
            }
          ]
        }

### 增加新用户 [POST] /api/users
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + username 
    + password
    + enabled

+ 新增Request (application/json)
    
    
    {
        "data":{
            "username":18611194890,
            "password":"xiaoyao3102",
            "enabled":1
        }
    }
+ Response 201 (application/json)

    + Headers
    
            Location: /api/users/1031
    + Body
    
            {
                "data": {
                    "id": 1031,
                    "type": "/api/users"
                }
            }
### 修改用户 [PATCH] /api/users/{id}
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + password 修改密码时必填 其他操作不填
    + oldPassword 修改密码时必填 其他操作不填
    + enabled 禁用时必填，其他操作不填

    
    {
        "data":{
            "password":"xiaoyao3112",
            "oldPassword":"xiaoyao3102"
        }
    }
+ Response 200 (application/json)

### 保存用户到多个群组 [POST] /api/users/sites/{siteId}/users/{userId}/groups
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + siteId
    + userId
    + groupIds(long[]) 群组ids

+ Request (application/json)
    
    
    {
        "data":{
            "groupIds":[33,34]
        }
    }
+ Response 200 (application/json)

### 保存用户到多个角色 [POST] /api/users/sites/{siteId}/users/{userId}/roles
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + siteId
    + userId
    + roleIds(long[]) 角色ids

+ Request (application/json)
    
    
    {
        "data":{
            "roleIds":[29]
        }
    }
+ Response 200 (application/json)

### 用户帐号列表 [GET] /user/userAccounts?filter[userId]=1031
+ Data
    + id  (Long) - 帐号标识
    + userId (Long) - 用户标识
    + accountType (int) - 账号类型 0:mobile 1:email 3:微信
    + account (String) - 登陆账号
    + openid - (String) - openid
    + isbind (int) - 该帐号是否已绑定主账号，0：否，1：是
    + accountCrc (int) - CRC
    + created (Date) - 创建时间
    + modified (Date) - 修改时间
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN
    + 本接口为用户模块的二级列表，一个用户可能有多个帐号
    + 列表展示id,userId,accountType,account,openid,isbind,accountCrc,created,modified
+ Parameters
    + userId - 必填 
+ Response 200 (application/json)
    
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
            "self": "/user/userAccounts?filter[userId]=1031&page[number]=1&page[size]=10",
            "first": "/user/userAccounts?filter[userId]=1031&page[number]=1&page[size]=10",
            "last": "/user/userAccounts?filter[userId]=1031&page[number]=1&page[size]=10"
          },
          "data": [
            {
              "id": 59,
              "created": "2016-03-29 17:10:34",
              "modified": "2016-03-29 17:10:34",
              "userId": 1031,
              "accountType": 0,
              "account": "18611194890",
              "isbind": 0,
              "accountCrc": 4251241366
            }
          ]
        }