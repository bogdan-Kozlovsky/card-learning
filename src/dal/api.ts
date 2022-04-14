import axios from "axios";

///////////////////////////////////////////// type ////////////////////////////////////////////
type DeviceTokenType = {
    _id: string
    device: string
    token: string
    tokenDeathTime: number
}

export type ResponseType = {
    token: string;
    tokenDeathTime: number;
    updatedUser: ProfileType;
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
export type ForgotPasswordType = {
    email: string, // кому восстанавливать пароль
    from: string,
    // можно указать разработчика фронта)
    message: string // хтмп-письмо, вместо $token$ бэк вставит токен
}
type NewCardType = {
    name?: string
    deckCover?: string // не обязателен
    private?: boolean
}
type UpadatePackNameType = {
    _id: string
    name: string
}
// instance
export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // "https://neko-back.herokuapp.com/2.0/",
    // 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// global queries
export const requestsApi = {
    // api registration
    registrationRequest(data: RegistrationType) {
        return instance.post<AddedUserType>('auth/register', data)
    },
    loginRequest(data: { email: string, password: string, rememberMe: boolean }) {
        return instance.post<ProfileType>('auth/login', data)
    },
    authMeRequest() {
        return instance.post<ProfileType>('auth/me', {})
    },
    logoutRequest() {
        return instance.delete('/auth/me', {})
    },
    updateProfile(name: string, avatar: any) {
        return instance.put<ResponseType>('auth/me', {name, avatar})
    },
    forgotPassword(data: ForgotPasswordType) {
        return instance.post<ProfileType>('auth/forgot', data)
    },
    newPassword(data: { password: string, resetPasswordToken: string | undefined }) {
        return instance.post<{ info: string, error: string }>('auth/set-new-password', data)
    },

    // packsAPI
    getPacks(page: number, pageCount: number) {
        return instance.get(`cards/pack`, {params: {page, pageCount}})
        //
        // getCards(params: PacksParamsType) {
        // return instance.get<any, AxiosResponse<ResponseGetPacksType>, PacksParamsType>(`cards/pack`, {params})
    },
    addNewPack(newCard: NewCardType) {
        return instance.post<NewCardType>(`cards/pack`, {cardsPack: newCard})
    },
    deletePack(id: string) {
        return instance.delete<NewCardType>(`cards/pack`, {params: {id}})
    },
    updatePackNameTC(newPackName: UpadatePackNameType) {
        return instance.put(`cards/pack`, {cardsPack: newPackName})
    },

    // cardsAPI
    getCards(packId: string | undefined) {
        // getCards() {
        return instance.get(`cards/card?cardsPack_id=${packId}`,)
        // return instance.get(`cards/card`,)
    },
}
