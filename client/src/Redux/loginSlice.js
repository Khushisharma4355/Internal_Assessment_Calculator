import {createSlice} from '@reduxjs/toolkit';
const loginSlice=createSlice({
    name:"login",
    initialState:{
        email:"",
        emailExists:null    }
,
reducers:{
    setEmail:(state,action)=>{
        state.email=action.payload;
    },
    setEmailExists:(state,action)=>{
        state.emailExists=action.payload;
    },
},

})
export const {setEmail,setEmailExists}=loginSlice.actions;
export default loginSlice.reducer;