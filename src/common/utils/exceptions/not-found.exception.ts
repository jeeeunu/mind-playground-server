import { NotFoundException } from '@nestjs/common';

export class BannerNotFoundException extends NotFoundException {
  constructor() {
    super('배너 리소스가 존재하지 않습니다.');
  }
}

export class TermsNotFoundException extends NotFoundException {
  constructor() {
    super('약관 리소스가 존재하지 않습니다.');
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super('유저가 존재하지 않습니다.');
  }
}

export class ReferrerUserNotFoundException extends NotFoundException {
  constructor() {
    super('추천인 유저가 존재하지 않습니다.');
  }
}

export class PostNotFoundException extends NotFoundException {
  constructor() {
    super('게시물이 존재하지 않습니다.');
  }
}

export class UserBlockedNotFoundException extends NotFoundException {
  constructor() {
    super('정지된 유저의 기록이 존재하지 않습니다.');
  }
}

export class AdminNotFoundException extends NotFoundException {
  constructor() {
    super('관리자가 존재하지 않습니다.');
  }
}
