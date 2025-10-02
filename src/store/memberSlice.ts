import { createSlice } from '@reduxjs/toolkit';

const memberSlice = createSlice({
  name: 'member',
  initialState: {
    open: false,
    login: false,
    userInfo:{
      accessToken:"",
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
      account:"",
      email:"",
      userId:"",
      name:"",
      picture:"",
      phone:"",
      point:0
    }
    },
    setLoginType:(state,action) =>{
      state.login = action.payload
    }
  },
});

export const { openBox,closeBox,toggleBox,setUserInfo,updateEmail,setLoginType,clearUserInfo,updatePoint} = memberSlice.actions;
export default memberSlice.reducer;