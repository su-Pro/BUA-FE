# Activity 

## 需求分析

该环节主要是准确的需求点以便能够准确对数据库进行设计（一个人干活的悲伤）以及思考如何编写业务代码。

### 提炼功能

- 活动展示
- 具体活动 关联 优惠券业务

#### 活动展示

展示活动基本信息，例如描述内容和图片封面的展示。

#### 具体活动 -> 优惠券业务

当用户点击具体活动封面后，会跳转到优惠券领取页面。

#### 补充

之所以将活动和优惠券关联，是由业务所决定的。比如 圣诞节活动推出xxx优惠券，在活动范围内，可以领取xxx优惠券。

> 这里做的较为简单，并没有将活动和商品进行关联从而限制范围。仅仅是为了延伸出优惠券活动，并允许用户在期间可以参与。

### 数据表设计

#### 关系

因为优惠券属于活动，一个活动可以拥有多张优惠券，因此活动和优惠券之间的关系是一对多。

#### 字段

- 基本信息（展示文本内容、名称、图片等）
- 运营相关（活动时间范围和是否上线）

#### DDL

```mysql
	-- auto-generated definition
create table activity
(
    id               int unsigned auto_increment
        primary key,
    name             varchar(20)                                   not null comment '比id更有描述性的身份',
    title            varchar(60)                                   null,
    description      varchar(255)                                  null,
    entrance_img     varchar(255)                                  null,
    internal_top_img varchar(255)                                  null,
    create_time      datetime(3)      default CURRENT_TIMESTAMP(3) null,
    update_time      datetime(3)      default CURRENT_TIMESTAMP(3) null on update CURRENT_TIMESTAMP(3),
    start_time       datetime(3)                                   not null comment '运营：活动开始日期',
    end_time         datetime(3)                                   not null comment '运营：活动结束日期',
    online           tinyint unsigned default 1                    null  comment '运营：是否上线'      
)
    charset = utf8mb4;


```

> 优惠券部分的设计请参考相关章节

## RD

#### repo

该功能较为简单，只需要提供如下两个数据的查询：

`getDetailActivity( )` 查询指定name的活动，并返回详细数据。

`getCouponWithActivity( )` 查询指定name活动所对应的所有优惠券。

#### 接口定义



> 其余部分较为简单，请参考: 分支。



## extra

#### 反向工程：逆向生成entity

#### Class-validators ignore

[How to exclude entity field from returned by controller JSON. NestJS + Typeorm](https://stackoverflow.com/questions/50360101/how-to-exclude-entity-field-from-returned-by-controller-json-nestjs-typeorm)


#### 全局异常层封装