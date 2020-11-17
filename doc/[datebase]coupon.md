# DB coupon

设计数据时候，我通常先抽象实体的功能，而后思考与其他实体之间的关系，最后根据具体业务对字段进行设计。

Coupon实体主要的功能如下：

- 定义优惠劵类型以及优惠力度
- 关联领取的用户
- 关联作用的品类

## 关系分析

### 用户



多对多，第三张表维护优惠券当前状态、用户使用的订单ID

### 品类

对对多，一个优惠券可以使用在多个品类，同样一个品类可以使用多种优惠券。

### 活动

一对多，一个活动拥有多个优惠券。

## 字段

#### 优惠券类型

#### 约束条件

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