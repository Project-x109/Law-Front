import {
        ISSUE_REGISTER_ERROR,
        LOGIN_LOADING_ISSUE,
        ISSUE_REGISTER_SUCCESS,
        FETCH_ALL_ISSUES_ERROR,
        FETCH_ALL_ISSUES_SUCCESS,
        FETCH_INDIVIUAL_ISSUE_ERROR,
        FETCH_INDIVIUAL_ISSUE_SUCCESS,
        UPDATE_ISSUE_ERROR,
        UPDATE_ISSUE_SUCCESS


      } from "../constants/issueConstant";

const initialState = {
  successMessage: null,
  error: null,
  loading: false,
  issues: null,
  issue: null
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
      return{
        ...state,
        successMessage:action.payload,
        loading:false
      }
    case UPDATE_ISSUE_ERROR:
      return{
        ...state,
        error:action.payload,
        loading:false
      }
    default: {
      return state
    }
  }
}

export { issueReducer };
