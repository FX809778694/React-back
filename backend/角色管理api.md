+ 2017年9月21日
    + API初始化

## 角色管理
+ Data
    + id (long)
    + siteId (long) - 站点id
    + name (String) - 角色名
    + description (String) - 描述
    + enabled (int) -  是否启用 0：否，1：是

### 查询角色列表 [GET] /user/roles
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN
+ Parameters
    + siteId
    + name
    + enabled

    
    {
      "meta": {
        "totalPages": 1,
        "totalElements": 6,
        "size": 50,
        "number": 1,
        "numberOfElements": 6,
        "first": true,
        "last": true,
        "sort": null
      },
      "links": {
        "self": "/user/roles?filter[siteId]=14&page[number]=1&page[size]=50",
        "first": "/user/roles?filter[siteId]=14&page[number]=1&page[size]=50",
        "last": "/user/roles?filter[siteId]=14&page[number]=1&page[size]=50"
      },
      "data": [
        {
          "id": 24,
          "enabled": 1,
          "created": "2017-01-17 14:10:35",
          "modified": "2017-01-17 14:10:35",
          "siteId": 14,
          "name": "ROLE_USER",
          "description": "普通用户角色"
        },
        {
          "id": 25,
          "enabled": 1,
          "created": "2017-01-17 14:11:38",
          "modified": "2017-01-17 14:11:38",
          "siteId": 14,
          "name": "ROLE_ADMIN",
          "description": "超级管理员角色"
        }
      ]
    }

### 增加新角色 [POST] /user/roles
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + siteId 必填
    + name 必填
    + description
    + enabled 默认1
+ 新增Request (application/json)
    

    {
        "data":{
            "name":"role测试",
            "siteId":14
        }
    }
### 修改角色 [PATCH] /user/roles/{id}
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + siteId
    + name
    + description
    + enabled
+ 修改Request (application/json)
    

    {
        "data":{
            "enabled":0
        }
    }

### 查找某一个站点下用户的角色集合, 不包括群组中的 [GET] /user/roles/sites/{siteId}/users/{userId}
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + siteId (long) - 站点id
    + userId (long) - 用户id

    
    {
      "data": [
        {
          "id": 25,
          "siteId": 14,
          "name": "ROLE_ADMIN"
        },
        {
          "id": 26,
          "siteId": 14,
          "name": "ROLE_AUDITOR"
        }
      ]
    }
### 查找某个组下的所有角色列表 [GET] /user/roles/groups/{groupId}
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + groupId 群组id

    
    {
      "data": [
        {
          "id": 25,
          "siteId": 14,
          "name": "ROLE_ADMIN"
        }
      ]
    }