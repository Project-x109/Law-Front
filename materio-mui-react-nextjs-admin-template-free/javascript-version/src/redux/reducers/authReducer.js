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
  LISTS_OF_USERS_ERROR,
  CHANGE_OLD_PSSSWORD_ERROR,
  CHANGE_OLD_PSSSWORD_SUCCESS,
  CLEAR_SUCCESS_MESSAGE,
  CHANGE_NEW_USER_PSSSWORD_ERROR,
  CHANGE_NEW_USER_PSSSWORD_SUCCESS,
  LISTS_OF_DEACTIVATED_USERS_ERROR,
  LISTS_OF_DEACTIVATED_USERS_SUCCESS,
  UPDATE_USER_STATUS_ERROR,
  UPDATE_USER_STATUS_SUCCESS
} from "../constants/authconstant";

const initialState = {
  user: null,
  usersLists: null,
  successMessage: null,
  error: null,
  csrfToken: null,
  loading: false,
  userRole: null,
  deactivatedusersLists: null,
  isLoggedIn: false,
  profiles: null

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
        successMessage: action.payload.success,
        error: null,
        csrfToken: action.payload.csrfToken,
        loading: false,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        successMessage: action.payload.message,
        error: null,
        loading: false

      };
    case REGISTER_ERROR:
      return {
        ...state,
        successMessage: null,
        error: action.payload,
        loading: false
      };
    case REGISTER_EMPLOYEE_SUCCESS:
      return {
        ...state,
        userRole: 'admin',
        successMessage: action.payload,
        error: null,
        loading: false,
      }
    case REGISTER_EMPLOYEE_ERROR:
      return {
        ...state,
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
        loading: false,
        csrfToken: action.payload.csrfToken,
        isLoggedIn: true
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        successMessage: null,
        error: action.payload,
        csrfToken: null,
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
        profiles: action.payload.user,
        isLoggedIn: true,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        usersLists: null,
        successMessage: null,
        error: null,
        loading: false,
        userRole: null,
        deactivatedusersLists: null,
        profiles: null,
        isLoggedIn: false,
        csrfToken: null,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        successMessage: null,
        error: action.payload
      }
    case CHANGE_OLD_PSSSWORD_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
        error: null,
        loading: false
      }
    case CHANGE_OLD_PSSSWORD_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        error: action.payload
      }
    case CHANGE_NEW_USER_PSSSWORD_SUCCESS:
      return {
        ...state,
        successMessage: action.payload,
        error: null,
        loading: false
      }
    case CHANGE_NEW_USER_PSSSWORD_ERROR:
      return {
        ...state,
        loading: false,
        successMessage: null,
        error: action.payload
      }
    case CLEAR_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: null,
        error: null,
        loading: null,
        usersLists: [],
      }
    case LISTS_OF_USERS_SUCCESS:
      return {
        ...state,
        usersLists: action.payload.users,
        successMessage: action.payload.success,
        error: null,
        loading: null

      }
    case LISTS_OF_USERS_ERROR:
      return {
        ...state,
        usersLists: [],
        error: action.payload,
        loading: null
      }
    case LISTS_OF_DEACTIVATED_USERS_SUCCESS:
      return {
        ...state,
        deactivatedusersLists: action.payload.users,
        successMessage: action.payload.success,
        error: null,
        loading: null

      }
    case LISTS_OF_DEACTIVATED_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: null
      }
    case UPDATE_USER_STATUS_SUCCESS:
      const updatedUserId = action.payload.data._id;
      const updatedUsers = state.deactivatedusersLists.filter(user => user._id !== updatedUserId);
      return {
        ...state,
        deactivatedusersLists: updatedUsers.length < state.deactivatedusersLists.length ? updatedUsers : state.deactivatedusersLists,
        successMessage: action.payload,
        loading: null
      };

    case UPDATE_USER_STATUS_ERROR:
      return {
        ...state,
        deactivatedusersLists: state.deactivatedusersLists,
        error: action.payload,
        loading: null
      }
    default:
      return state;
  }
};

export { authReducer };
