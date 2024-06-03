import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../guard/role.guard';
import { RoleType } from '../types/role.type';

export const UseRoleGuard = (...roles: RoleType) => {
  return applyDecorators(SetMetadata('Roles', roles), UseGuards(RoleGuard));
};
