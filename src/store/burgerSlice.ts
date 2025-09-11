import { createSlice } from '@reduxjs/toolkit';

const burgerSlice = createSlice({
  name: 'burger',
  initialState: {
    open: false,
  },
  reducers: {
    openBurger: (state) => {
      state.open=true
    },
    closeBurger: (state) => {
      state.open =false;
    },
    toggleBurger: (state) => {
      state.open = !state.open;
    }
  },
});

export const { openBurger,closeBurger,toggleBurger} = burgerSlice.actions;
export default burgerSlice.reducer;