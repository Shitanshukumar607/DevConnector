export type AuthUser = {
  _id: string;
  username: string;
  fullName?: string;
  email?: string;
};

type RegisterData = {
  fullName: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  user?: AuthUser;
};

export type { LoginData, RegisterData };
