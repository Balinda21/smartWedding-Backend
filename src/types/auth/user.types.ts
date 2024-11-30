// src/types/user.types.ts
export interface UserRegisterRequest {
  email: string;
  password: string;
  name?: string; // Changed from userInfo structure to simple name field
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  data?: {
    user: {
      id: number;
      email: string;
      name: string | null;
      role: string;
    };
    token: string;
  } | null;
}

export interface LoginResponse extends AuthResponse {
  reason?: "Username" | "Password" | "Error";
}
