+ 2017年8月23日
    + API初始化

## 产品模块[/products]

+ Data
    + title (String) - 产品标题
    + forumId (long) - 模块标识，1：产品2：品牌3：新闻4：评测5：视频
    + description (String) - 描述
    + id (long) - 产品标识
    + language (int) - 语言，0：未知，1：中文，2：英文
    + features (Map[]) - 产品属性
    + parentId (long) - 父标识，如无父，则为0
    + content (String) - 内容，富文本编辑框
    + categories (String[]) - 分类
    + tags (long[]) - 标签
    + price (double) - 价格
    + priceUnit (enum) - 价格单位，'CNY','EUR','GBP','USD'
    + brand (String) - 品牌名称
    + attachments - (Object[]) 附件
    + images (Object[]) - 图片
    + creator (long) - 创建人
    + modifier (long) - 修改人
    + seedId (long) - 来源id

### (GET)产品集合 [/product?page[number]=1&page[size]=5&filter[title]=刘凯

+ Parameters
    + filter[id] - 筛选条件，唯一标识
    + filter[title] - 筛选条件，产品名称

+ Description
    + 列表需要展示的数据：id，title（产品名），parentId（父标识），price（价格），brandInfo.name（品牌），creator（创建人），created（创建时间）,modified（修改时间）

+ Response 200 (application/json)
    
          "meta": {
            "totalPages": 1,
            "totalElements": 1,
            "size": 2,
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
            "self": "products?filter[title]=刘凯&page[number]=1&page[size]=2",
            "first": "products?filter[title]=刘凯&page[number]=1&page[size]=2",
            "last": "products?filter[title]=刘凯&page[number]=1&page[size]=2"
          },
          "data": [
            {
              "id": 457999,
              "enabled": 1,
              "creator": 1031,
              "modifier": 1031,
              "created": "2017-08-31 14:49:02",
              "modified": "2017-08-31 15:22:42",
              "forumId": 1,
              "title": "刘凯222产品",
              "titleHash": 228670929695151846,
              "topicType": 0,
              "reviews": 0,
              "replies": 0,
              "thumbsUp": 0,
              "thumbsDown": 0,
              "locked": 0,
              "moderated": 0,
              "product": {
                "id": 398636,
                "topicId": 457999,
                "price": 521.11,
                "priceUnit": "CNY",
                "brand": "刘大哥222"
              },
              "imageSingle": false,
              "imageRotation": false,
              "liked": 0,
              "post": {
                "id": 851210,
                "enabled": 1,
                "creator": 1031,
                "modifier": 1031,
                "created": "2017-08-31 14:49:02",
                "modified": "2017-08-31 15:03:18",
                "parentId": 0,
                "topicId": 457999,
                "priority": 0,
                "language": 1,
                "categories": [],
                "tags": [],
                "features": [],
                "title": "刘凯222产品",
                "description": "222刘凯产品 ",
                "content": "刘凯222没有内容 ",
                "postsText": {
                  "id": 851210,
                  "category": "",
                  "title": "刘凯222产品",
                  "description": "222刘凯产品 ",
                  "content": "刘凯222没有内容 "
                },
                "postType": 4,
                "postTypeValue": "原创"
              },
              "topicTypeValue": "正常",
              "thumbs": 0,
              "forumName": "产品"
            }
          ]

### (GET)父产品详情 [/products/parents/{id}
+ Description
    产品详情的替代接口，所返回的数据与产品详情的数据吻合。

### (GET)产品详情 [/products/{id}

+ Description
    详情需要展示的字段：id，forumId，title，description，content，features，language，price，priceUnit，brand，categories，tags，images，from.source，creator，modifier，created，modified

+ Response 200 (application/json)

    
          "data": {
            "id": 457999,
            "creator": 1031,
            "modifier": 1031,
            "created": "2017-08-31 14:49:02",
            "modified": "2017-08-31 15:22:42",
            "forumId": 1,
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
            "product": {
              "id": 398636,
              "topicId": 457999,
              "price": 521.11,
              "priceUnit": "CNY",
              "brand": "刘大哥222",
              "histories": [
                {
                  "price": 521.11,
                  "effectiveDate": "2017-08-31"
                },
                {
                  "price": 521.11,
                  "effectiveDate": "2017-08-31"
                },
                {
                  "price": 521,
                  "effectiveDate": "2017-08-31"
                },
                {
                  "price": 521.22,
                  "effectiveDate": "2017-08-31"
                }
              ],
              "brandInfo": {
                "id": null,
                "name": "刘大哥222",
                "logo": null,
                "rating": 0,
                "reviews": 0,
                "top": false
              }
            },
            "imageSingle": false,
            "imageRotation": false,
            "liked": 0,
            "post": {
              "id": 851210,
              "enabled": 1,
              "creator": 1031,
              "modifier": 1031,
              "created": "2017-08-31 14:49:02",
              "modified": "2017-08-31 15:03:18",
              "parentId": 0,
              "topicId": 457999,
              "priority": 0,
              "language": 1,
              "categories": [],
              "tags": [],
              "features": [],
              "title": "刘凯222产品",
              "description": "222刘凯产品 ",
              "content": "刘凯222没有内容 ",
              "postsText": {
                "id": 851210,
                "category": "",
                "title": "刘凯222产品",
                "description": "222刘凯产品 ",
                "content": "刘凯222没有内容 "
              },
              "postType": 4,
              "postTypeValue": "原创"
            },
            "topicTypeValue": "正常",
            "thumbs": 0,
            "forumName": "产品"
          }
        

### 增加/修改 产品 [POST]

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
    + posts.categories
    + posts.tags
    + product.price
    + product.priceUnit
    + product.brand
    + attachments
    + id 修改时必填，添加时必不填
    + post.creator - 修改时必填，添加时必不填
    + seedId - 如果需要设置来源频道，则需要填写相应的参数

+ 新增Request (application/json)

        "data":{
            "post":{
                "title":"刘凯222产品",
                "description":"222刘凯产品 ",
                "content":"刘凯222没有内容 ",
                "parentId":0,
                "language":1
            },
            "product":{
                "price":521.11,
                "priceUnit":"CNY",
                "brand":"刘大哥222"
            },
            "attachments":[
                    {
                        "id":1945237
                    },
                    {
                        "id":1945238
                    }
                ]
        }

+ 修改Request (application/json)

        "data":{
            "id":457999,
            "post":{
                "title":"刘凯222产品",
                "description":"222刘凯产品 ",
                "content":"刘凯222没有内容 ",
                "parentId":0,
                "language":1,
                "creator":1031
            },
            "product":{
                "price":521.11,
                "priceUnit":"CNY",
                "brand":"刘大哥222"
            },
            "attachments":[
                    {
                        "id":1945237
                    },
                    {
                        "id":1945238
                    }
                ]
        }

+ Response 201 (application/json)

    + Headers

            Location: /products/2
    + Body

            {
                "data": {
                    "id": 2,
                    "type": "products"
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
        
### 删除产品 [DELETE] /products/{id}
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