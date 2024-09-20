import ky from 'ky';

const API_BASE_URL =
  'https://romankuzero-ecommerce-api-2024.azurewebsites.net/api/v1/';

export const api = ky.extend({
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
