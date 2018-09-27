+ 2017年9月21日
    + API初始化

## 群组管理
+ Data
    + id (long) 
    + siteId (long) - 群组id
    + parentId (long) - 父群组id
    + groupName (name) - 群组名称
    + description (String) - 描述
    + enabled (int) - 是否启用 0：否，1：是

### 群组列表[GET] /user/groups?filter[siteId]=14
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN
+ Parameters
    + enabled
    + name
    + siteId
    

        {
          "meta": {
            "totalPages": 1,
            "totalElements": 4,
            "size": 10,
            "number": 1,
            "numberOfElements": 4,
            "first": true,
            "last": true,
            "sort": null
          },
          "links": {
            "self": "/user/groups?filter[siteId]=14&page[number]=1&page[size]=10",
            "first": "/user/groups?filter[siteId]=14&page[number]=1&page[size]=10",
            "last": "/user/groups?filter[siteId]=14&page[number]=1&page[size]=10"
          },
          "data": [
            {
              "id": 31,
              "enabled": 1,
              "created": "2017-01-17 14:07:37",
              "modified": "2017-01-17 14:15:17",
              "siteId": 14,
              "parentId": 0,
              "groupName": "翻译审核群组"
            },
            {
              "id": 32,
              "enabled": 1,
              "created": "2017-01-17 14:15:11",
              "modified": "2017-01-17 14:15:11",
              "siteId": 14,
              "parentId": 0,
              "groupName": "超级管理员群组",
              "description": "超级管理员群组"
            },
            {
              "id": 33,
              "enabled": 1,
              "created": "2017-01-17 14:17:18",
              "modified": "2017-01-17 14:17:18",
              "siteId": 14,
              "parentId": 0,
              "groupName": "默认群组",
              "description": "缺省群组, 注册用户默认的群组, 相关配置moon.security.cas.realm.defaultRoles"
            },
            {
              "id": 34,
              "enabled": 0,
              "created": "2017-09-19 17:20:24",
              "modified": "2017-09-19 17:25:12",
              "siteId": 14,
              "parentId": 0,
              "groupName": "我的1111天那",
              "description": "我只是个测试"
            }
          ]
        }
### 增加新群组 [POST] /user/groups
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + groupName 必填
    + siteId 必填
    + description
    + enabled 默认1

+ 新增Request (application/json)

    
        {
            "data":{
                "siteId":14,
                "groupName":"我的天那",
                "description":"我只是个测试"
            }
        }
+ Response 201 (application/json)

    + Headers
    
            Location: /user/groups/53
    + Body
    
            {
                "data": {
                    "id": 53,
                    "type": "/user/groups"
                }
            }
### 修改群组 [PATCH] /user/groups/{id}
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN
    
+ Parameters
    + groupName
    + siteId
    + description
    + enabled
+ 修改Request (application/json)

    
    {
        "data":{
            "groupName":"测试",
            "enabled":0
        }
    }

### 查找某个站点下的某个用户所在的用户群组 [GET] /user/groups/sites/{siteId}/users/{userId}
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + siteId (long) - 站点id
    + userId (long) - 用户id

    
    {
      "data": [
        {
          "id": 33,
          "groupName": "默认群组"
        }
      ]
    }
### 保存某个组下的角色 [POST] /user/groups/{groupId}/roles
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN
+ Parameters
    + groupId
    + roleIds (long[]) 角色ids
+ 新增Request (application/json)
    

    {
        "data":{
            "roleIds":[24]
        }
    }
+ Response 200 (application/json)



