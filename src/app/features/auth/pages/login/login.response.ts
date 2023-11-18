import { User } from "../../../../types/user.interface";

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}