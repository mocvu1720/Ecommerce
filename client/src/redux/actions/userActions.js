import axios from "axios";
import {
  setLoading,
  setError,
  userLogin,
  userLogout,
  updateUserProfile,
  resetUpdate,
  setUserOrders,
} from "../slices/user";

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://${process.env.REACT_APP_API_HOST}/api/users/login`,
      { email, password },
      config
    );
    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
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

export const logout = () => (dispatch) => {
  dispatch(resetUpdate());
  localStorage.removeItem("userInfo");
  dispatch(userLogout());
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `https://${process.env.REACT_APP_API_HOST}/api/users/register`,
      { name, email, password },
      config
    );
    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
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

export const updateProfile = (id, name, email, password) => async (dispatch, getState) => {
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
    const { data } = await axios.put(
      `https://${process.env.REACT_APP_API_HOST}/api/users/profile/${id}`,
      { _id: id, name, email, password },
      config
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(updateUserProfile(data));
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

export const resetUpdateSuccess = () => (dispatch) => {
  dispatch(resetUpdate());
};

export const getUserOrders = () => async (dispatch, getState) => {
  const {
    user: { userInfo },
  } = getState();
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`https://${process.env.REACT_APP_API_HOST}/api/users/${userInfo._id}`, config);
    dispatch(setUserOrders(data));
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
