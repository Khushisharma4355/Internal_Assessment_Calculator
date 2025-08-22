

// // // src/Redux/announcementSlice.js
// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import axios from 'axios';

// // export const fetchAnnouncements = createAsyncThunk(
// //   'announcement/fetchAnnouncements',
// //   async () => {
// //     const response = await axios.get('/api/announcements');
// //     return response.data;
// //   }
// // );

// // const announcementSlice = createSlice({
// //   name: 'announcement',
// //   initialState: {
// //     announcements: [],
// //     loading: false,
// //     error: null,
// //   },
// //   reducers: {
// //     createAnnouncement: (state, action) => {
// //       state.announcements.push(action.payload);
// //     },
// //     deleteAnnouncement: (state, action) => {
// //       state.announcements = state.announcements.filter(
// //         (a) => a.id !== action.payload
// //       );
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchAnnouncements.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchAnnouncements.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.announcements = action.payload;
// //       })
// //       .addCase(fetchAnnouncements.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message;
// //       });
// //   },
// // });

// // export const { createAnnouncement, deleteAnnouncement } = announcementSlice.actions;

// // export default announcementSlice.reducer;

// // // src/Redux/announcementSlice.js
// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // export const fetchAnnouncements = createAsyncThunk(
// //   "announcement/fetchAnnouncements",
// //   async () => {
// //     // 🔁 Mock announcements (return an array always)
// //     return new Promise((resolve) => {
// //       setTimeout(() => {
// //         resolve([]); // or add fake data here
// //       }, 500);
// //     });
// //   }
// // );

// // const announcementSlice = createSlice({
// //   name: "announcement",
// //   initialState: {
// //     announcements: [],
// //     loading: false,
// //     error: null,
// //   },
// //   reducers: {
// //     createAnnouncement: (state, action) => {
// //       state.announcements.push(action.payload);
// //     },
// //     deleteAnnouncement: (state, action) => {
// //       state.announcements = state.announcements.filter(
// //         (a) => a.id !== action.payload
// //       );
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchAnnouncements.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchAnnouncements.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.announcements = action.payload; // ✅ MUST be array
// //       })
// //       .addCase(fetchAnnouncements.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message;
// //       });
// //   },
// // });

// // export const { createAnnouncement, deleteAnnouncement } = announcementSlice.actions;
// // export default announcementSlice.reducer;
// // src/Redux/announcementSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// // Load initial data from localStorage
// const storedAnnouncements = localStorage.getItem('announcements');
// const initialState = {
//   announcements: storedAnnouncements ? JSON.parse(storedAnnouncements) : [],
// };

// const announcementSlice = createSlice({
//   name: 'announcement',
//   initialState,
//   reducers: {
//     setAnnouncements: (state, action) => {
//       state.announcements = action.payload;
//       localStorage.setItem('announcements', JSON.stringify(state.announcements));
//     },
//     createAnnouncement: (state, action) => {
//       state.announcements.push(action.payload);
//       localStorage.setItem('announcements', JSON.stringify(state.announcements));
//     },
//     deleteAnnouncement: (state, action) => {
//       state.announcements = state.announcements.filter(
//         (ann) => ann.id !== action.payload
//       );
//       localStorage.setItem('announcements', JSON.stringify(state.announcements));
//     },
//   },
// });

// export const {
//   setAnnouncements,
//   createAnnouncement,
//   deleteAnnouncement,
// } = announcementSlice.actions;

// export default announcementSlice.reducer;
