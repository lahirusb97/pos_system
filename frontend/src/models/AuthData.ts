interface AuthData {
  message: string;
  token: string;
  username: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export type { AuthData };
