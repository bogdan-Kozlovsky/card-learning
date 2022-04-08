import axios from "axios";

///////////////////////////////////////////// type ////////////////////////////////////////////
type DeviceTokenType = {
    _id: string
    device: string
    token: string
    tokenDeathTime: number
}
export type UpdateProfileType = {
    avatar: string
    name: string
}

export type ProfileType = {
    avatar: string
    created: string | null
    deviceTokens: Array<DeviceTokenType> | null
    email: string | null
    isAdmin: boolean | null
    name: string
    publicCardPacksCount: number | null
    rememberMe: boolean | null
    token: string | null
    tokenDeathTime: number | null
    updated: string | null
    verified: boolean | null
    __v: number | null
    _id: string | null
}

export type RegistrationType = {
    email: string;
    password: string;
    rememberMe?: any
};

type AddedUserType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
    _id: string
}

// instance
export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// global queries
export const requestsApi = {
    // api registration
    registrationRequest(data: RegistrationType) {
        return instance.post<AddedUserType>('/auth/register', data)
    },
    loginRequest(data: { email: string, password: string, rememberMe: boolean }) {
        return instance.post<ProfileType>('/auth/login', data)
    },
    authMeRequest() {
        return instance.post<ProfileType>('/auth/me', {})
    },
    logoutRequest() {
        return instance.delete('/auth/me', {})
    },
    updateProfile(data: UpdateProfileType) {
        return instance.put<ProfileType>('auth/me', data)
    }
}