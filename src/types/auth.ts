export type Role = {
  id: number;
  authority: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Array<Role>;
  emailVerified: boolean;
};

export type LoginResponse = {
  token: string;
  type: string;
  user: User;
};