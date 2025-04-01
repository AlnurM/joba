export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  message?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}
