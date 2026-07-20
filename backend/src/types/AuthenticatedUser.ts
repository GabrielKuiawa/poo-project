import { UserRole } from "../enum/UserRole";

export interface AuthenticatedUser {
  userId: string;
  role: UserRole;
  readOnly?: boolean;
}
