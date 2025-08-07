import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './loginSlice'
import announcementReducer from './announcementSlice'; // Import the announcement reducer
export const store=configureStore({
    reducer:{
        login:loginReducer,
        announcement: announcementReducer, // add announcement
    }
})