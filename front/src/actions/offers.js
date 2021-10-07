export const FETCH_OFFERS = 'FETCH_OFFERS';

export const fetchOffers = () => ({ type: FETCH_OFFERS });

export const SAVE_OFFERS = 'SAVE_OFFERS';

export const saveOffers = (data) => (
  {
    type: SAVE_OFFERS,
    data,
  }
);

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';

export const fetchLocations = () => ({ type: FETCH_LOCATIONS });

export const SAVE_LOCATIONS = 'SAVE_LOCATIONS';

export const saveLocations = (data) => ({
  type: SAVE_LOCATIONS,
  data,
});

export const UPDATE_OFFER = 'UPDATE_OFFER';

export const updateOffer = (data) => (
  {
    type: UPDATE_OFFER,
    data,
  }
);

export const SAVE_OFFER_DATA = 'SAVE_OFFER_DATA';

export const saveOfferData = (data) => (
  {
    type: SAVE_OFFER_DATA,
    data,
  }
);

export const SET_UPDATE_MODE = 'SET_UPDATE_MODE';

export const setUpdateMode = () => (
  {
    type: SET_UPDATE_MODE,
  }
);

export const SET_OFFER_FIELD = 'SET_OFFER_FIELD';

export const setOfferField = (value, name) => (
  {
    type: SET_OFFER_FIELD,
    value,
    name,
  }
);

export const SET_INPUT_FILE = 'SET_INPUT_FILE';

export const setInputFile = (event, name) => ({
  type: SET_INPUT_FILE,
  event,
  name,
});

export const SELECT_LOCATION = 'SELECT_LOCATION';

export const selectLocation = (value) => (
  {
    type: SELECT_LOCATION,
    value,
  }
);

export const CREATE_OFFER = 'CREATE_OFFER';

export const createOffer = (data) => (
  {
    type: CREATE_OFFER,
    data,
  }
);

export const DELETE_OFFER = 'DELETE_OFFER';

export const deleteOffer = (data) => (
  {
    type: DELETE_OFFER,
    data,
  }
);

export const REMOVE_OFFER_FROM_STATE = 'REMOVE_OFFER_FROM_STATE';

export const removeOfferFromState = (data) => (
  {
    type: REMOVE_OFFER_FROM_STATE,
    data,
  }
);

export const SET_UPDATE_DATERANGE = 'SET_UPDATE_DATERANGE';

export const setUpdateDaterange = (value) => (
  {
    type: SET_UPDATE_DATERANGE,
    value,
  }
);

export const FETCH_OFFER = 'FETCH_OFFER';
export const fetchOffer = (offerId) => (
  {
    type: FETCH_OFFER,
    offerId,
  }
);

export const SET_OFFER = 'SET_OFFER';
export const setOffer = (offer) => (
  {
    type: SET_OFFER,
    offer,
  }
);

export const OPEN_MODAL = 'OPEN_MODAL';

export const openModal = () => (
  {
    type: OPEN_MODAL,
  }
);

export const CLOSE_MODAL = 'CLOSE_MODAL';

export const closeModal = () => (
  {
    type: CLOSE_MODAL,
  }
);

export const SAVE_BOOKING_DATES = 'SAVE_BOOKING_DATES';

export const saveBookingDates = () => (
  {
    type: SAVE_BOOKING_DATES,
  }
);
