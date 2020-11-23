#### 小程序支付时序图

![image-20201121220104621](/Users/supengyu/Library/Application Support/typora-user-images/image-20201121220104621.png)

订单校验是否可以支付

	- 订单状态为”未支付“不能肯定就是能支付的
	- 订单日期区间判断（直接用生成时订单的expreidTime）

#### WX :SDK配置

小程序ID，商户平台 MchID 和 key

#### 延迟消息队列



