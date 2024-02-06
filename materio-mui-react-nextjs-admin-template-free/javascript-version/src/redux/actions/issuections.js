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
  FETCH_SPECIFIC_ISSUES_SUCCESS,
  CHANGE_ISSUE_STATUS_ERROR,
  CHANGE_ISSUE_STATUS_SUCCESS,
  GET_RECENT_ACTIVITIES_ERROR,
  GET_RECENT_ACTIVITIES_SUCCESS,
  GET_USER_SPECIFIC_RECENT_ACTIVITY_SUCCESS,
  GET_USER_SPECIFIC_RECENT_ACTIVITY_ERROR,
  GET_USER_DASHBOARD_SUMMERY_SUCCESS,
  GET_USER_DASHBOARD_SUMMERY_ERROR,
  GET_ADMIN_DASHBOARD_SUMMERY_ERROR,
  GET_ADMIN_DASHBOARD_SUMMERY_SUCCESS,
  GET_TOTAL_ISSUE_BY_USER_ERROR,
  GET_TOTAL_ISSUE_BY_USER_SUCCESS,
  GET_ALL_USER_PERFORMAANCE_ERROR,
  GET_ALL_USER_PERFORMAANCE_SUCCESS,
  GET_WEEKELY_REVIEW_ERROR,
  GET_WEEKELY_REVIEW_SUCCESS,
  GET_ISSUE_LEVEL_COUNT_ERROR,
  GET_ISSUE_LEVEL_COUNT_SUCCESS,
  GET_DEPARTMENT_WISE_ANALYSIS_ERROR,
  GET_DEPARTMENT_WISE_ANALYSIS_SUCCESS

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
export const updateStatus = (all, csrfToken, isLoggedIn) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_LOADING_ISSUE });
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const updateStatusResponse = await axios.put(
      `${backendServerURL}/changeissuestatus`,
      all,
      {
        withCredentials: true,
        headers
      }
    );
    if (updateStatusResponse.data) {
      dispatch({ type: CHANGE_ISSUE_STATUS_SUCCESS, payload: updateStatusResponse.data });
    } else {
      dispatch({
        type: CHANGE_ISSUE_STATUS_ERROR,
        payload: "Invalid response from the server",
      });
    }
  }
  catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: CHANGE_ISSUE_STATUS_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: CHANGE_ISSUE_STATUS_ERROR,
        payload: "An error occurred while updating the issue",
      });
    }
  }
}

export const getRecentActivities = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const fetchLatestActivitiesResponse = await axios.get(
      `${backendServerURL}/getRecentActivities`,
      {
        withCredentials: true,
        headers
      }
    );
    if (fetchLatestActivitiesResponse.data) {
      dispatch({ type: GET_RECENT_ACTIVITIES_SUCCESS, payload: fetchLatestActivitiesResponse.data });
    } else {
      dispatch({
        type: GET_RECENT_ACTIVITIES_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: GET_RECENT_ACTIVITIES_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: GET_RECENT_ACTIVITIES_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}

export const getRecentActivity = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const fetchLatestActivityResponse = await axios.get(
      `${backendServerURL}/getrecentactivity`,
      {
        withCredentials: true,
        headers
      }
    );
    if (fetchLatestActivityResponse.data) {
      dispatch({ type: GET_USER_SPECIFIC_RECENT_ACTIVITY_SUCCESS, payload: fetchLatestActivityResponse.data });
    } else {
      dispatch({
        type: GET_USER_SPECIFIC_RECENT_ACTIVITY_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: GET_USER_SPECIFIC_RECENT_ACTIVITY_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: GET_USER_SPECIFIC_RECENT_ACTIVITY_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}

export const getUserDashboardSummary = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const getuserdashboardsummaryResponse = await axios.get(
      `${backendServerURL}/getuserdashboardsummary`,
      {
        withCredentials: true,
        headers
      }
    );
    if (getuserdashboardsummaryResponse.data) {
      dispatch({ type: GET_USER_DASHBOARD_SUMMERY_SUCCESS, payload: getuserdashboardsummaryResponse.data });
    } else {
      dispatch({
        type: GET_USER_DASHBOARD_SUMMERY_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: GET_USER_DASHBOARD_SUMMERY_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: GET_USER_DASHBOARD_SUMMERY_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}

export const getDashboardSummary = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const getdashboardsummaryResponse = await axios.get(
      `${backendServerURL}/getdashboardsummery`,
      {
        withCredentials: true,
        headers
      }
    );
    if (getdashboardsummaryResponse.data) {
      dispatch({ type: GET_ADMIN_DASHBOARD_SUMMERY_SUCCESS, payload: getdashboardsummaryResponse.data });
    } else {
      dispatch({
        type: GET_ADMIN_DASHBOARD_SUMMERY_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: GET_ADMIN_DASHBOARD_SUMMERY_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: GET_ADMIN_DASHBOARD_SUMMERY_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}
export const getTotalIssuesByUser = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const getTotalIssueByUserResponse = await axios.get(
      `${backendServerURL}/total-issues-by-user`,
      {
        withCredentials: true,
        headers
      }
    );
    if (getTotalIssueByUserResponse.data) {
      dispatch({ type: GET_TOTAL_ISSUE_BY_USER_SUCCESS, payload: getTotalIssueByUserResponse.data });
    } else {
      dispatch({
        type: GET_TOTAL_ISSUE_BY_USER_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: GET_TOTAL_ISSUE_BY_USER_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: GET_TOTAL_ISSUE_BY_USER_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}
export const getAllUserPerformances = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };

    const getAllUserPerformanceResponse = await axios.get(
      `${backendServerURL}/getalluserperformances`,
      {
        withCredentials: true,
        headers
      }
    );
    if (getAllUserPerformanceResponse.data) {
      dispatch({ type: GET_ALL_USER_PERFORMAANCE_SUCCESS, payload: getAllUserPerformanceResponse.data });
    } else {
      dispatch({
        type: GET_ALL_USER_PERFORMAANCE_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: GET_ALL_USER_PERFORMAANCE_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: GET_ALL_USER_PERFORMAANCE_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}

export const getWeeklyReview = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const getWeeklyResponse = await axios.get(
      `${backendServerURL}/get-weekly-review`,
      {
        withCredentials: true,
        headers
      }
    );
    console.log(getWeeklyResponse.data)
    if (getWeeklyResponse.data) {
      dispatch({ type: GET_WEEKELY_REVIEW_SUCCESS, payload: getWeeklyResponse.data });
    } else {
      dispatch({
        type: GET_WEEKELY_REVIEW_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: GET_WEEKELY_REVIEW_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: GET_WEEKELY_REVIEW_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}

export const getIssueLevelCounts = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const getIssueLevelCountResponse = await axios.get(
      `${backendServerURL}/priority-issues`,
      {
        withCredentials: true,
        headers
      }
    );
    if (getIssueLevelCountResponse.data) {
      dispatch({ type: GET_ISSUE_LEVEL_COUNT_SUCCESS, payload: getIssueLevelCountResponse.data });
    } else {
      dispatch({
        type: GET_ISSUE_LEVEL_COUNT_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: GET_ISSUE_LEVEL_COUNT_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: GET_ISSUE_LEVEL_COUNT_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}

export const getDepartmentWiseAnalysis = (csrfToken, isLoggedIn) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING_ISSUE });
  try {
    const headers = {
      'Authorization': `${isLoggedIn}`,
      "X-CSRF-Token": csrfToken,
    };
    const getDepartmentWiseResponse = await axios.get(
      `${backendServerURL}/get-department-wise-analyis`,
      {
        withCredentials: true,
        headers
      }
    );
    if (getDepartmentWiseResponse.data) {
      dispatch({ type: GET_DEPARTMENT_WISE_ANALYSIS_SUCCESS, payload: getDepartmentWiseResponse.data });
    } else {
      dispatch({
        type: GET_DEPARTMENT_WISE_ANALYSIS_ERROR,
        payload: "Invalid response from the server",
      });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({ type: GET_DEPARTMENT_WISE_ANALYSIS_ERROR, payload: error.response.data });
    } else {
      dispatch({
        type: GET_DEPARTMENT_WISE_ANALYSIS_ERROR,
        payload: "An error occurred while Feching data",
      });
    }
  }
}
