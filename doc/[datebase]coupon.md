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

#### 使用细则

## DDL

### coupon

```mysql
-- auto-generated definition
create table coupon
(
    id          int unsigned auto_increment
        primary key,
    title       varchar(255)                                  null,
    description varchar(255)                                  null,
    type        smallint                                      not null comment '1. 满减券 2.折扣券 3.无门槛券 4.满金额折扣券',
    start_time  datetime                                      null comment '有效期上线',
    end_time    datetime                                      null comment '有效期截止时间',
    whole_store tinyint unsigned default 0                    null comment '标识是否为全场通用类型',
    full_money  decimal(10, 2)                                null comment '使用优惠券时的条件：满足多少钱',
    minus       decimal(10, 2)                                null comment '减免多少钱',
    rate        decimal(10, 2)                                null comment '打多少折',
    create_time datetime(3)      default CURRENT_TIMESTAMP(3) null,
    update_time datetime(3)      default CURRENT_TIMESTAMP(3) null on update CURRENT_TIMESTAMP(3),
    online      tinyint          default 1                    null comment '标识是否上线',
    activity_id int unsigned                                  null comment '隶属于的品类'
)
    comment 'remark /*描述该优惠券能够使用的类型，前端展示用*/' charset = utf8mb4;


```

### category_coupon

多对多关系，第三张表没有实际业务意义。

```mysql
-- auto-generated definition
create table coupon_category
(
    id          int unsigned auto_increment
        primary key,
    category_id int unsigned     not null,
    coupon_id   int(11) unsigned not null
)
    charset = utf8mb4;


```

### user_coupon

对多多关系，第三张表具有实际业务意义。

```mysql
-- auto-generated definition
create table user_coupon
(
    id          int unsigned auto_increment
        primary key,
    user_id     int unsigned                                  not null,
    coupon_id   int unsigned                                  not null,
    order_id    int unsigned                                  null comment '在优惠券核销时，需要填写对应的订单号',
    status      tinyint unsigned default 0                    not null comment '1:未使用，2：已使用， 3：已过期',
    create_time datetime(3)      default CURRENT_TIMESTAMP(3) null,    
    update_time datetime(3)      default CURRENT_TIMESTAMP(3) null on update CURRENT_TIMESTAMP(3),
    constraint uni_user_coupon
        unique (user_id, coupon_id)
)
    charset = utf8mb4;

```

