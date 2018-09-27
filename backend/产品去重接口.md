+ 2017年8月24日
    + API初始化

## 产品去重[/topicsClusterings]

+ Data
    + id (long) - 唯一标识
    + topicId (long) - 主题标识
    + targetId (long) - 目标主题标识
    + type (int) - 类型，0：机器学习，1：人工干预
    + score (double) - 评分
    + enabled (int) - 是否可用
    + creator (long) - 创建人
    + modifier (long) - 修改人
    + created (date) - 创建时间
    + modified (date) - 修改时间

### (GET)重复主题集合 [/topicsClusterings?page[number]=1&page[size]=5&filter[topicId]=32527&filter[targetId]=1

### 查询重复集合 [GET]

+ Parameters
    + filter[topicId] (long) - 主题标识，必填
    + filter[targetId] (String) - 目标标识

+ Description
    + 根据tpicId，获取它的重复列表
    + 所有字段都要展示
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
            "sort": [
              {
                "direction": "DESC",
                "property": "modified",
                "ignoreCase": false,
                "nullHandling": "NATIVE",
                "ascending": false,
                "descending": true
              }
            ]
          },
          "links": {
            "self": "/topicsClusterings?filter[topicId]=32527&page[number]=1&page[size]=10",
            "first": "/topicsClusterings?filter[topicId]=32527&page[number]=1&page[size]=10",
            "last": "/topicsClusterings?filter[topicId]=32527&page[number]=1&page[size]=10"
          },
          "data": [
            {
              "id": 2,
              "enabled": 1,
              "creator": 0,
              "modifier": 0,
              "created": "2017-08-19 15:11:24",
              "modified": "2017-08-19 15:11:24",
              "topicId": 32527,
              "targetId": 1,
              "score": 1,
              "type": 0
            }
          ]
        }

### 增加去重 [POST]

+ Description
    + [MUST] Authenticated
    + [MUST] administrator
    
+ Parameters
    + topicId (long) - 主题标识，必填
    + targetId (long) - 目标主题标识，必填

+ Response 200 (application/json)

        {
            "data":1
        }
    当返回值大于0时，添加成功
    
### 删除去重 [DELETE] /topicsClusterings/{id}

+ Description
    + [MUST] Authenticated
    + [MUST] administrator
    
+ Parameters
    + id (long) 标识

+ Response 200 (application/json)

        {
            "data":1
        }
        当返回值大于0时，删除成功