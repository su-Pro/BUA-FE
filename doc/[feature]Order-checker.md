# Order 之 订单校验

## 需求分析

该环节主要是准确的需求点以便能够准确对数据库进行设计（一个人干活的悲伤）以及思考如何编写业务代码。

### 提炼功能

生成订单

订单状态查看

### 数据表设计

主要分为三个层面：

订单状态、快照信息以及基本数据

### 状态

状态流转时序：完成 ->  待收货 -> 待发货 -> 待支付（可以取消也可以成功）

待支付->订单过期： expired_time create_time

待支付->支付成功:	placed_time

状态控制字段：status

#### 信息快照

主要用来存储当前订单的描述信息：

订单包含的商品列表、title？、订单的图片以及订单对应的地址：

snap_item 、snap_img、snap_title 和 snap_adress

#### 基本信息

订单编号、支付编号以及价格。

#### DDL

```mysql
-- auto-generated definition
create table `order`
(
    id                int unsigned auto_increment
        primary key,
    order_no          varchar(20)                                   null,
    prepay_id         varchar(255)                                  null comment '支付id号',
    user_id           int unsigned                                  null comment 'user表外键',
    status            tinyint unsigned default 1                    null comment '标识订单状态 1：待支付 2： 待发货 3： 待收获 4：完成',
    create_time       datetime(3)      default CURRENT_TIMESTAMP(3) null comment '订单创建日期',
    update_time       datetime(3)      default CURRENT_TIMESTAMP(3) null on update CURRENT_TIMESTAMP(3),
    expired_time      datetime(3)                                   null comment '过期日期',
    placed_time       datetime(3)                                   null comment '支付日期',
    snap_img          varchar(255)                                  null comment '快照的图片，主要用来前端展示',
    snap_title        varchar(255)                                  null comment '快照的标题描述',
    snap_items        json                                          null comment '快照中对应的商品信息',
    snap_address      json                                          null comment '快照的地址',
    total_price       decimal(10, 2)   default 0.00                 null comment '生成订单时的总价',
    total_count       int(11) unsigned default 0                    null comment '订单的总数量',
    final_total_price decimal(10, 2)                                null comment '最终支付的订单价格', 

    constraint uni_order_no
        unique (order_no)
)
    charset = utf8mb4;


```



#### 关系

## RD

前端数据不可信，进行复杂逻辑的校验保证订单信息的正确性。

### DTO

```typescript
export class PlaceOrderDTO {
  //TODO: 能否创建一个碎片防止多次相同的出现
  @IsInt()
  @Min(0.01)
  @Max(999999.99)
  @IsNotEmpty()
  totalPrice;
  @IsInt()
  @Min(0.01)
  @Max(999999.99)
  @IsNotEmpty()
  finalTotalPrice;
  couponId; // 可以不使用优惠券
  @IsNotEmpty()
  skuInfoList:SkuInfoDTO [];
  @IsNotEmpty()
  address;
}
export class SkuInfoDTO {
  id;
  @IsInt()
  @Min(1)
  @Max(MAXIMUM_BUY_SKU)
  count;
}


```

#### 校验逻辑

#### 校验器

由于存在不使用优惠券的同学进行下单，所以需要封装一个专门检查优惠券的Checker

#### couponChecker



#### orderChecker

### entity

涉及到的实体有：coupon user_coupon 和 sku

