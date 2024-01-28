import axios from "axios";
const backendServerURL = "http://localhost:4000/api/v1";
import {
  ISSUE_REGISTER_ERROR,
  ISSUE_REGISTER_SUCCESS,
  FETCH_INDIVIUAL_ISSUE_ERROR,
  FETCH_INDIVIUAL_ISSUE_SUCCESS,
  LOGIN_LOADING_ISSUE,
  FETCH_ALL_ISSUES_SUCCESS,
  FETCH_ALL_ISSUES_ERROR,
  UPDATE_ISSUE_ERROR,
  UPDATE_ISSUE_SUCCESS,
  FETCH_SPECIFIC_ISSUES_ERROR,
  FETCH_SPECIFIC_ISSUES_SUCCESS

} from "../constants/issueConstant";

export const registerNewIssues = (formValues, csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    // Include the CSRF token in the request headers for POST requests
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const registrationResponse = await axios.post(
      `${backendServerURL}/addissue`,
      formValues,
      {
        withCredentials: true,
        headers
      }
    );
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
      dispatch({ type: ISSUE_REGISTER_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: ISSUE_REGISTER_ERROR,
        payload: "An error occurred while registering",
      });
    }
  }
};
export const getAllIssues = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    // Include the CSRF token in the request headers for POST requests
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const fetchResponse = await axios.get(
      `${backendServerURL}/getallissues`,
      {
        withCredentials: true,
        headers
      }
    );
    if (fetchResponse.data) {
      dispatch({ type: FETCH_ALL_ISSUES_SUCCESS, payload: fetchResponse.data });
    } else {
      dispatch({
        type: FETCH_ALL_ISSUES_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: FETCH_ALL_ISSUES_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: FETCH_ALL_ISSUES_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}

export const getIndividualIssue = (csrfToken, isLoggedIn, issueId) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    // Include the CSRF token in the request headers for POST requests
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const fetchIndiviualResponse = await axios.get(
      `${backendServerURL}/getissuebyid/${issueId}`,
      {
        withCredentials: true,
        headers
      }
    );
    if (fetchIndiviualResponse.data) {
      dispatch({ type: FETCH_INDIVIUAL_ISSUE_SUCCESS, payload: fetchIndiviualResponse.data });
    } else {
      dispatch({
        type: FETCH_INDIVIUAL_ISSUE_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: FETCH_INDIVIUAL_ISSUE_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: FETCH_INDIVIUAL_ISSUE_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}
export const updateIssue = (csrfToken, isLoggedIn, issueId, formValues) => async (dispatch) => {

  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    // Include the CSRF token in the request headers for POST requests
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const updateResponse = await axios.put(
      `${backendServerURL}/updateissue/${issueId}`,
      formValues,
      {
        withCredentials: true,
        headers
      }
    );
    if (updateResponse.data) {
      dispatch({ type: UPDATE_ISSUE_SUCCESS, payload: updateResponse.data });
    } else {
      dispatch({
        type: UPDATE_ISSUE_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: UPDATE_ISSUE_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: UPDATE_ISSUE_ERROR,
        payload: "An error occurred while Updating data",
      });
    }
  }

}
export const getUserBasedIssues = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    // Include the CSRF token in the request headers for POST requests
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const fetchUserBasedIssuesResponse = await axios.get(
      `${backendServerURL}/getissuesbylogin`,
      {
        withCredentials: true,
        headers
      }
    );
    if (fetchUserBasedIssuesResponse.data) {
      dispatch({ type: FETCH_SPECIFIC_ISSUES_SUCCESS, payload: fetchUserBasedIssuesResponse.data });
    } else {
      dispatch({
        type: FETCH_SPECIFIC_ISSUES_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: FETCH_SPECIFIC_ISSUES_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: FETCH_SPECIFIC_ISSUES_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}
