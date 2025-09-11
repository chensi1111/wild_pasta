import { createSlice } from '@reduxjs/toolkit';

const reserveSlice = createSlice({
  name: 'reserve',
  initialState: { open: false,info:{date:'--',time:'--',people:0,remark:"",theme:{id:"",name:"",},} },
  reducers: {
    openBox: (state) => {
      state.open=true
    },
    closeBox: (state) => {
      state.open =false;
    },
    setInfo: (state,actions) =>{
      state.info.date = actions.payload.date;
      state.info.time = actions.payload.time;
      state.info.people = actions.payload.people;
      state.info.remark = actions.payload.remark;
      state.info.theme = actions.payload.theme;
    }
   
  },
});

export const { openBox,closeBox,setInfo } = reserveSlice.actions;
export default reserveSlice.reducer;