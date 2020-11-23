import { Injectable } from '@nestjs/common';
import { ActivityRepo } from './Activity.repo';
import { GetByNameDTO } from './dto/GetByName.dto';

@Injectable()
export class ActivityService {
  constructor(
    private activityRepo:ActivityRepo
  ) {
  }
  async getByName (getByNameDTO:GetByNameDTO) {
    const name = getByNameDTO.name;
    return await this.activityRepo.findOne({
      where: {name}
    })
  }
  async getByNameWithCoupon (getByNameDTO:GetByNameDTO) {
    const name = getByNameDTO.name;
    return await this.activityRepo.findOne({
      where: {name},
      relations: ["couponList"]
    })
  }
}
