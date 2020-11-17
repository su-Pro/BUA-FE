# SKU

## 需求分析

### 提炼功能

- 首页推荐列表
- 餐品详情展示

### 数据表设计

## RD

### 数据层（entity、repo）

#### entity

配置导航属性:

- sku 和 sku_detail_img 一对多
- sku 和 theme 多对多
- sku 和 category 一对多
- sku 和 tag 多对多

#### repo

提供两个方法：

1. getPaginationSKU
2. getDetailSKU

`getPaginationSKU()` 主要是对数据进行分页查询，支持前端分页无限滚动商品列表业务。该方法接收一个对象，该对象需要提供如下两个属性：

limit ：每次分页的数据量

start：分页数据的起始点

`getDetailSKU()`主要提供商品的详细信息，为商品详细展示页面提供数据。该方法接受一个`sku_id`，用来指示如何在数据库中进行查询。

### 接口约定

#### 获取某个sku的详细信息

`v1/sku/detail/:id`

```json
req: query参数names=x,y,z

res:

```

#### 获取sku列表数据

- [ ] 分页数据如何做

`v1/sku/lists?start=0&limit=10`

```json
req:

res:

```

### 分页-> service

### 分页-> DTO + pipe

## extra

#### 数据量大的情况下，如何进行分页查询？

