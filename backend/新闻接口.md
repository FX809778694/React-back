+ 2017年9月1日
    + API初始化

## 新闻模块[/news]

+ Data
    + title (String) - 产品标题
    + forumId (long) - 模块标识，1：产品2：品牌3：新闻4：评测5：视频
    + description (String) - 描述
    + id (long) - 新闻标识
    + language (int) - 语言，0：未知，1：中文，2：英文
    + parentId (long) - 父标识，如无父，则为0
    + content (String) - 内容，富文本编辑框
    + categories (String[]) - 分类
    + tags (long[]) - 标签
    + brand (String) - 品牌名称
    + brands (String[]) - 品牌名称列表
    + postDate (Date) - 发表日期，格式：yyyy-MM-dd
    + author (String) - 作者
    + attachments - (Object[]) 附件
    + images (Object[]) - 图片
    + creator (long) - 创建人
    + modifier (long) - 修改人

### (GET)新闻集合 [/news?page[number]=1&page[size]=5&filter[title]=新闻直播

+ Parameters
    + filter[id] - 筛选条件，唯一标识
    + filter[title] - 筛选条件，新闻标题

+ Description
    + 列表需要展示的数据：id，title（标题），parentId（父标识），postDate（发表日期），author（作者），brandInfo.name（品牌），creator（创建人），created（创建时间）,modified（修改时间）

+ Response 200 (application/json)
    
          {
              "meta": {
                "totalPages": 1,
                "totalElements": 1,
                "size": 5,
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
                "self": "news?filter[title]=新闻直播&page[number]=1&page[size]=5",
                "first": "news?filter[title]=新闻直播&page[number]=1&page[size]=5",
                "last": "news?filter[title]=新闻直播&page[number]=1&page[size]=5"
              },
              "data": [
                {
                  "id": 458420,
                  "enabled": 1,
                  "creator": 1031,
                  "modifier": 1031,
                  "created": "2017-09-01 10:41:06",
                  "modified": "2017-09-01 11:03:57",
                  "forumId": 3,
                  "title": "新闻直播间22",
                  "titleHash": -5460344442803460112,
                  "topicType": 0,
                  "reviews": 0,
                  "replies": 0,
                  "thumbsUp": 0,
                  "thumbsDown": 0,
                  "locked": 0,
                  "moderated": 0,
                  "document": {
                    "id": 57672,
                    "topicId": 458420,
                    "postDate": "2017-09-01",
                    "author": "张永伟22",
                    "brand": "刘凯22"
                  },
                  "imageSingle": false,
                  "imageRotation": false,
                  "liked": 0,
                  "post": {
                    "id": 851631,
                    "enabled": 1,
                    "creator": 1031,
                    "modifier": 1031,
                    "created": "2017-09-01 10:41:06",
                    "modified": "2017-09-01 11:03:57",
                    "parentId": 0,
                    "topicId": 458420,
                    "priority": 0,
                    "language": 1,
                    "categories": [],
                    "tags": [],
                    "features": [],
                    "title": "新闻直播间22",
                    "description": "直播简介22 ",
                    "content": "新闻内容22 ",
                    "postsText": {
                      "id": 851631,
                      "category": "",
                      "title": "新闻直播间22",
                      "description": "直播简介22 ",
                      "content": "新闻内容22 "
                    },
                    "postType": 4,
                    "postTypeValue": "原创"
                  },
                  "thumbs": 0,
                  "forumName": "新闻",
                  "topicTypeValue": "正常"
                }
              ]
            }

### (GET)父新闻详情 [/news/parents/{id}
+ Description
    新闻详情的替代接口，所返回的数据与新闻详情的数据吻合。

### (GET)新闻详情 [/news/{id}

+ Description
    详情需要展示的字段：id，forumId，title，description，content，language，brand，postDate，author,brand，categories，tags，images，from.source，creator，modifier，created，modified

+ Response 200 (application/json)

        {
          "data": {
            "id": 458420,
            "creator": 1031,
            "modifier": 1031,
            "created": "2017-09-01 10:41:06",
            "modified": "2017-09-01 11:03:57",
            "forumId": 3,
            "topicType": 0,
            "reviews": 0,
            "replies": 0,
            "thumbsUp": 0,
            "thumbsDown": 0,
            "locked": 0,
            "moderated": 0,
            "similarities": [],
            "image": "http://static.budee.com/yyren/image/174/29/1945237.jpg",
            "rotations": [],
            "images": [
              {
                "id": 1945237,
                "mime": "image/jpeg",
                "filename": "http://static.budee.com/yyren/image/174/29/1945237.jpg"
              },
              {
                "id": 1945238,
                "mime": "image/jpeg",
                "filename": "http://static.budee.com/yyren/image/174/29/1945238.jpg"
              }
            ],
            "audios": [],
            "videos": [],
            "document": {
              "postDate": "2017-09-01",
              "author": "张永伟22",
              "brands": [
                "刘凯22"
              ]
            },
            "imageSingle": false,
            "imageRotation": false,
            "liked": 0,
            "post": {
              "id": 851631,
              "enabled": 1,
              "creator": 1031,
              "modifier": 1031,
              "created": "2017-09-01 10:41:06",
              "modified": "2017-09-01 11:03:57",
              "parentId": 0,
              "topicId": 458420,
              "priority": 0,
              "language": 1,
              "categories": [],
              "tags": [],
              "features": [],
              "title": "新闻直播间22",
              "description": "直播简介22 ",
              "content": "新闻内容22 ",
              "postsText": {
                "id": 851631,
                "category": "",
                "title": "新闻直播间22",
                "description": "直播简介22 ",
                "content": "新闻内容22 "
              },
              "postType": 4,
              "postTypeValue": "原创"
            },
            "thumbs": 0,
            "forumName": "新闻",
            "topicTypeValue": "正常"
          }
        }

### 增加/修改 新闻 [POST]

+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

+ Parameters
    + post.title - 必填
    + post.description
    + post.language - 必填
    + post.parentId - 必填
    + post.features
    + post.content - 必填
    + posts.tags
    + posts.categories
    + document.postDate
    + document.author
    + document.brands
    + attachments
    + id 修改时必填，添加时必不填
    + post.creator - 修改时必填，添加时必不填
    + seedId - 如果需要设置来源频道，则需要填写相应的参数

+ 新增Request (application/json)

        {
            "data":{
                "post":{
                    "title":"新闻直播间22",
                    "description":"直播简介22 ",
                    "content":"新闻内容22 ",
                    "parentId":0,
                    "language":1
                },
                "document":{
                    "postDate":"2017-9-1",
                    "author":"张永伟22",
                    "brands":["刘凯22","凯凯"]
                },"attachments":[
                        {
                            "id":1945237
                        },
                        {
                            "id":1945238
                        }
                    ]
            }
        }

+ 修改Request (application/json)

        {
            "data":{
                "id": 458420,
                "post":{
                    "title":"新闻直播间22",
                    "description":"直播简介22 ",
                    "content":"新闻内容22 ",
                    "parentId":0,
                    "language":1,
                    "creator":1031
                },
                "document":{
                    "postDate":"2017-9-1",
                    "author":"张永伟22",
                    "brand":"刘凯22"
                },"attachments":[
                        {
                            "id":1945237
                        },
                        {
                            "id":1945238
                        }
                    ]
            }
        }

+ Response 201 (application/json)

    + Headers

            Location: /news/2
    + Body

            {
                "data": {
                    "id": 2,
                    "type": "news"
                }
            }

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
        
### 删除新闻 [DELETE] /news/{id}
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

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