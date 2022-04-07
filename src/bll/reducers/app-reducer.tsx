///////////////////////////////////////////// type ////////////////////////////////////////////
type InitialStateType = {
    initialized: boolean
}
type ActionType = | ReturnType<typeof initializedAC>

///////////////////////////////////////////// initial state ////////////////////////////////////////////
const initialState: InitialStateType = {
    initialized: false,
}

///////////////////////////////////////////// reducer ////////////////////////////////////////////
export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case "APP/INITIALIZED": {
            return {...state, initialized: action.value}
        }
        default: {
            return state
        }
    }
}

///////////////////////////////////////////// action creator ////////////////////////////////////////////
export const initializedAC = (value: boolean) => {
    return {
        type: 'APP/INITIALIZED', value
    } as const
}


