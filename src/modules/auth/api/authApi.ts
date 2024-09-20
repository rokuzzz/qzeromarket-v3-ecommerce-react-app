import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  LoginDto,
  LoginResult,
  RegisterDto,
  RegisterResult,
} from '../types/authTypes';
import { api } from '../../shared/api/apiClient';

export const useLogin = (
  options?: UseMutationOptions<LoginResult, Error, LoginDto>
) => {
  return useMutation<LoginResult, Error, LoginDto>({
    mutationFn: async (loginData) => {
      return api.post('auth/login', { json: loginData }).json<LoginResult>();
    },
    ...options,
  });
};

export const useRegister = (
  options?: UseMutationOptions<RegisterResult, Error, RegisterDto>
) => {
  return useMutation<RegisterResult, Error, RegisterDto>({
    mutationFn: async (registerData) => {
      const formData = new FormData();
      Object.entries(registerData).forEach(([key, value]) => {
        if (key === 'avatar' && value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'string') {
          formData.append(key, value);
        }
      });

      return api
        .post('auth/register', { body: formData })
        .json<RegisterResult>();
    },
    ...options,
  });
};
