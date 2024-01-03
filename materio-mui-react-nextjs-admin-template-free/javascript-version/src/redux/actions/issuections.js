import axios from "axios";
const backendServerURL = "http://localhost:4000";
import { ISSUE_REGISTER_ERROR, ISSUE_REGISTER_SUCCESS } from "../constants/issueConstant";
import { LOGIN_LOADING } from "../constants/authconstant";

export const registerNewIssues = (formValues, csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  console.log(formValues);
  try {
    // Include the CSRF token in the request headers for POST requests
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const registrationResponse = await axios.post(
      `${backendServerURL}/api/v1/addissue`,
      formValues,
      {
        withCredentials: true,
        headers
      }
    );
    console.log(registrationResponse.data);
    if (registrationResponse.data) {
      dispatch({ type: ISSUE_REGISTER_SUCCESS, payload: registrationResponse.data });
    } else {
      dispatch({
        type: ISSUE_REGISTER_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
      dispatch({ type: ISSUE_REGISTER_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: ISSUE_REGISTER_ERROR,
        payload: "An error occurred while registering",
      });
    }
  }
};
