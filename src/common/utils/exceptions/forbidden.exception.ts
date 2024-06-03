import { ForbiddenException } from '@nestjs/common';

export class AuthorityForbiddenException extends ForbiddenException {
  constructor() {
    super('권한이 없습니다.');
  }
}

export class CommonUpdateForbiddenException extends ForbiddenException {
  constructor() {
    super('작성자만 수정할 수 있습니다.');
  }
}

export class CommonDeleteForbiddenException extends ForbiddenException {
  constructor() {
    super('작성자만 삭제할 수 있습니다.');
  }
}

export class CommonGetForbiddenException extends ForbiddenException {
  constructor() {
    super('비밀글입니다.');
  }
}

export class CommonPasswordForbiddenException extends ForbiddenException {
  constructor() {
    super('비밀번호가 일치하지 않습니다.');
  }
}

export class UserBlockedForbiddenException extends ForbiddenException {
  constructor(reason: string, expiredAt: string) {
    super(
      `접근이 제한된 계정입니다.\n사유: ${reason}\n제한 해제일자: ${expiredAt}`,
    );
  }
}

export class CommonCommentForbiddenException extends ForbiddenException {
  constructor() {
    super('댓글을 작성할 수 없습니다.');
  }
}
