// Redux/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: "login",
    initialState: {
        email: "",
        emailExists: null,
        isAuthenticated: false // Add this new field
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
            state.isAuthenticated = !!action.payload; // Auto-set auth status
        },
        setEmailExists: (state, action) => {
            state.emailExists = action.payload;
        },
        // Add this new reducer for complete logout
        resetAuthState: (state) => {
            state.email = "";
            state.emailExists = null;
            state.isAuthenticated = false;
        }
    },
});

export const { setEmail, setEmailExists, resetAuthState } = loginSlice.actions;
export default loginSlice.reducer;