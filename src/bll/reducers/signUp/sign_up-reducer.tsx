import { SignUpActionType } from '../../actionCreator/signUp/types';

import { InitialStateType } from './types';

const initialState: InitialStateType = {
  isRegistration: false,
  registerError: '',
};

export const sign_upReducer = (
  state: InitialStateType = initialState,
  action: SignUpActionType,
): InitialStateType => {
  switch (action.type) {
    case 'REGISTRATION/SIGN_UP': {
      return { ...state, isRegistration: action.value };
    }
    default: {
      return state;
    }
  }
};
