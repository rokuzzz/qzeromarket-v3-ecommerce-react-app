export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: File;
}

export interface RegisterResult {
  userId: number;
  message: string;
}