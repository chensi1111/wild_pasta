import { configureStore } from '@reduxjs/toolkit';
import reserveReducer from './reserveSlice';
import memberReducer from './memberSlice'
import burgerReducer from './burgerSlice'
import shoppingReducer from './shoppingSlice'

export const store = configureStore({
  reducer: {
    reserve: reserveReducer,
    member: memberReducer,
    burger: burgerReducer,
    shopping: shoppingReducer
  },
});

// 為 TypeScript 推導型別用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;