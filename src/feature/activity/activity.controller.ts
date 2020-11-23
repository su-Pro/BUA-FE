import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { GetByNameDTO } from './dto/GetByName.dto';

@Controller('activity')
export class ActivityController {
  constructor(
    private activityService:ActivityService
  ) {
  }
  @Get('name/:name')
  async getActivityByName(@Param(ValidationPipe)getByNameDTO:GetByNameDTO) {
    return await this.activityService.getByName(getByNameDTO);
  }
  @Get('name/:name/with_coupon')
  async getActivityWithCoupon(@Param(ValidationPipe) getByNameDTO:GetByNameDTO) {
     return await this.activityService.getByNameWithCoupon(getByNameDTO);
  }
}
