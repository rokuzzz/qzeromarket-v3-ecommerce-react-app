import ky from 'ky';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  LoginDto,
  LoginResult,
  RegisterDto,
  RegisterResult,
} from '../types/authTypes';

const API_BASE_URL =
  'https://romankuzero-ecommerce-api-2024.azurewebsites.net/api/v1/';

const api = ky.extend({
  prefixUrl: API_BASE_URL,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

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
