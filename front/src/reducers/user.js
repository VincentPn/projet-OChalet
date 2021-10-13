import {
  SET_USER_FIELD,
  CONNECT_USER,
  SAVE_USER_DATA,
  SIGNOUT,
  SET_UPDATE_MODE,
  SAVE_STRIPE_INFOS,
} from '../actions/user';

export const initialState = {
  logged: false,
  id: '',
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  birth_date: '',
  zip_code: '',
  city_name: '',
  country: '',
  street_name: '',
  street_number: '',
  password: '',
  passwordConfirm: '',
  role: '',
  updateMode: false,
  stripeInfos: {
    clientSecret: '',
    intentID: '',
  }
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };
    case CONNECT_USER:
      return {
        ...state,
        logged: true,
        token: action.data.accessToken,
        password: '',
        role: action.data.role,
      };
    case SAVE_USER_DATA:
      return {
        ...state,
        // token: action.data.accessToken,
        // id: action.data.id,
        logged: true,
        firstname: action.data.firstname,
        lastname: action.data.lastname,
        email: action.data.email,
        phone: action.data.phone,
        birth_date: action.data.birth_date,
        zip_code: action.data.zip_code,
        city_name: action.data.city_name,
        country: action.data.country,
        street_name: action.data.street_name,
        street_number: action.data.street_number,
        password: '',
        role: action.data.role,
      };
    case SIGNOUT:
      return {
        ...state,
        logged: false,
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        birth_date: '',
        zip_code: '',
        city_name: '',
        country: '',
        street_name: '',
        street_number: '',
        password: '',
        passwordConfirm: '',
        role: '',
      };
    case SET_UPDATE_MODE:
      return {
        ...state,
        updateMode: !state.updateMode,
      };
    case SAVE_STRIPE_INFOS: 
      console.log(action, "$$$$$$$$$$$$$$")
      return {
        ...state,
        stripeInfos: {
          ...state.stripeInfos,
          clientSecret: action.data.clientSecret,
        },
      };
    default:
      return state;
  }
};

export default reducer;
