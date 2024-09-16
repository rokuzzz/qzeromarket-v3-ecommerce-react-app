enum Role {
  Admin = 'Admin',
  User = 'User',
}

export interface GetUserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar?: string;
}

export interface PartialUpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  avatar?: string;
  password?: string;
}

export interface UpdateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  avatar?: string;
}
