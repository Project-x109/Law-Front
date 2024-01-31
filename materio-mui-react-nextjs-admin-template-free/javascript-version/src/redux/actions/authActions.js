import axios from "axios";

const backendServerURL = "http://localhost:4000";

import {
  REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_ERROR, LOGIN_SUCCESS, FORGOT_SUCCESS, FORGOT_ERROR, RESET_SUCCESS, RESET_ERROR,
  LOGIN_LOADING, PROFILE_ERROR, PROFILE_SUCCESS, CSRF_ERROR, CSRF_SUCCESS, LOGOUT_ERROR, LOGOUT_SUCCESS, REGISTER_EMPLOYEE_SUCCESS,
  REGISTER_EMPLOYEE_ERROR, LISTS_OF_USERS_ERROR, LISTS_OF_USERS_SUCCESS, CHANGE_OLD_PSSSWORD_ERROR, CHANGE_OLD_PSSSWORD_SUCCESS,
  CLEAR_SUCCESS_MESSAGE, CHANGE_NEW_USER_PSSSWORD_ERROR, CHANGE_NEW_USER_PSSSWORD_SUCCESS, LISTS_OF_DEACTIVATED_USERS_ERROR,
  LISTS_OF_DEACTIVATED_USERS_SUCCESS, UPDATE_USER_STATUS_ERROR, UPDATE_USER_STATUS_SUCCESS
} from "../constants/authconstant";



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
      `${backendServerURL}/api/v1/resetpassword`,
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
export const ResetPasswordAction = (ResetpasswordData, csrfToken) => async (dispatch) => {

  try {
    dispatch({ type: LOGIN_LOADING });
    const headers = {
      "X-CSRF-Token": csrfToken,
    };

    const resetpasswordResponse = await axios.put(
      `${backendServerURL}/api/v1/resetpassword/${ResetpasswordData.token}`,
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

export const changeOldPassword = (values, csrfToken, isLoggedIn) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });

    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const changeOldPasswordResponse = await axios.put(
      `${backendServerURL}/api/v1/changepassword`,
      values,
      {
        withCredentials: true,
        headers
      }
    );
    if (changeOldPasswordResponse.data) {
      dispatch({ type: CHANGE_OLD_PSSSWORD_SUCCESS, payload: changeOldPasswordResponse.data });
    } else {
      dispatch({
        type: CHANGE_OLD_PSSSWORD_ERROR,
        payload: "Invalid response from the server",
      });
    }

  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: CHANGE_OLD_PSSSWORD_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: CHANGE_OLD_PSSSWORD_ERROR,
        payload: "An error occurred while Changing password",
      });
    }
  }
}

export const changeNewUserPassword = (values, csrfToken, isLoggedIn) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });

    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const changeNewPasswordResponse = await axios.put(
      `${backendServerURL}/api/v1/changenewuserpassword`,
      values,
      {
        withCredentials: true,
        headers
      }
    );
    if (changeNewPasswordResponse.data) {
      dispatch({ type: CHANGE_NEW_USER_PSSSWORD_SUCCESS, payload: changeNewPasswordResponse.data });
    } else {
      dispatch({
        type: CHANGE_NEW_USER_PSSSWORD_ERROR,
        payload: "Invalid response from the server",
      });
    }

  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: CHANGE_NEW_USER_PSSSWORD_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: CHANGE_NEW_USER_PSSSWORD_ERROR,
        payload: "An error occurred while Changing password",
      });
    }
  }
}
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

export const allDeactivatedUsers = (csrfToken, isLoggedIn) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const listOfDeactivatedUsersResponse = await axios.get(
      `${backendServerURL}/api/v1/deactivated-users`,
      {
        withCredentials: true,
        headers
      }
    );
    if (listOfDeactivatedUsersResponse.data) {
      dispatch({ type: LISTS_OF_DEACTIVATED_USERS_SUCCESS, payload: listOfDeactivatedUsersResponse.data });
    } else {
      dispatch({
        type: LISTS_OF_DEACTIVATED_USERS_ERROR,
        payload: "Invalid response from the server",
      });
    }
  }
  catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: LISTS_OF_DEACTIVATED_USERS_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: LISTS_OF_DEACTIVATED_USERS_ERROR,
        payload: "An error occurred while displaying the user",
      });
    }
  }
}
export const updateStatus = (all, csrfToken, isLoggedIn) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING });
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const updateUsersResponse = await axios.put(
      `${backendServerURL}/api/v1/change-account-status`,
      all,
      {
        withCredentials: true,
        headers
      }
    );
    if (updateUsersResponse.data) {
      dispatch({ type: UPDATE_USER_STATUS_SUCCESS, payload: updateUsersResponse.data });
    } else {
      dispatch({
        type: UPDATE_USER_STATUS_ERROR,
        payload: "Invalid response from the server",
      });
    }
  }
  catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: UPDATE_USER_STATUS_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: UPDATE_USER_STATUS_ERROR,
        payload: "An error occurred while updating the user",
      });
    }
  }
}

export const clearSuccessMessage = () => async (dispatch) => {
  dispatch({ type: CLEAR_SUCCESS_MESSAGE, })
};
