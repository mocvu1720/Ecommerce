import axios from "axios";
import { setError, shippingAddressAdd, clearOrder } from "../slices/order";

export const setShippingAddress = (data) => async (dispatch) => {
  dispatch(shippingAddressAdd(data));
};

export const setShippingAddressError = (value) => async (dispatch) => {
  dispatch(setError(value));
};

export const createOrder = (order) => async (dispatch, getState) => {
  const {
    order: { shippingAddress },
    user: { userInfo },
  } = getState();

  const preparedOrder = { ...order, shippingAddress };

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`https://${process.env.REACT_APP_API_HOST}/api/orders`, preparedOrder, config);
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : "An unexpected error occurred. Please try again later."
      )
    );
  }
};

export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder());
};
