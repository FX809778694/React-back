FORMAT: 1A
HOST: http://192.168.1.138/

# 夺宝后台相关API

+ 2017年9月9日
    + 增加夺宝公告API
    + 增加留言板API
    + 增加反馈信息API
    + 增加获取举报选项的API


## (POST|DELETE|PATCH) 修改夺宝公告 [/reward/notices]
+ ## (GET) 获取夺宝公告 [/reward/notices]

## (POST|DELETE|PATCH) 修改夺宝类别 [/reward/categories]
+ ## (GET) 获取夺宝类别 [/reward/categories]

## (POST|DELETE|PATCH) 修改夺宝类别 [/reward/goods]
+ ## (GET) 获取夺宝类别 [/reward/goods]


        

### 查询留言板集合 [GET]

+ Response 200 (application/json)

        {
            "meta": {
                "totalPages": 1,
                "totalElements": 4,
                "size": 10,
                "number": 1,
                "numberOfElements": 4,
                "first": true,
                "last": true,
                "sort": [
                    {
                        "direction": "DESC",
                        "property": "created",
                        "ignoreCase": false,
                        "nullHandling": "NATIVE",
                        "ascending": false,
                        "descending": true
                    }
                ]
            },
            "links": {
                "self": "/article/feedback?sort=-created&page[number]=1&page[size]=10",
                "first": "/article/feedback?sort=-created&page[number]=1&page[size]=10",
                "last": "/article/feedback?sort=-created&page[number]=1&page[size]=10"
            },
            "data": [
                {
                    "id": 4,
                    "enabled": 1,
                    "creator": 11,
                    "modifier": 11,
                    "created": "2017-09-02 15:07:14",
                    "modified": "2017-09-02 15:07:14",
                    "username": "quzile",
                    "mobile": "17611019209",
                    "email": "1929593@qq.com",
                    "suggestion": "建议22333233"
                },
                {
                    "id": 3,
                    "enabled": 1,
                    "creator": 11,
                    "modifier": 11,
                    "created": "2017-09-02 15:06:51",
                    "modified": "2017-09-02 15:06:51",
                    "username": "quzile",
                    "mobile": "17611019209",
                    "email": "1929593@qq.com",
                    "suggestion": "建议22333233"
                }
            




## (POST|DELETE|PATCH)用户与主题关联关系(收藏) [/users/{userId}/relationships/topics]

+ Description
    + [MUST] Authenticated
    + [MUST] 用户只能操作自己的资源
    + [OPTIONAL] 不写meta的话:/users/{userId}/relationships/topics/favorite
    
+ Meta
    + relationships (string) - favorite:表明这是用户与主题资源多对多关系中的_收藏关联_
    
+ Data
    + id (long) - 主题资源唯一标识符

+ Parameters
    + userId (long) - 用户ID

### 增加关联 [POST]

+ Request (application/json)

        {
            "meta": {
                "relationships": "favorite"
            },
            "data": [
                {
                    "id": "88"
                },
                {
                    "id": "90"
                }
            ]
        }

+ Response 200 (application/json)

+ Response 202 (application/json)

+ Response 204 (application/json)

+ Response 400 (application/json)

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

### 删除关联 [DELETE]

+ Request (application/json)

        {
            "meta": {
                "relationships": "favorite"
            },
            "data": [
                {
                    "id": "2"
                },
                {
                    "id": "3"
                }
            ]
        }

+ Response 200 (application/json)

+ Response 202 (application/json)

+ Response 204 (application/json)

+ Response 400 (application/json)

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
        

        
## (POST)用户与主题关联关系(举报) [/users/{userId}/relationships/topics]

+ Description
    + [MUST] Authenticated
    + [MUST] 用户只能操作自己的资源
    + [OPTIONAL] 不写meta的话:/users/{userId}/relationships/topics/report
    + 非unique关联
    
+ Meta
    + relationships (string) - report:表明这是用户与主题资源多对多关系中的_举报关联_
    
+ Data
    + id (long) - 主题资源唯一标识符
    + attributes (object, nullable) - 资源属性
    + attributes.remark (string, nullable) - 举报备注信息
    + attributes.options (array, nullable) - 选项的ID数组

+ Parameters
    + userId (long) - 用户ID

### 增加关联 [POST]

+ Request (application/json)

        {
            "meta": {
                "relationships": "report"
            },
            "data": [
                {
                    "id": "92",
                    "attributes": {
                        "remark": "我要举报你",
                        "options": [
                            1,
                            2,
                            4
                        ]
                    }
                }
            ]
        }

+ Response 200 (application/json)

+ Response 202 (application/json)

+ Response 204 (application/json)

+ Response 400 (application/json)

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
        
## (GET) 收藏主题列表 [/topics/favorites]

+ Description
    + [MUST] Authenticated
    + [MUST] 用户只能操作自己的资源
    + 结构同搜索API

### 查询收藏主题列表 [GET]

+ Response 200 (application/json)

        {
        }

        
## (GET) 投票信息 [/article/votes/{id}]

+ Description
    + 用户举报主题时的复选/单选等详情
    + 获取举报相关的投票信息, 如下两种方式, ID=1的固定为举报投票的相关信息, 或者使用report
        + /article/votes/1
        + /article/votes/report
    
+ Data
    + id (long) - vote ID
    + voteType (enum) - [CHECKBOX|RADIO]
    + voteText (string) - 投票描述
    + voteStart (date) - _保留字段_
    + voteLength (int) - _保留字段_
    + options (array) - 选项数组
    + options.id - 选项 ID
    + options.voteOptionText - 选项描述
    + options.voteOptionCount - 选项投票计数

### 查询投票信息 [GET]

+ Response 400 (application/json)

        {
            "data": {
                "id": 1,
                "voteType": "CHECKBOX",
                "voteText": "举报原因",
                "voteStart": "2017-09-05 11:37:48",
                "voteLength": 0,
                "options": [
                    {
                        "id": 1,
                        "voteOptionText": "反动言论",
                        "voteOptionCount": 6
                    },
                    {
                        "id": 2,
                        "voteOptionText": "文题不符",
                        "voteOptionCount": 6
                    },
                    {
                        "id": 3,
                        "voteOptionText": "错别字",
                        "voteOptionCount": 1
                    },
                    {
                        "id": 4,
                        "voteOptionText": "其他",
                        "voteOptionCount": 5
                    }
                ]
            }
        }
        
## (POST|GET) 留言板 [/article/messages]

+ Description
    + sort=-created 按创建时间降序排序查询列表
    
+ Data
    + message (string) - 用户留言

### 新增留言 [POST]

+ Request (application/json)

        {
            "data": {
                "message": "米饭网挺好"
            }
        }

+ Response 201 (application/json)

    + Headers

            Location: /article/messages/1

    + Body

            {
                "data": {
                    "id": 1,
                    "type": "messages"
                }
            }
            
+ Response 204 (application/json)
        
+ Response 400 (application/json)

        {
            "errors": [
                {
                    "status": "400",
                    "code": "Pattern.Messages.message",
                    "title": "Bad Request",
                    "detail": "留言字符长度应在2~140之间",
                    "source": {
                        "pointer": "Messages -> message"
                    }
                }
            ]
        }
        
### 查询留言板集合 [GET]

+ Response 200 (application/json)

        {
            "meta": {
                "totalPages": 1,
                "totalElements": 3,
                "size": 10,
                "number": 1,
                "numberOfElements": 3,
                "first": true,
                "last": true,
                "sort": [
                    {
                        "direction": "DESC",
                        "property": "created",
                        "ignoreCase": false,
                        "nullHandling": "NATIVE",
                        "ascending": false,
                        "descending": true
                    }
                ]
            },
            "links": {
                "self": "/article/messages?sort=-created&page[number]=1&page[size]=10",
                "first": "/article/messages?sort=-created&page[number]=1&page[size]=10",
                "last": "/article/messages?sort=-created&page[number]=1&page[size]=10"
            },
            "data": [
                {
                    "id": 3,
                    "enabled": 1,
                    "creator": 0,
                    "modifier": 0,
                    "created": "2017-09-02 15:09:29",
                    "modified": "2017-09-02 15:09:29",
                    "message": "messagemessagemessagemessage"
                },
                {
                    "id": 2,
                    "enabled": 1,
                    "creator": 0,
                    "modifier": 0,
                    "created": "2017-09-02 15:09:27",
                    "modified": "2017-09-02 15:09:27",
                    "message": "messagemessagemessagemessage"
                },
                {
                    "id": 1,
                    "enabled": 1,
                    "creator": 0,
                    "modifier": 0,
                    "created": "2017-09-02 15:09:24",
                    "modified": "2017-09-02 15:09:24",
                    "message": "messagemessagemessagemessage"
                }
            ]
        }   
        
]
        }
        
