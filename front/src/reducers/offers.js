import {
  SAVE_OFFERS,
  SAVE_LOCATIONS,
  SET_OFFER_FIELD,
  SET_INPUT_FILE,
  SET_UPDATE_MODE,
  SELECT_LOCATION,
  SET_UPDATE_DATERANGE,
  SET_OFFER,
  OPEN_MODAL,
  CLOSE_MODAL,
  REMOVE_OFFER_FROM_STATE,
} from '../actions/offers';

export const initialState = {
  loading: true,
  open: false,
  offers: [],
  locations: [],
  newoffer: {
    title: '',
    body: '<h2>Description</h2><p>[insérer le texte ici]</p><h2>Prestations</h2><table><tbody><tr><td><img src="https://img.icons8.com/ios-filled/30/000000/dog.png"/></td><td>Animaux autorisés</td></tr><tr><td><img src="https://img.icons8.com/glyph-neue/30/000000/wifi.png"/></td><td>Internet / Wifi</td></tr><tr><td><img src="https://img.icons8.com/ios-filled/30/000000/housekeeping.png"/></td><td>Ménage compris</td></tr><tr><td><img src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/30/000000/external-croissant-fast-food-vitaliy-gorbachev-fill-vitaly-gorbachev.png"/></td><td>Petit-déjeuner en supplément</td></tr></tbody></table><h2>Informations complémentaires</h2><p>[insérer le texte ici]</p>',
    zip_code: '',
    city_name: '',
    country: '',
    street_name: '',
    street_number: '',
    price_ht: '',
    tax: '',
    main_picture: '',
    galery_picture_1: '',
    galery_picture_2: '',
    galery_picture_3: '',
    galery_picture_4: '',
    galery_picture_5: '',
    location_id: '',
  },
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: 'dateRange',
  },
  offerSelected: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_OFFERS:
      return {
        ...state,
        offers: action.data,
        loading: false,
      };
    case SAVE_LOCATIONS:
      return {
        ...state,
        locations: action.data,
      };
    case SET_OFFER_FIELD:
      return {
        ...state,
        newoffer: {
          ...state.newoffer,
          [action.name]: action.value,
        },
      };
    case SET_INPUT_FILE:
      const file = action.event
      return {
        ...state,
        newoffer: {
          ...state.newoffer,
          [action.name]: file,
        },
      };
    case SELECT_LOCATION:
      return {
        ...state,
        newoffer: {
          ...state.newoffer,
          location_id: action.value,
        },
      };
    case SET_UPDATE_MODE:
      return {
        ...state,
        newoffer: {
          ...state.newoffer,
          updateMode: !state.updateMode,
        },
      };
    case SET_UPDATE_DATERANGE:
      console.log('state ', state);
      return {
        ...state,
        dateRange: action.value,
      };
    case SET_OFFER:
      return {
        ...state,
        offerSelected: action.offer,
      };
    case OPEN_MODAL:
      return {
        ...state,
        open: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        open: false,
      };
    case REMOVE_OFFER_FROM_STATE:
      return {
        ...state,
        offers: state.offers.filter((offer) => offer.id !== action.data),
      };
    default:
      return state;
  }
};

export default reducer;
