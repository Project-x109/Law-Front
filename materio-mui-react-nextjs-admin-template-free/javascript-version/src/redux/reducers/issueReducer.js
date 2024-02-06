import {
  ISSUE_REGISTER_ERROR,
  LOGIN_LOADING_ISSUE,
  ISSUE_REGISTER_SUCCESS,
  FETCH_ALL_ISSUES_ERROR,
  FETCH_ALL_ISSUES_SUCCESS,
  FETCH_INDIVIUAL_ISSUE_ERROR,
  FETCH_INDIVIUAL_ISSUE_SUCCESS,
  UPDATE_ISSUE_ERROR,
  UPDATE_ISSUE_SUCCESS,
  FETCH_SPECIFIC_ISSUES_ERROR,
  FETCH_SPECIFIC_ISSUES_SUCCESS,
  CHANGE_ISSUE_STATUS_ERROR,
  CHANGE_ISSUE_STATUS_SUCCESS,
  GET_RECENT_ACTIVITIES_ERROR,
  GET_RECENT_ACTIVITIES_SUCCESS,
  GET_USER_SPECIFIC_RECENT_ACTIVITY_ERROR,
  GET_USER_SPECIFIC_RECENT_ACTIVITY_SUCCESS,
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

import { CLEAR_SUCCESS_MESSAGE } from "../constants/authconstant";
const initialState = {
  successMessage: null,
  error: null,
  loading: false,
  issues: null,
  issue: null,
  userSpecificIssue: null,
  activities: null,
  activity: null,
  userSummery: null,
  adminSummery: null,
  totalIssueByUser: null,
  userPerformance: null,
  weeklyReview: null,
  issueLevelCount: null,
  departementAnalysis: null
};

const issueReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_LOADING_ISSUE:
      return {
        ...state,
        error: null,
        loading: true,
        successMessage: null,
      };
    case ISSUE_REGISTER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        successMessage: null,
      }
    case ISSUE_REGISTER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        successMessage: action.payload,
      }
    case FETCH_ALL_ISSUES_SUCCESS:
      return {
        ...state,
        successMessage: action.payload.message,
        issues: action.payload.lawIssues,
        loading: false,
      }
    case FETCH_ALL_ISSUES_ERROR:
      return {
        ...state,
        error: action.payloads,
        loading: false,
      }
    case FETCH_INDIVIUAL_ISSUE_SUCCESS:
      return {
        ...state,
        issue: action.payload.lawIssue,
        loading: false
      }
    case FETCH_INDIVIUAL_ISSUE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case UPDATE_ISSUE_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
        loading: false
      }
    case UPDATE_ISSUE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case FETCH_SPECIFIC_ISSUES_SUCCESS:
      return {
        ...state,
        userSpecificIssue: action.payload.issues,
        loading: false
      }
    case FETCH_SPECIFIC_ISSUES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case CHANGE_ISSUE_STATUS_SUCCESS:
      const updatedIssueId = action.payload.lawIssue._id;
      const updatedIssues = state.userSpecificIssue.map(issue =>
        issue._id === updatedIssueId ? action.payload.lawIssue : issue
      );
      return {
        ...state,
        userSpecificIssue: updatedIssues,
        successMessage: action.payload,
        loading: null
      };

    case CHANGE_ISSUE_STATUS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    case GET_RECENT_ACTIVITIES_SUCCESS:
      return {
        ...state,
        successMessage: null,
        activities: action.payload.recentActivities,
        loading: null
      }
    case GET_RECENT_ACTIVITIES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    case GET_USER_SPECIFIC_RECENT_ACTIVITY_SUCCESS:
      return {
        ...state,
        successMessage: null,
        activity: action.payload.recentActivities,
        loading: null
      }
    case GET_USER_SPECIFIC_RECENT_ACTIVITY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    case GET_USER_DASHBOARD_SUMMERY_SUCCESS:
      return {
        ...state,
        successMessage: null,
        userSummery: action.payload.summary,
        loading: null
      }
    case GET_USER_DASHBOARD_SUMMERY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    case GET_ADMIN_DASHBOARD_SUMMERY_SUCCESS:
      return {
        ...state,
        successMessage: null,
        adminSummery: action.payload.summary,
        loading: null
      }
    case GET_ADMIN_DASHBOARD_SUMMERY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        error: null,
        successMessage: null
      }
    case GET_TOTAL_ISSUE_BY_USER_SUCCESS:
      return {
        ...state,
        successMessage: null,
        totalIssueByUser: action.payload.data,
        loading: null
      }
    case GET_TOTAL_ISSUE_BY_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null,
      }
    case GET_ALL_USER_PERFORMAANCE_SUCCESS:
      return {
        ...state,
        successMessage: null,
        userPerformances: action.payload.topUserPerformances,
        loading: null,
      }
    case GET_ALL_USER_PERFORMAANCE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    case GET_WEEKELY_REVIEW_SUCCESS:
      return {
        ...state,
        successMessage: null,
        weeklyReview: action.payload.weeklyReview,
        loading: null
      }
    case GET_WEEKELY_REVIEW_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    case GET_ISSUE_LEVEL_COUNT_SUCCESS:
      return {
        ...state,
        successMessage: null,
        issueLevelCount: action.payload.counts,
        loading: null
      }
    case GET_ISSUE_LEVEL_COUNT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    case GET_DEPARTMENT_WISE_ANALYSIS_SUCCESS:
      return {
        ...state,
        successMessage: null,
        departementAnalysis: action.payload.data,
        loading: null
      }
    case GET_DEPARTMENT_WISE_ANALYSIS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    default: {
      return state
    }
  }
}

export { issueReducer };
