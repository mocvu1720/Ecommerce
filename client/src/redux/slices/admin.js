import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userList: null,
  userRemoval: false,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    getUsers: (state, { payload }) => {
      state.loading = false;
      state.userList = payload;
      state.error = null;
    },
    userDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = true;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = null;
      state.userRemoval = false;
    },
  },
});

export const { setLoading, setError, getUsers, userDelete, resetError } = adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
