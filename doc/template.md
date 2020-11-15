# Theme

## 需求分析

该环节主要是准确的需求点以便能够准确对数据库进行设计（一个人干活的悲伤）以及思考如何编写业务代码。

### 提炼功能

### 数据表设计

#### 关系

## RD

### 数据层（entity、repo）

使用ORM的好处就是在于方便的操作数据库，其关键在于entity描述了真实的数据库中的表和字段。

之所以再拆分出一层repository，是为了将一些底层的数据库操作封装在repository中。这样能够在业务复杂时尽量保证entity的纯粹性，仅仅是描述数据库中的表，以及表关系。

#### entity

大可不必手写entity，可以借助数据库管理工具编写好表后进行**反向工程**生成数据库（我也不知道这样好不好...求指正）。

这里只解释如下内容：

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { classToPlain, Exclude } from 'class-transformer';

@Entity("theme", { schema: "bua_real" })
export class Theme {
  //...
  @Exclude({ toPlainOnly: true })
  @Column("datetime", { name: "delete_time", nullable: true })
  delete_time: Date | null;

  toJSON() {
    return classToPlain(this);
  }
}

```

由于创建、更新、删除时间通常不需要返回给前端，因此这里可以使用`class-transformer`提供的注解函数将其忽略。

> 个人理解和JPA中的jsonignore注解是一样用途

#### repo

由于需要查询一组theme（可以使用ORM提供的语法糖进行查询），因此在数据层这里查询参数就要有所限制，例如需要是一个数组。

> 但通常前端传递时使用字符串拼接查询更为方便合理，所以在后面处理接口时候需要pipe转化一下。mark it

这里可以使用ORM提供的queryBuilder建立查询语句，ORM代码如下。

```typescript
async findByNames(names: ThemeByNamesDTO): Promise<Theme []> {
    let themeList:Theme[];
    try {
       const query =  this.createQueryBuilder('theme')
        .where('theme.name IN (:...names)', { names });
        themeList = await query.getMany();
    } catch (e) {
    throw new _httpException(new ErrorThemeByNamesDB())
    }
    return themeList;
}
```

- [ ] mySQL如何处理数组参数的WHERE查询？

### 接口约定

#### 获取一组theme

`v1/theme/by/names`

```json
req: query参数names=x,y,z

res:

```

#### 获取某个theme并携带spu_list

```json
req:

res:

```

### service

我对service层的职责理解就是对业务进行处理后交给repo进行事务操作，而后将数据返回给controller。由于查询一组theme业务较为简单，这里直接return `repo.findByNames`即可。

### controller

我对controller层的职责理解就是主要起到承上启下作用，对上层（http网络层）主要起到解析和校验参数的工作。对下层（service层）起到业务调度和传输数据，根据不同的业务场景吊起不同的service进行业务处理，并按照约定的DTO处理`req`。

#### DTO

在定义DTO的同时，可以采用`Class-validators`对字段进行约定，便于在pipe中对参数校验处理后进行二次校验，从而保证在service层以及数据层的准确性。（毕竟操作数据层还是需要很**严谨**）。

#### pipe

在NestJS中校验工作可以交给pipe处理，在使用层面上官方已经介绍的颇为详细在此不做赘述。

功能上只需要判断简单判断前端传递过来的字符串是否合法（毕竟是query参数），校验通过后将其分割成约定好的DTO格式返回即可。

> 关于RD部分我已经将按照每篇文章的顺序进行编写，尽量在一定程度上不去贴代码，更多的是记录和分享自己的实现思考过程。
>
> 以后的每篇文章我在RD部分会贴出对应的分支，如果感兴趣的同学直接查阅源码即可。

## extra

#### 反向工程：逆向生成entity

#### Class-validators ignore

[How to exclude entity field from returned by controller JSON. NestJS + Typeorm](https://stackoverflow.com/questions/50360101/how-to-exclude-entity-field-from-returned-by-controller-json-nestjs-typeorm)


#### 全局异常层封装
