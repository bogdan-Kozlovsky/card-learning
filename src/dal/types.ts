export type DeviceTokenType = {
  _id: string;
  device: string;
  token: string;
  tokenDeathTime: number;
};

export type ResponseType = {
  token: string;
  tokenDeathTime: number;
  updatedUser: ProfileType;
};

export type ProfileType = {
  avatar: string;
  created: string | null;
  deviceTokens: Array<DeviceTokenType> | null;
  email: string | null;
  isAdmin: boolean | null;
  name: string;
  publicCardPacksCount: number | null;
  rememberMe: boolean | null;
  token: string | null;
  tokenDeathTime: number | null;
  updated: string | null;
  verified: boolean | null;
  __v: number | null;
  _id: string | null;
};

export type RegistrationType = {
  email: string;
  password: string;
  rememberMe?: any;
};

export type AddedUserType = {
  created: string;
  email: string;
  isAdmin: boolean;
  name: string;
  publicCardPacksCount: number;
  rememberMe: boolean;
  updated: string;
  verified: boolean;
  __v: number;
  _id: string;
};
export type ForgotPasswordType = {
  email: string;
  from: string;
  message: string;
};
export type NewCardType = {
  name?: string;
  deckCover?: string; // не обязателен
  private?: boolean;
};
export type UpdatePackNameType = {
  _id: string;
  name: string | null;
};
