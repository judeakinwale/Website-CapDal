import { DefaultItem } from "./default";
import type { Wallet } from "./wallet";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User extends DefaultItem {
  name: string;
  email: string;
  roles: string[];
  wallets?: Wallet[];

  imageUrl?: string;
}

export interface LoginResponse extends User {
  token: string;
  tokenExpiresAt?: number; // Unix timestamp in seconds
}
