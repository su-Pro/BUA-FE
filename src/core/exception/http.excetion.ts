import { HttpException, HttpStatus } from '@nestjs/common';
import { CodeAndMsg, ErrorCode } from '../../constants/http.errror';

export class _httpException extends HttpException {
  constructor(expData: CodeAndMsg) {
    if (typeof expData.CODE === 'undefined') {
      expData.CODE = ErrorCode.ParamsError.CODE;
    }
    super(expData, HttpStatus.OK);
  }
}
