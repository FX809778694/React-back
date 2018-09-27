
+ 2017年8月23日
    + API初始化

## 品牌模块[/brands]

+ Data
    + title (String) - 品牌名称
    + forumId (long) - 模块标识，1：产品2：品牌3：新闻4：评测5：视频
    + description (String) - 描述
    + id 品牌标识
    + language (int) - 语言，0：未知，1：中文，2：英文
    + features (Map[]) - 产品属性
    + attachments - (Object[]) 附件
    + images (Object[]) - 图片
    + creator (long) - 创建人
    + modifier (long) - 修改人

### (GET)品牌集合 [/brands?page[number]=1&page[size]=5&filter[title]=Wagner

### 查询品牌集合 [GET]

+ Parameters
    + filter[id] (long) - 筛选条件，唯一标识
    + filter[title] (String) - 筛选条件，品牌名称

+ Description
    + 列表需要展示的数据：id，title（品牌名），post.description（品牌描述），creator（创建人），created（创建时间）,modified（修改时间）
+ Response 200 (application/json)
        {

          "meta": {
            "totalPages": 1038,
            "totalElements": 2076,
            "size": 2,
            "number": 1,
            "numberOfElements": 2,
            "first": true,
            "last": false,
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
            "self": "brands?page[number]=1&page[size]=2",
            "first": "brands?page[number]=1&page[size]=2",
            "next": "brands?page[number]=2&page[size]=2",
            "last": "brands?page[number]=1038&page[size]=2"
          },
          "data": [
            {
              "id": 450244,
              "enabled": 1,
              "creator": 1031,
              "modifier": 1031,
              "created": "2017-08-22 11:18:59",
              "modified": "2017-08-24 11:56:20",
              "forumId": 2,
              "title": "张永伟555",
              "titleHash": 5030532902752997377,
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
                "id": 843454,
                "enabled": 1,
                "creator": 1031,
                "modifier": 1031,
                "created": "2017-08-22 11:19:00",
                "modified": "2017-08-24 11:56:20",
                "parentId": 0,
                "topicId": 450244,
                "priority": 0,
                "categories": [],
                "tags": [],
                "features": [],
                "title": "张永伟555",
                "description": "张永伟555品牌",
                "postsText": {
                  "id": 843454,
                  "category": "",
                  "title": "张永伟555",
                  "description": "张永伟555品牌"
                },
                "postType": 4,
                "postTypeValue": "原创"
              },
              "thumbs": 0,
              "forumName": "品牌",
              "topicTypeValue": "正常"
            },
            {
              "id": 398690,
              "enabled": 1,
              "creator": 0,
              "modifier": 0,
              "created": "2017-08-12 10:42:19",
              "modified": "2017-08-13 16:13:45",
              "forumId": 2,
              "title": "G Lab",
              "titleHash": -7390791350227242480,
              "topicType": 0,
              "reviews": 554,
              "replies": 0,
              "thumbsUp": 0,
              "thumbsDown": 0,
              "locked": 0,
              "moderated": 0,
              "from": {
                "id": 398690,
                "topicId": 398690,
                "seedId": 12,
                "origin": "https://www.thomann.de/gb/search_BF_g_lab.html",
                "originHash": -2203958688294603858,
                "rating": 0.94,
                "reviews": 554
              },
              "imageSingle": false,
              "imageRotation": false,
              "liked": 0,
              "post": {
                "id": 791900,
                "enabled": 1,
                "creator": 0,
                "modifier": 0,
                "created": "2017-08-12 10:42:19",
                "modified": "2017-08-13 16:13:44",
                "parentId": 0,
                "topicId": 398690,
                "priority": 0,
                "categories": [],
                "tags": [],
                "features": [
                  {
                    "_name": "Manufacturer Ranking",
                    "_value": "417"
                  },
                  {
                    "_name": "In our range since",
                    "_value": "2007"
                  },
                  {
                    "_name": "Product range",
                    "_value": "25"
                  },
                  {
                    "_name": "On Stock",
                    "_value": "18"
                  },
                  {
                    "_name": "Ø Availability (1 Year)",
                    "_value": "86.55 %"
                  }
                ],
                "title": "G Lab",
                "description": "If you would like to see a list of all products from G Lab, then please click here.",
                "content": "<p>Currently we have 25 G Lab products 18 of them directly available in our Treppendorf warehouse (and of course they can be tested as well in our shop) . G Lab products have been a part of our range for 10 year(s).</p> \n<p>To help you further with information on G Lab products, you will find also product descriptions 791 media, tests and opinions about G Lab products - amongst them the following 220 pictures, 16 sample sounds and 555 customer reviews.</p> \n<p>At the moment you will find G Lab top sellers in the following product categories <a href=\"https://www.thomann.de/gb/g_lab_midi_footswitches.html\" title=\"MIDI Footswitches\">MIDI Footswitches</a> and <a href=\"https://www.thomann.de/gb/g_lab_cables_for_effects.html\" title=\"Cables for Effects\">Cables for Effects</a>.</p> \n<p>A highlight and favourite is the following product <a href=\"https://www.thomann.de/gb/glab_9v_cable_dc_set.htm\">G Lab 9V Cable DC Set</a>, of which we have sold recently more than 1.000.</p> \n<p>The manufacturer grants a 2 warranty on its products, but with our 3 year Thomann warranty we offer you one year more.</p> \n<p>We also offer our 30 Day Money-Back guarantee for G Lab products, a 3-year warranty, and many additional services such as qualified product specialists, an on-site service department and much more.</p> \n<p></p>",
                "postsText": {
                  "id": 791900,
                  "category": "",
                  "title": "G Lab",
                  "feature": "[{\"_name\":\"Manufacturer Ranking\",\"_value\":\"417\"},{\"_name\":\"In our range since\",\"_value\":\"2007\"},{\"_name\":\"Product range\",\"_value\":\"25\"},{\"_name\":\"On Stock\",\"_value\":\"18\"},{\"_name\":\"Ø Availability (1 Year)\",\"_value\":\"86.55 %\"}]",
                  "description": "If you would like to see a list of all products from G Lab, then please click here.",
                  "content": "<p>Currently we have 25 G Lab products 18 of them directly available in our Treppendorf warehouse (and of course they can be tested as well in our shop) . G Lab products have been a part of our range for 10 year(s).</p> \n<p>To help you further with information on G Lab products, you will find also product descriptions 791 media, tests and opinions about G Lab products - amongst them the following 220 pictures, 16 sample sounds and 555 customer reviews.</p> \n<p>At the moment you will find G Lab top sellers in the following product categories <a href=\"https://www.thomann.de/gb/g_lab_midi_footswitches.html\" title=\"MIDI Footswitches\">MIDI Footswitches</a> and <a href=\"https://www.thomann.de/gb/g_lab_cables_for_effects.html\" title=\"Cables for Effects\">Cables for Effects</a>.</p> \n<p>A highlight and favourite is the following product <a href=\"https://www.thomann.de/gb/glab_9v_cable_dc_set.htm\">G Lab 9V Cable DC Set</a>, of which we have sold recently more than 1.000.</p> \n<p>The manufacturer grants a 2 warranty on its products, but with our 3 year Thomann warranty we offer you one year more.</p> \n<p>We also offer our 30 Day Money-Back guarantee for G Lab products, a 3-year warranty, and many additional services such as qualified product specialists, an on-site service department and much more.</p> \n<p></p>"
                },
                "postType": 1,
                "postTypeValue": "爬取"
              },
              "thumbs": 0,
              "forumName": "品牌",
              "topicTypeValue": "正常"
            }
          ]
        }
    
### (GET)品牌详情 [/brands/id/{id}

### 查询品牌详情 [GET]

+ Description
    详情需要展示的字段：id，post.title，post.description，post.features，images，from.source，creator，modifier，created，modified

+ Response 200 (application/json)

          "data": {
            "id": 450244,
            "creator": 1031,
            "modifier": 1031,
            "created": "2017-08-22 11:18:59",
            "modified": "2017-08-29 16:58:16",
            "forumId": 2,
            "topicType": 0,
            "reviews": 0,
            "replies": 0,
            "thumbsUp": 0,
            "thumbsDown": 0,
            "locked": 0,
            "moderated": 0,
            "similarities": [],
            "image": "http://static.budee.com/yyren/image/121/29/1931631.jpg",
            "rotations": [],
            "images": [
              {
                "id": 1931631,
                "mime": "image/jpeg",
                "filename": "http://static.budee.com/yyren/image/121/29/1931631.jpg"
              }
            ],
            "audios": [],
            "videos": [],
            "imageSingle": true,
            "imageRotation": false,
            "liked": 0,
            "post": {
              "id": 843454,
              "enabled": 1,
              "creator": 1031,
              "modifier": 1031,
              "created": "2017-08-22 11:19:00",
              "modified": "2017-08-29 16:58:16",
              "parentId": 0,
              "topicId": 450244,
              "priority": 0,
              "language": 2,
              "categories": [],
              "tags": [],
              "features": [
                {
                  "_name": "品牌总部11",
                  "_value": "山东"
                },
                {
                  "_name": "创建年代11",
                  "_value": "1990"
                },
                {
                  "_name": "优势11",
                  "_value": "帅啊"
                }
              ],
              "title": "张永伟666",
              "description": "张永伟666品牌",
              "postsText": {
                "id": 843454,
                "category": "",
                "title": "张永伟666",
                "feature": "[{\"_name\":\"品牌总部11\",\"_value\":\"山东\"},{\"_name\":\"创建年代11\",\"_value\":\"1990\"},{\"_name\":\"优势11\",\"_value\":\"帅啊\"}]",
                "description": "张永伟666品牌"
              },
              "postType": 4,
              "postTypeValue": "原创"
            },
            "topicTypeValue": "正常",
            "thumbs": 0,
            "forumName": "品牌"
          }

### 增加/修改 品牌 [POST]

+ Description
    + [MUST] Authenticated
    + [MUST] administrator
    
+ Parameters
    + post.title  - 必填
    + post.description  - 必填
    + post.language  - 必填
    + id (long) - 修改时必填，添加时必不填
    + post.creator (long) - 修改时必填，添加时必不填
    + attachments  其中的实体只需要包含图片id，因此保存品牌之前应该先上传图片并获取图片id
    + post.features (Map[]) - 是品牌的属性参数

+ 修改Request (application/json)

        {
            "data":{
                "id":457999,
                "post":{
                    "title":"张永伟666",
                    "description":"张永伟666品牌",
                    "language":1,
                    "creator":1031,
                    "features":[
                            {
                                "_name":"品牌总部11",
                                "_value":"山东"
                            },
                            {
                                "_name":"创建年代11",
                                "_value":"1990"
                            },
                            {
                                "_name":"优势11",
                                "_value":"帅啊"
                            }
                        ]
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
        }
+ 新增Request (application/json)
        
        {
            "data":{
                "post":{
                    "title":"张永伟666",
                    "description":"张永伟666品牌",
                    "language":1,
                    "features":[
                            {
                                "_name":"品牌总部11",
                                "_value":"山东"
                            },
                            {
                                "_name":"创建年代11",
                                "_value":"1990"
                            },
                            {
                                "_name":"优势11",
                                "_value":"帅啊"
                            }
                        ]
                }
            }
        }

+ Response 201 (application/json)

    + Headers

            Location: /brands/2
    + Body

            {
                "data": {
                    "id": 2,
                    "type": "brands"
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
        
### 删除品牌 [DELETE] /brands/{id}

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
        


### 图片上传接口 [POST] /attachments/upload
+ Parameters
    + id (long) - 图片标识，修改时必填
    + title (String) - 图片标题
    + file - 要上传的图片，必填

+ Description
    + [MUST] Authenticated
    
+ Response 200 (application/json)
        {
          
            "data": {
            "id": 1931631,
            "type": "attachments"
          }
        }