import axios from "axios";

const backendServerURL = "http://localhost:4000";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const FORGOT_SUCCESS = "FORGOT_SUCCESS";
export const FORGOT_ERROR = "FORGOT_ERROR";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const RESET_ERROR = "RESET_ERROR";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const PROFILE_ERROR = "PROFILE_ERROR";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const CSRF_ERROR = "CSRF_ERROR";
export const CSRF_SUCCESS = "CSRF_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_EMPLOYEE_SUCCESS = "REGISTER_EMPLOYEE_SUCCESS";
export const REGISTER_EMPLOYEE_ERROR = "REGISTER_EMPLOYEE_ERROR";
export const LISTS_OF_USERS_ERROR = "LISTS_OF_USERS_ERROR";
export const LISTS_OF_USERS_SUCCESS = "LISTS_OF_USERS_SUCCESS"



export const register = (userData, csrfToken) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    // Include the CSRF token in the request headers for POST requests
    const headers = {
      "X-CSRF-Token": csrfToken,
    };

    const registrationResponse = await axios.post(
      `${backendServerURL}/user/register`,
      userData,
      {
        withCredentials: true,
        headers
      }
    );

    if (registrationResponse.data) {
      dispatch({ type: REGISTER_SUCCESS, payload: registrationResponse.data });
    } else {
      dispatch({
        type: REGISTER_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: REGISTER_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: REGISTER_ERROR,
        payload: "An error occurred while registering",
      });
    }
  }
};
export const registerEmployee = (formValues, csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    // Include the CSRF token in the request headers for POST requests
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const registrationResponse = await axios.post(
      `${backendServerURL}/api/v1/registeremployee`,
      formValues,
      {
        withCredentials: true,
        headers
      }
    );
    if (registrationResponse.data) {
      dispatch({ type: REGISTER_EMPLOYEE_SUCCESS, payload: registrationResponse.data });
    } else {
      dispatch({
        type: REGISTER_EMPLOYEE_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: REGISTER_EMPLOYEE_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: REGISTER_EMPLOYEE_ERROR,
        payload: "An error occurred while registering",
      });
    }
  }
};
export const getCsrf = () => async (dispatch) => {
  try {
    const csrfResponse = await axios.get(
      `${backendServerURL}/get-csrf-token`,
      {
        withCredentials: true,
      }
    );
    if (csrfResponse.data) {
      dispatch({ type: CSRF_SUCCESS, payload: csrfResponse?.data });
    } else {
      dispatch({
        type: CSRF_ERROR,
        payload: "Invalid response from the server",
      });
    }

  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: CSRF_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: CSRF_ERROR,
        payload: "An error occurred while generating the CSRF",
      });
    }
  }
}
export const login = (loginData, csrfToken) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });
    const headers = {
      "X-CSRF-Token": csrfToken,
    };

    const loginResponse = await axios.post(
      `${backendServerURL}/api/v1/login`,
      loginData,
      {
        withCredentials: true,
        headers
      }
    );
    if (loginResponse.data.success) {
      localStorage.setItem('isLoggedIn', loginResponse.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: loginResponse?.data });
    } else {

      dispatch({
        type: LOGIN_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: LOGIN_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: LOGIN_ERROR,
        payload: "An error occurred while logging in",
      });
    }
  }
};

export const logout = (csrfToken) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });
    const headers = {
      "X-CSRF-Token": csrfToken,
    };

    const logouResponse = await axios.get(
      `${backendServerURL}/api/v1/logout`,
      {
        withCredentials: true,
        headers
      }
    );
    console.log(logouResponse.data)
    if (logouResponse.data) {
      localStorage.removeItem("isLoggedIn");
      dispatch({ type: LOGOUT_SUCCESS, payload: logouResponse?.data });
    } else {
      dispatch({
        type: LOGOUT_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: LOGOUT_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: LOGOUT_ERROR,
        payload: "An error occurred while logging in",
      });
    }
  }
}

export const forgetpassword = (forgetpasswordData, csrfToken) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });
    const headers = {
      "X-CSRF-Token": csrfToken,
    };

    const forgetpasswordResponse = await axios.post(
      `${backendServerURL}/user/resetpassword`,
      forgetpasswordData,
      {
        withCredentials: true,
        headers
      }
    );
    if (forgetpasswordResponse.data) {
      dispatch({ type: FORGOT_SUCCESS, payload: forgetpasswordResponse.data });
    } else {
      dispatch({
        type: FORGOT_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: FORGOT_ERROR, payload: error.response.data });

    } else {
      dispatch({
        type: FORGOT_ERROR,
        payload: "An error occurred",
      });
    }
  }

};
export const ResetPasswordAction = (ResetpasswordData, csrfToken, token) => async (dispatch) => {

  try {
    dispatch({ type: LOGIN_LOADING });
    const headers = {
      "X-CSRF-Token": csrfToken,
    };

    const resetpasswordResponse = await axios.put(
      `${backendServerURL}/user/resetpassword/${token}`,
      ResetpasswordData,
      {
        withCredentials: true,
        headers
      }
    );
    if (resetpasswordResponse.data) {
      dispatch({ type: RESET_SUCCESS, payload: resetpasswordResponse.data });
    } else {
      dispatch({
        type: RESET_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: RESET_ERROR, payload: error.response.data });

    } else {
      dispatch({
        type: RESET_ERROR,
        payload: "An error occurred",
      });
    }
  }

};
export const profile = (csrfToken, isLoggedIn) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const profileResponse = await axios.get(
      `${backendServerURL}/api/v1/profile`,
      {
        withCredentials: true,
        headers
      }
    );

    if (profileResponse.data) {
      dispatch({ type: PROFILE_SUCCESS, payload: profileResponse.data });
    } else {
      dispatch({
        type: PROFILE_ERROR,
        payload: "Invalid response from the server",
      });
    }

  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: PROFILE_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: PROFILE_ERROR,
        payload: "An error occurred while displaying the user",
      });
    }
  }
};

export const allUsers = (csrfToken, isLoggedIn) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const listOfUsersResponse = await axios.get(
      `${backendServerURL}/api/v1/all-users`,
      {
        withCredentials: true,
        headers
      }
    );
    if (listOfUsersResponse.data) {
      dispatch({ type: LISTS_OF_USERS_SUCCESS, payload: listOfUsersResponse.data });
    } else {
      dispatch({
        type: LISTS_OF_USERS_ERROR,
        payload: "Invalid response from the server",
      });
    }
  }
  catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: LISTS_OF_USERS_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: LISTS_OF_USERS_ERROR,
        payload: "An error occurred while displaying the user",
      });
    }
  }
}

