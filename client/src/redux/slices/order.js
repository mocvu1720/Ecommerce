import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  shippingAddress: null,
  order: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    shippingAddressAdd: (state, { payload }) => {
      state.shippingAddress = payload;
      state.loading = false;
    },
    clearOrder: (state) => {
      state = initialState;
    },
  },
});

export const { setLoading, setError, shippingAddressAdd, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

export const orderSelector = (state) => state.order;
