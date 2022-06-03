import { instance } from '../config';
import { ResponseType } from '../types';

export const profileApi = {
  updateProfile(name: string, avatar: any) {
    return instance.put<ResponseType>('auth/me', { name, avatar });
  },
};
