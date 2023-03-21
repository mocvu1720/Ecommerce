import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  userList: null,
  orders: null,
  userRemoval: false,
  orderRemoval: false,
  deliveredFlag: false,
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
    getOrders: (state, { payload }) => {
      state.orders = payload;
      state.loading = false;
      state.error = null;
    },
    userDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = true;
    },
    orderDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.orderRemoval = true;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = null;
      state.userRemoval = false;
      state.deliveredFlag = false;
      state.orderRemoval = false;
    },
    setDeliveredFlag: (state) => {
      state.deliveredFlag = true;
      state.loading = false;
    },
  },
});

export const { setLoading, setError, getUsers, userDelete, resetError, getOrders, orderDelete, setDeliveredFlag } =
  adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;
