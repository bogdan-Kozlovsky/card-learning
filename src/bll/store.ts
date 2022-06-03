import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { appReducer } from './reducers/app/app-reducer';
import { authReducer } from './reducers/auth/auth-reducer';
import { cardsReducer } from './reducers/cards/cards-reducer';
import { packsReducer } from './reducers/packs/packs-reducer';
import { profileReducer } from './reducers/profile/profile-reducer';
import { sign_inReducer } from './reducers/signIn/sign_in-reducer';
import { sign_upReducer } from './reducers/signUp/sign_up-reducer';

export const rootReducer = combineReducers({
  signUp: sign_upReducer,
  signIn: sign_inReducer,
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  packs: packsReducer,
  cards: cardsReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export type AppRootStateType = ReturnType<typeof rootReducer>;
