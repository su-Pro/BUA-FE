import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { _httpException } from '../exception/http.excetion';
import { ErrorSkuByIdParams, ErrorThemeByNamesParams } from '../../constants/http.errror';

@Injectable()
export class SkuIdPipe implements PipeTransform {
  async transform(value: string, { metatype }: ArgumentMetadata) {
    if(!metatype || value === undefined || value === null) {
      throw new _httpException(new ErrorSkuByIdParams())
    }
    // 转化成数字形式
    return Number.parseInt(value);
  }
}
