export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile'
    },
    USERS: {
      BASE: '/users',
      BY_ID: (id: string) => `/users/${id}`,
      UPDATE: (id: string) => `/users/${id}`,
      DELETE: (id: string) => `/users/${id}`
    }
  }
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  CURRENT_USER: 'current_user',
  REFRESH_TOKEN: 'refresh_token'
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
