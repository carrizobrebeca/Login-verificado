import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';
const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
  },
});

export default store;
