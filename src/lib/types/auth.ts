export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthReducers {
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

export type AuthStore = AuthState & AuthReducers;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  confirmed: boolean;
  role: UserRole;
}

export type LoginResponse = User &
  Record<
    'accessToken' | 'accessTokenExpireDate' | 'refreshToken' | 'refreshTokenExpireDate',
    string
  >;

export const enum UserRole {
  ADMIN = 'admin',
}
