import { User } from './user.model';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

// Re-export User from user.model.ts to keep auth-related types together
export { User } from './user.model';
