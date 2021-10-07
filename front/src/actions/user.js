export const SET_USER_FIELD = 'SET_USER_FIELD';

export const setUserField = (value, name) => (
  {
    type: SET_USER_FIELD,
    value,
    name,
  }
);

export const LOGIN = 'LOGIN';

export const login = () => (
  {
    type: LOGIN,
  }
);

export const CONNECT_USER = 'CONNECT_USER';

export const connectUser = (data) => (
  {
    type: CONNECT_USER,
    data,
  }
);

export const SIGNUP = 'SIGNUP';

export const signup = (data) => (
  {
    type: SIGNUP,
    data,
  }
);

export const FETCH_USER_DATA = 'FETCH_USER_DATA';

export const fetchUserData = (data) => (
  {
    type: FETCH_USER_DATA,
    data,
  }
);

export const SAVE_USER_DATA = 'SAVE_USER_DATA';

export const saveUserData = (data) => (
  {
    type: SAVE_USER_DATA,
    data,
  }
);

export const SIGNOUT = 'SIGNOUT';

export const signout = () => (
  {
    type: SIGNOUT,
  }
);

export const SET_UPDATE_MODE = 'SET_UPDATE_MODE';

export const setUpdateMode = () => (
  {
    type: SET_UPDATE_MODE,
  }
);

export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = (data) => (
  {
    type: UPDATE_USER,
    data,
  }
);

export const FETCH_STRIPE_INFOS = 'FETCH_STRIPE_INFOS';

export const fetchStripeInfos = () => (
    {
        type: FETCH_STRIPE_INFOS,
    }
);

export const SAVE_STRIPE_INFOS = 'SAVE_STRIPE_INFOS';

export const saveStripeInfos = (data) => (
    {
        type: SAVE_STRIPE_INFOS,
        data,
    }
);
