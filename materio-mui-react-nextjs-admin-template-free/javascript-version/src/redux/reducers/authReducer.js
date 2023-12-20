import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_EMPLOYEE_ERROR,
  REGISTER_EMPLOYEE_SUCCESS,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  FORGOT_ERROR,
  FORGOT_SUCCESS,
  RESET_ERROR,
  RESET_SUCCESS,
  LOGIN_LOADING,
  PROFILE_ERROR,
  PROFILE_SUCCESS,
  CSRF_ERROR,
  CSRF_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  LISTS_OF_USERS_SUCCESS,
  LISTS_OF_USERS_ERROR
} from "../actions/authActions";

const initialState = {
  user: null,
  usersLists: null,
  successMessage: null,
  error: null,
  csrfToken: null,
  loggedin: false,
  loading: false,
  userRole: null,

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CSRF_ERROR:
      return {
        ...state,
        user: null,
        successMessage: null,
        error: action.payload,
        csrfToken: null,
        loading: false,
      }
    case CSRF_SUCCESS:
      return {
        ...state,
        user: action.payload.username,
        successMessage: action.payload.success,
        error: null,
        csrfToken: action.payload.csrfToken,
        loading: false,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        successMessage: action.payload.message,
        error: null,
        loading: false

      };
    case REGISTER_ERROR:
      return {
        ...state,
        user: null,
        successMessage: null,
        error: action.payload,
        loading: false
      };
    case REGISTER_EMPLOYEE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        userRole: 'admin',
        successMessage: action.payload,
        error: null,
        loading: false,
      }
    case REGISTER_EMPLOYEE_ERROR:
      return {
        ...state,
        user: action.payload.user,
        userRole: 'admin',
        successMessage: null,
        error: action.payload,
        loading: false
      }
    case LOGIN_LOADING:
      return {
        ...state,
        error: null,
        loading: true,
        successMessage: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        successMessage: action.payload.success,
        error: null,
        loggedin: true,
        loading: false,
        csrfToken: action.payload.csrfToken,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        successMessage: null,
        error: action.payload,
        csrfToken: null,
        loggedin: false,
        loading: false,
      };
    case FORGOT_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
        error: null,
        loading: false,
        csrfToken: action.payload.csrfToken,
      };
    case FORGOT_ERROR:
      return {
        ...state,
        successMessage: null,
        error: action.payload,
        loading: false,
        csrfToken: null
      };
    case RESET_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
        error: null,
        loading: false,
        csrfToken: action.payload.csrfToken,
      };
    case RESET_ERROR:
      return {
        ...state,
        successMessage: null,
        error: action.payload,
        csrfToken: null,
        loading: false
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        user: null,
        loading: false
      };
    case LISTS_OF_USERS_SUCCESS:
      return {
        ...state,
        usersLists: action.payload.users,
        successMessage: action.payload.success,
        error: null

      }
    case LISTS_OF_USERS_ERROR:
      return {
        ...state,
        usersLists: [],
        error: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        successMessage: action.payload.message,
        error: null
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        successMessage: null,
        error: action.payload
      }
    default:
      return state;
  }
};

export { authReducer };
