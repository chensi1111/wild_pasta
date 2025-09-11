import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    open: false,
    login: false,
    userInfo:{
      accessToken:"",
      refreshToken:"",
      account:"",
      email:"",
      userId:"",
      name:"",
      picture:"",
      phone:"",
      point:0
    }
  },
  reducers: {
    openBox: (state) => {
      state.open=true
    },
    closeBox: (state) => {
      state.open =false;
    },
    toggleBox: (state) => {
      state.open = !state.open;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    updateEmail: (state, action) =>{
      state.userInfo.email = action.payload
    },
    updatePoint: (state, action) =>{
      state.userInfo.point = action.payload
    },
    clearUserInfo: (state) =>{
      state.userInfo ={
      accessToken:"",
      refreshToken:"",
      account:"",
      email:"",
      userId:"",
      name:"",
      picture:"",
      phone:"",
      point:0
    }
    },
    setTokens: (state,action) => {
      state.userInfo.accessToken = action.payload.accessToken
      state.userInfo.refreshToken = action.payload.refreshToken
    },
    setLoginType:(state,action) =>{
      state.login = action.payload
    }
  },
});

export const { openBox,closeBox,toggleBox,setUserInfo,updateEmail,setLoginType,setTokens,clearUserInfo,updatePoint} = memberSlice.actions;
export default memberSlice.reducer;