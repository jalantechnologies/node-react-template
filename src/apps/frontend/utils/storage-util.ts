import { AccessToken } from 'frontend/types';
import { Nullable } from 'frontend/types/common-types';

const ACCESS_TOKEN_KEY = 'access-token';

export const getAccessTokenFromStorage = (): Nullable<AccessToken> => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (token) {
    return JSON.parse(token) as AccessToken;
  }
  return null;
};

export const setAccessTokenToStorage = (token: AccessToken): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(token));
};

export const removeAccessTokenFromStorage = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
