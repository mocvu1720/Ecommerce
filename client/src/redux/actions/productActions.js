import axios from "axios";

import { setProducts, setLoading, setError, setProduct, productReviewed, resetError } from "../slices/products";

export const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`https://${process.env.REACT_APP_API_HOST}/api/products`);
    dispatch(setProducts(data));
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

export const getProduct = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`https://${process.env.REACT_APP_API_HOST}/api/products/${id}`);
    dispatch(setProduct(data));
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

export const createProductReview = (productId, userId, comment, rating, title) => async (dispatch, getState) => {
  dispatch(setLoading(true));

  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `https://${process.env.REACT_APP_API_HOST}/api/products/reviews/${productId}`,
      { comment, userId, rating, title },
      config
    );
    dispatch(productReviewed());
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

export const resetProductError = () => (dispatch) => {
  dispatch(resetError());
};
