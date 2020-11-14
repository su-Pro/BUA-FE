import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { _httpException } from '../exception/http.excetion';
import { ErrorThemeByNamesParams } from '../../constants/http.errror';

@Injectable()
export class ThemesNamePipe implements PipeTransform {
  async transform(value: string, { metatype }: ArgumentMetadata) {
    if(!metatype || !this.toValidate(metatype) || !value) {
      throw new _httpException(new ErrorThemeByNamesParams())
    }
    // 转化成数组形式
    const translateValue = value.split(",")
    //  如果转化数组出错，依然抛出异常提示参数有误
    const object = plainToClass(metatype, translateValue);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new _httpException(new ErrorThemeByNamesParams())
    }
    return translateValue;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype:Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
