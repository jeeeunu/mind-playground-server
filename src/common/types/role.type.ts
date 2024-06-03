import { $Enums } from "@prisma/client";

export type RoleType = ($Enums.UserRole | $Enums.AdminRole)[];
