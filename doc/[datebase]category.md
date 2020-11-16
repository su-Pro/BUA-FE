# \DB category

设计数据时候，我通常先抽象实体的功能，而后思考与其他实体之间的关系，最后根据具体业务对字段进行设计。

category实体主要的功能如下：

- 关联商品
- 宫格提供数据
- 限制活动品类

## 关系分析

### 商品

该业务较为简单，因此设计的时候将分类和商品定义为一对多的关系。当然一个商品也是有可能属于多个分类的，主要还是看业务复杂度。

> 宫保鸡丁 属于川菜也属于热炒菜... 由于业务没有那么复杂，因此只约定了一对多的关系，宫保鸡丁只属于炒菜这一个分类。

### 宫格

宫格只是从分类中抽离出来的数据，保存一些额外的信息，比如宫格展示的信息。

当然真实场景可能还要考虑宫格的锚点特性，定位到不同的业务中。

> 比如美团中宫格就拥有定位到不同的业务中，比如外卖和附近美食等。

### 活动

本系统中活动主要是优惠券活动，不难想到一个活动肯定是针对特定的商品开展的。但商品的粒度太细难于维护，因此选择其父实体->category。

比如：一个活动（优惠券活动）可以对应多个细分领域（特价菜、川菜），一个细分领域（特价菜）也可以有多个活动（光盘行动和优惠券活动），因此两者之间的关系为多对多。

## 字段

在设计category表时候，需要考虑如下业务细节问题：

- 如何做多级分类
- 辅助运营

### 多级分类

参考数据结构：链表

需要的字段：is_root parent_id

### 运营

#### 分类排序

诱导用户进行指定商品的浏览

需要的字段：index

#### 上线和下线

关系型数据库不能随意硬删除数据，而且在删除数据时候还会有如下问题发生：

- 关系链断裂，影响其他数据
- 无法使用高效的分页查询
- 误删，恢复代价高

因此使用状态位标记状态，需要的字段：online

## DDL

### category

综上所述，外加一些原信息，category表设计如下：

```mysql
-- auto-generated definition
create table category
(
    id          int unsigned auto_increment
        primary key,
    name        varchar(255)                                  not null comment '分类名称',
    description varchar(255)                                  null comment '分类的描述信息',
    is_root     tinyint unsigned default 0                    not null comment '是否是父节点',
    parent_id   int unsigned                                  null comment '父节点ID',    
    `index`     int unsigned                                  null comment '用于排序的字段',
    online      int unsigned     default 1                    null comment '是否上线',    
    create_time datetime(3)      default CURRENT_TIMESTAMP(3) null,
    update_time datetime(3)      default CURRENT_TIMESTAMP(3) null on update CURRENT_TIMESTAMP(3)
)
    charset = utf8mb4;
```

### grid_category



```mysql
-- auto-generated definition
create table grid_category
(
    id               int unsigned auto_increment
        primary key,
    title            varchar(255)                             null comment '网格分类名称，前端展示字段',
    img              varchar(255)                             null comment '对应的icon图片',
    create_time      datetime(3) default CURRENT_TIMESTAMP(3) null,
    update_time      datetime(3) default CURRENT_TIMESTAMP(3) null on update CURRENT_TIMESTAMP(3),
    delete_time      datetime(3)                              null comment '不属于核心业务数据，因此可以硬删除',
    category_id      int                                      null comment '对应的分类'
)
    charset = utf8mb4;

	
```

### category_activity

先把和活动的第三张表建立出来，防止后面忘记~

```mysql
-- auto-generated definition
create table activity_category
(
    id          int unsigned auto_increment
        primary key,
    category_id int unsigned not null,
    activity_id int          not null
)
    charset = utf8mb4;


```