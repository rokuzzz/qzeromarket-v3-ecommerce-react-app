export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export interface GetUsersParams {
  page?: number;
  perPage?: number;
  role?: Role;
}

export interface GetUserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar?: string;
}

export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
}
