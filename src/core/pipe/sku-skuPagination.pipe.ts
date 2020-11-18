import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { _httpException } from '../exception/http.excetion';
import { ErrorSkuPaginationParams} from '../../constants/http.errror';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export const PAGINATIONLIMIT = 10; // 分页数据
@Injectable()
export class SkuPaginationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if(!metatype || value.start === undefined || value.start === null) {
      throw new _httpException(new ErrorSkuPaginationParams())
    }
    value.start = Number.parseInt(value.start);
    if(value.limit === undefined ) {
      value.limit = PAGINATIONLIMIT;
    }
    value.limit = Number.parseInt(value.limit);
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new _httpException(new ErrorSkuPaginationParams())
    }
    return value;
  }
}
