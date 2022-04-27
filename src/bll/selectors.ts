import {AppRootStateType} from "./store";

//  auth
export const selectAuthNewPasswordValue = (state: AppRootStateType) => state.auth.newPasswordValue
export const selectAuthForgotValue = (state: AppRootStateType) => state.auth.forgotValue
export const selectAuthForgotProfile = (state: AppRootStateType) => state.auth.profile

// app
export const selectAppInitialized = (state: AppRootStateType) => state.app.initialized
export const selectAppStatus = (state: AppRootStateType) => state.app.status

// signIn
export const selectSignInisLogin = (state: AppRootStateType) => state.signIn.isLogin

// signUp
export const selectSignUpIsRegistration = (state: AppRootStateType) => state.signUp.isRegistration

// cards
export const selectCardsCards = (state: AppRootStateType) => state.cards.cards
export const selectCardsPackUserId = (state: AppRootStateType) => state.cards.packUserId
export const selectCardsCardsTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount
export const selectCardsCardsParamsPageCount = (state: AppRootStateType) => state.cards.params
export const selectCardsCardsCardsTotalCount = (state: AppRootStateType) => state.cards.cardsTotalCount

// profile
export const selectProfileProfileId = (state: AppRootStateType) => state.profile.profile._id

// packs
export const selectPacksParams = (state: AppRootStateType) => state.packs.params
export const selectPacksCardsPacksTotalCount = (state: AppRootStateType) => state.packs.cardPacksTotalCount
export const selectPacksCardsPacks = (state: AppRootStateType) => state.packs.cardPacks

