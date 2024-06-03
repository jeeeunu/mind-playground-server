import { BadRequestException } from '@nestjs/common';

export class CommonBadRequestException extends BadRequestException {
  constructor() {
    super('잘못된 요청입니다.');
  }
}

export class UploadFileBadRequestException extends BadRequestException {
  constructor() {
    super('업로드할 파일을 전송해주세요.');
  }
}
