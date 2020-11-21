import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';

import { AuthGuard } from '@nestjs/passport';
import { LocalUser } from '../../shared/LocalUser';
import { PlaceOrderDTO } from './dto/PlaceOrder.dto';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Transaction()
  /**
   * 1. 对前端提交过来的订单数据进行详细校验，防止篡改行为发生
   * 2. 校验通过后，进行订单生成处理
   * @param placeOrderDTO
   * @param manager 事务操作对象
   */
  async placeOrder(
    @Body(ValidationPipe)placeOrderDTO: PlaceOrderDTO,
    @TransactionManager() manager: EntityManager,
  ): Promise<number> {
    const uid = LocalUser.getUserID();
    const orderChecker = await this.orderService.isChecked(uid, placeOrderDTO);
    return await this.orderService.placeOrder(uid, placeOrderDTO, orderChecker, manager);
  }
}
