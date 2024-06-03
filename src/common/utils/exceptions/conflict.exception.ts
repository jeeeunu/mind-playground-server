import { ConflictException } from '@nestjs/common';
export class LoginIdDuplicateConflictException extends ConflictException {
  constructor() {
    super('이미 사용중인 아이디입니다.');
  }
}

export class CommonConflictException extends ConflictException {
  constructor() {
    super('잘못된 요청입니다.');
  }
}

export class CommonNameDuplicationConflictException extends ConflictException {
  constructor() {
    super('이미 존재하는 이름입니다.');
  }
}

export class CommonNotMatchPhraseCommentConflictException extends ConflictException {
  constructor() {
    super('잘못된 답변입니다.');
  }
}

export class OAuthIdDuplicateConflictException extends ConflictException {
  constructor() {
    super('이미 등록된 계정입니다.');
  }
}

export class NicknameDuplicateConflictException extends ConflictException {
  constructor() {
    super('이미 사용중인 닉네임입니다.');
  }
}

export class AdminDeleteMeConflictException extends ConflictException {
  constructor() {
    super('본인을 삭제할 수 없습니다.');
  }
}

export class EmailDuplicateConflictException extends ConflictException {
  constructor() {
    super('이미 사용중인 이메일 입니다.');
  }
}

export class SelfLikeConflictException extends ConflictException {
  constructor() {
    super('본인의 게시물에는 좋아요를 누를 수 없습니다.');
  }
}
