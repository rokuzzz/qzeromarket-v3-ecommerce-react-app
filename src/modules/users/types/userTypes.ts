import { BaseDto } from '../../shared/types/sharedTypes';

export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export interface GetUsersParams {
  page?: number;
  perPage?: number;
  role?: Role;
}

export interface GetUserDto extends BaseDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar?: string;
}

export interface UpdateUserDto extends BaseDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
}
