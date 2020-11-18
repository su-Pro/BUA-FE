export class CodeAndMsg {
  CODE: number;
  MESSAGE: string;
}

export class ErrorCode {
  static readonly ParamsError: CodeAndMsg = { CODE: 2, MESSAGE: '参数错误' };
}

export class ErrorThemeByNamesParams implements CodeAndMsg{
  CODE = 10001;
  MESSAGE = "查询参数有误，请查看"
}
export class ErrorThemeByNamesDB implements CodeAndMsg{
  CODE = 10002;
  MESSAGE = "数据库查询出错，稍后再试！"
}
export class ErrorSkuByIdParams implements CodeAndMsg{
  CODE = 20001;
  MESSAGE = "查询id参数有误，请查看"
}
export class ErrorSkuPaginationParams implements CodeAndMsg{
  CODE = 20002;
  MESSAGE = "分页参数有误，请查看"
}

export class ErrorLogin implements CodeAndMsg{
  CODE = 30001;
  MESSAGE = "获取openID失败"
}
