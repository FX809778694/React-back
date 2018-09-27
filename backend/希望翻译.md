+ 2017年9月9日
    + API初始化

## 希望精翻

+ Data
    + userId (long) - 用户id
    + extendId (long) - 扩展id
    + why (String) - 对我有什么帮助
    + votesOptionIds (String) - 要求翻译的部分
    + topicId (long) - 主题id
    + state (int) - 状态，0：待翻 1：已翻 2：驳回
    + feedBack (String) - 管理员反馈
    + who (long) - 谁翻译的
    + userCount (int) - 多少人希望精翻

### 希望精翻扩展列表 [GET] /article/hopeTranslateExtends?filter[topicId]=1&filter[state]=0

+ Description
    + [MUST] Authenticated
    + [MUST] administrator
    
+ Parameters
    + topicId
    + state
+ Response 200 (application/json)
        
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
            "self": "/article/hopeTranslateExtends?filter[topicId]=1&filter[state]=0&page[number]=1&page[size]=10",
            "first": "/article/hopeTranslateExtends?filter[topicId]=1&filter[state]=0&page[number]=1&page[size]=10",
            "last": "/article/hopeTranslateExtends?filter[topicId]=1&filter[state]=0&page[number]=1&page[size]=10"
          },
          "data": [
            {
              "id": 11,
              "topicId": 1,
              "state": 0,
              "userCount": 5,
              "title": "Virus TI2 Desktop"
            }
          ]
        

### 希望精翻扩展详情 [GET] /article/hopeTranslateExtends/{id}

+ Description
    + [MUST] Authenticated
    + [MUST] administrator
    + 包含用户列表
    

    "data": {
            "id": 9,
            "topicId": 1,
            "state": 1,
            "userCount": 2,
            "title": "Virus TI2 Desktop",
            "hopes": [
              {
                "id": 4,
                "enabled": 1,
                "created": "2017-09-07 12:27:53",
                "modified": "2017-09-07 12:27:53",
                "userId": 1033,
                "extendId": 9,
                "why": "dui'wo对我 hen'you很有 bang帮 zhu住 "
              },
              {
                "id": 5,
                "enabled": 1,
                "created": "2017-09-07 14:13:59",
                "modified": "2017-09-07 14:13:59",
                "userId": 1031,
                "extendId": 9,
                "why": "dui'wo对我 hen'you很有 bang帮 zhu住 "
              }
            ]
          }
        


### 驳回希望精翻 [PATCH] /article/hopeTranslateExtends/{id}

+ Description
    + [MUST] Authenticated
    + [MUST] administrator

+ Parameters
    + feedBack
+ Response 200 (application/json)
    
        "data":{
            "feedBack":"我英文2级翻译不了"
        }
    