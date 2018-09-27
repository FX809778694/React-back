+ 2017年11月10日
    + API初始化

## 评测模块[/article/evaluations]
+ Description
    + 本模块除url以外，其他均与新闻模块相同，因此本文档省略接口详细内容，具体参见新闻接口文档。

### 评测集合 (GET)[/article/evaluations?page[number]=1&page[size]=5&filter[title]=评测

+ Parameters
    + filter[id] - 筛选条件，唯一标识
    + filter[title] - 筛选条件，评测标题

### 父评测详情 (GET)[/article/evaluations/parents/{id}

### 增加/修改 评测 (POST)

+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN

### 删除评测 (GET)/article/evaluations/{id}
+ Description
    + [MUST] Authenticated
    + [MUST] ROLE_ADMIN