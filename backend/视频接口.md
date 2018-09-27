+ 2017年9月1日
    + API初始化

## 视频模块[/videos]

+ Data
    + title (String) - 产品标题
    + forumId (long) - 模块标识，1：产品2：品牌3：新闻4：评测5：视频
    + description (String) - 描述
    + id (long) - 视频标识
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
    + videos (Object[]) - 视频
    + creator (long) - 创建人
    + modifier (long) - 修改人

### (GET)视频集合 [/videos]

+ Parameters
    + filter[id] - 筛选条件，唯一标识
    + filter[title] - 筛选条件，视频标题

+ Description
    + 列表需要展示的数据：id，title（标题），parentId（父标识），postDate（发表日期），author（作者），brandInfo.name（品牌），creator（创建人），created（创建时间）,modified（修改时间）

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
                "self": "videos?page[number]=1&page[size]=10",
                "first": "videos?page[number]=1&page[size]=10",
                "last": "videos?page[number]=1&page[size]=10"
              },
              "data": [
                {
                  "id": 458421,
                  "enabled": 1,
                  "creator": 1031,
                  "modifier": 1031,
                  "created": "2017-09-01 15:09:35",
                  "modified": "2017-09-01 15:09:35",
                  "forumId": 5,
                  "title": "刘凯和隔壁少妇.avi",
                  "titleHash": -8257966141257395219,
                  "topicType": 0,
                  "reviews": 0,
                  "replies": 0,
                  "thumbsUp": 0,
                  "thumbsDown": 0,
                  "locked": 0,
                  "moderated": 0,
                  "imageSingle": false,
                  "imageRotation": false,
                  "liked": 0,
                  "post": {
                    "id": 851632,
                    "enabled": 1,
                    "creator": 1031,
                    "modifier": 1031,
                    "created": "2017-09-01 15:09:35",
                    "modified": "2017-09-01 15:09:35",
                    "parentId": 0,
                    "topicId": 458421,
                    "priority": 0,
                    "language": 1,
                    "categories": [],
                    "tags": [],
                    "features": [],
                    "title": "刘凯和隔壁少妇.avi",
                    "postsText": {
                      "id": 851632,
                      "category": "",
                      "title": "刘凯和隔壁少妇.avi"
                    },
                    "postType": 4,
                    "postTypeValue": "原创"
                  },
                  "topicTypeValue": "正常",
                  "thumbs": 0,
                  "forumName": "视频"
                }
              ]
            }

### (GET)父视频详情 [/videos/parents/{id}
+ Description
    视频详情的替代接口，所返回的数据与视频详情的数据吻合。
    

### (GET)视频详情 [/videos/{id}

+ Description
    详情需要展示的字段：id，forumId，title，description，language，brand，postDate，author，brand，categories，tags，videos，from.source，creator，modifier，created，modified

+ Response 200 (application/json)

        {
          "data": {
            "id": 458421,
            "creator": 1031,
            "modifier": 1031,
            "created": "2017-09-01 15:09:35",
            "modified": "2017-09-01 15:09:35",
            "forumId": 5,
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
              }
            ],
            "audios": [],
            "videos": [],
            "imageSingle": true,
            "imageRotation": false,
            "liked": 0,
            "post": {
              "id": 851632,
              "enabled": 1,
              "creator": 1031,
              "modifier": 1031,
              "created": "2017-09-01 15:09:35",
              "modified": "2017-09-01 15:09:35",
              "parentId": 0,
              "topicId": 458421,
              "priority": 0,
              "language": 1,
              "categories": [],
              "tags": [],
              "features": [],
              "title": "刘凯和隔壁少妇.avi",
              "postsText": {
                "id": 851632,
                "category": "",
                "title": "刘凯和隔壁少妇.avi"
              },
              "postType": 4,
              "postTypeValue": "原创"
            },
            "topicTypeValue": "正常",
            "thumbs": 0,
            "forumName": "视频"
          }
        }

### 增加/修改 视频 [POST]

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
    + attachments - 只能有一个
    + id 修改时必填，添加时必不填
    + post.creator - 修改时必填，添加时必不填
    + seedId - 如果需要设置来源频道，则需要填写相应的参数

+ 新增Request (application/json)

        {
            "data":{
                "post":{
                    "title":"刘凯和隔壁少妇.avi",
                    "parentId":0,
                    "language":1
                },
                "document":{
                    "postDate":"2017-9-1",
                    "author":"张永伟上传的 ",
                    "brands":["刘凯","情色"]
                },
                "attachments":[
                        {
                            "id":1945237
                        }
                    ]
            }
        }

+ 修改Request (application/json)

        {
            "data":{
                "id":458421,
                "post":{
                    "title":"刘凯和隔壁少妇.avi",
                    "parentId":0,
                    "language":1,
                    "creator":1031
                },
                "document":{
                    "postDate":"2017-9-1",
                    "author":"张永伟上传的 ",
                    "brand":"刘凯.avi"
                },
                "attachments":[
                        {
                            "id":1945237
                        }
                    ]
            }
        }

+ Response 201 (application/json)

    + Headers

            Location: /videos/2
    + Body

            {
                "data": {
                    "id": 2,
                    "type": "videos"
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
        
### 删除视频 [DELETE] /videos/{id}
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