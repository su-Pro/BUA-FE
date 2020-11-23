# 脚手架篇

## 简介

* 1、`Nest`基于`TypeScript`编写并且结合了 `OOP`(面向对象编程)，`FP`(函数式编程)和 `FRP` (函数式响应编程)的相关理念。在设计上的很多灵感来自于 `Angular`，`Angular` 的很多模 式又来自于 `Java` 中的 `Spring` 框架，依赖注入、面向切面编程等，所以我们也可以认为: `Nest` 是 `Node.js` 版的 `Spring` 框架
* 2、`Nest` 框架底层 `HTTP` 平台默认是基于 `Express` 实现的，所以无需担心第三方库的缺失。 `Nest` 旨在成为一个与平台无关的框架

## cli

### 为什么要使用脚手架

关于这个问题,其实我们在现代前端开发中，你使用`vue`,`react`等项目开发中,我们都会使用官方推荐的脚手架(所谓的`xx-cli`工具)来生成项目,这样的好处在于:

* 减少时间，不必从零开始搭建初始项目，提高开发效率。
* 便于多人协作，合理的项目**分层**
* 项目更新同步方便，只需要更新代码库中项目模板，即可下载最新的项目

[快速上手脚手架指令](https://docs.nestjs.com/cli/overview)

### `nest-cli`的基本使用

* 安装脚手架

  ```shell
  npm install -g @nestjs/cli
  ```

* 查看脚手架的版本

  ```shell
  nest -v
  ```

* 查看全部的命令(不记得使用命令创建文件的时候可以使用)

  > 根据下面打星多少来表示项目开中使用频率

  ```shell
  nest-book git:(master) nest   # 输入的命令
  Usage: nest <command> [options]
  
  Options:
    -v, --version                                   查看当前nestjs-cli的版本
    -h, --help                                      查看帮助
  
  Commands:
    new|n [options] [name]                          生成一个新的项目
    build [options] [app]                           构建一个项目
    start [options] [app]                           运行项目
    info|i                                          显示项目的具体信息
    update|u [options]                              升级之前的依赖包
    add [options] <library>                         将对外部库的支持添加到项目中。
  
    generate|g [options] <schematic> [name] [path]  Generate a Nest element.
      Available schematics:
        全称              别名(一般我们使用别名就可以)
        ┌───────────────┬─────────────┐
        │ name          │ alias       │
        │ application   │ application │
        │ class         │ cl          │
        │ configuration │ config      │
        │ controller    │ co          │            ** 控制器
        │ decorator     │ d           │            * 装饰器
        │ filter        │ f           │            * 过滤器
        │ gateway       │ ga          │            网关
        │ guard         │ gu          │            * 守卫
        │ interceptor   │ in          │            * 拦截器
        │ interface     │ interface   │            接口
        │ middleware    │ mi          │            中间层  
        │ module        │ mo          │            ** 模块
        │ pipe          │ pi          │            * 管道
        │ provider      │ pr          │
        │ resolver      │ r           │            graphql使用相当于上面的控制器
        │ service       │ s           │            ** 创建服务
        │ library       │ lib         │
        │ sub-app       │ app         │
        └───────────────┴─────────────┘
  ```

* 使用脚手架命令创建文件(控制器、服务层、模块)的时候会自动生成一个`spec`的测试文件,如果不想需要,可以加上参数

  ```shell
  nest g mo user [--no-spec]
  ```

* 创建一个`module`

  ```shell
  nest g mo user
  ```

* 创建一个控制器

  ```shell
  nest g co user
  nest g co user --no-spec # 创建不带测试文件的
  ```

* 创建一个服务层

  ```shell
  nest g s user 
  ```

> 建议：先创建module 这样在创建控制器时会自动同步成功

### 使用脚手架构建一个项目

#### 项目基本介绍

* 使用脚手架创建一个项目

  ```shell
  nest new nest-base
  ```

  > 选择安装依赖包的方式后就耐心等待

 ![输入图片说明](https://images.gitee.com/uploads/images/2020/0829/191742_a80102c9_1808543.png "image-20200713153707891.png")

* 初始化项目文件介绍(删除`node_module`后的项目)

  ```shell
  ➜  nest-base git:(master) tree
  .
  ├── README.md
  ├── nest-cli.json # nest-cli的配置
  ├── package-lock.json
  ├── package.json
  ├── src  # 项目文件
  │   ├── app.controller.spec.ts # 控制器的单元测试文件(可以删除)
  │   ├── app.controller.ts # 控制器文件(可以删除)
  │   ├── app.module.ts # 入口的module(不能删除)
  │   ├── app.service.ts # 服务层文件(可以删除)
  │   └── main.ts # 项目入口文件(不能删除)
  ├── test # 测试文件(可以删除)
  │   ├── app.e2e-spec.ts
  │   └── jest-e2e.json
  ├── tsconfig.build.json
  └── tsconfig.json # tsconfig的配置文件
  
  2 directories, 13 files
  ```

#### 基础项目的解释

* 1、目录结构

  ```shell
  ➜  src git:(master) tree
  .
  ├── app.controller.spec.ts # 测试文件，可以先不看
  ├── app.controller.ts # 控制器
  ├── app.module.ts # 主模块
  ├── app.service.ts # 服务层
  └── main.ts # 入口文件
  
  0 directories, 5 files
  ```

* 2、`main.ts`文件

  ```typescript
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  
  async function bootstrap() {
    // 使用NestFactory工厂创建一个app应用并且传递一个AppModule模块进去,类似我们使用express框架一样的先创建一个app
    const app = await NestFactory.create(AppModule);
    // 监控端口,运行项目后浏览器直接访问localhost:3000
    await app.listen(3000);
  }
  bootstrap();
  ```

* 3、`app.module.ts`文件

  ```typescript
  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  
  @Module({
    imports: [], // 依赖外面的模块(可以是自己创建的比如userModule，或者是官方提供的比如typeorm, graphql,或者第三方的)
    controllers: [AppController], // 该模块所用到的控制器
    providers: [AppService], // 该模块的提供者
    exports: [], // 别的模块要使用该模块中的某几个方法，就要在这里对外暴漏
  })
  export class AppModule {}
  ```

* 4、`app.controller.ts`文件

  ```typescript
  import { Controller, Get } from '@nestjs/common';
  import { AppService } from './app.service';
  
  @Controller() // 使用nestjs的装饰器装饰表示该类是一个控制器
  export class AppController {
    constructor (
      // 使用依赖注入的方式注入一个类
      private readonly appService: AppService
    ) { }
  
    @Get() // 定义http的请求方式为get请求
    getHello(): string { // 函数名可以随便定义
      return this.appService.getHello(); // 控制层调用服务层的getHello()方法
    }
  }
  ```

* 5、`app.service.ts`文件

  ```typescript
  import { Injectable } from '@nestjs/common';
  
  @Injectable()
  export class AppService {
    getHello(): string {
      // 现在直接返回一个字符串,实际开发中这里调用typeorm中的方法对数据库进行curd操作
      return 'Hello World!';
    }
  }
  ```



