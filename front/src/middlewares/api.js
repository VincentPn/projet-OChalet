/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import axios from 'axios';

import jwt_decode from 'jwt-decode';
import {
  FETCH_OFFERS,
  saveOffers,
  FETCH_LOCATIONS,
  saveLocations,
  CREATE_OFFER,
  FETCH_OFFER,
  setOffer,
  DELETE_OFFER,
  SAVE_BOOKING_DATES,
} from '../actions/offers';

import {
  FETCH_USER_DATA,
  saveUserData,
  LOGIN,
  SIGNUP,
  signup,
  UPDATE_USER,
  FETCH_STRIPE_INFOS,
  saveStripeInfos,
} from '../actions/user';

const axiosInstance = axios.create({
  baseURL: 'https://ochalet-api.herokuapp.com',
  // baseURL: 'http://localhost:5000',
});

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case LOGIN: {
      const { user: { email, password } } = store.getState();
      axiosInstance.post('/signin',
        {
          email,
          password,
        })
        .then(
          (response) => {
            const token = response.data.accessToken;
            const decoded = jwt_decode(token);
            store.dispatch(saveUserData(response.data.user));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', token);
            localStorage.setItem('id', decoded.id);
            localStorage.setItem('role', decoded.role);
          },
        ).catch(
          () => console.log('error'),
        );
      next(action);
      break;
    }
    case SIGNUP: {
      const {
        user: {
          firstname, lastname, email, password, passwordConfirm,
        },
      } = store.getState();
      axiosInstance.post('/signup',
        {
          firstname,
          lastname,
          email,
          password,
          passwordConfirm,
        })
        .then(
          (response) => {
            store.dispatch(signup(response.data));
          },
        ).catch(
          (error) => console.log(error.message),
        );
      next(action);
      break;
    }
    case FETCH_USER_DATA: {
      const token = localStorage.getItem('token');
      axiosInstance
        .get('/user',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then(
          (response) => {
            store.dispatch(saveUserData(response.data));
          },
        )
        .catch(
          (error) => console.log(error),
        );
      next(action);
      break;
    }
    case UPDATE_USER: {
      const token = localStorage.getItem('token');
      const {
        user: {
          firstname,
          lastname,
          email,
          phone,
          birth_date,
          street_number,
          street_name,
          zip_code,
          city_name,
          country,
        },
      } = store.getState();
      const id = localStorage.getItem('id');
      axiosInstance
        .patch('/user',
          {
            id,
            firstname,
            lastname,
            email,
            phone,
            birth_date,
            street_number,
            street_name,
            zip_code,
            city_name,
            country,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then(
          (response) => {
            store.dispatch(saveUserData(response.data));
          },
        )
        .catch(
          (error) => console.log(error),
        );
      next(action);
      break;
    }
    case FETCH_LOCATIONS:
      try {
        const url = '/locations';
        const { data } = await axiosInstance.get(url);
        if (!data) throw new Error('AXIOS FETCH ERROR');
        store.dispatch(saveLocations(data));
      }
      catch (error) {
        console.log(error.message);
      }
      next(action);
      break;
    case FETCH_OFFERS:
      axiosInstance
        .get(
          '/offers',
        )
        .then(
          (response) => {
            store.dispatch(saveOffers(response.data));
          },
        );
      next(action);
      break;
    case CREATE_OFFER: {
      const token = localStorage.getItem('token');
      const data = new FormData();
      const stateKeys = Object.keys(store.getState().offers.newoffer);

      for (const key of stateKeys) {
        let spacelessKey;
        if (key.match(/ /)) {
          spacelessKey = key.slice(0, -1);
          data.append(spacelessKey, store.getState().offers.newoffer[key]);
        }
        else data.append(key, store.getState().offers.newoffer[key]);
      }
      axiosInstance
        .post(
          '/admin/offers',

          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(
          (response) => {
            console.log(response.data);
            if (response.data) {
              window.location = '/account/admin';
            }
          },
        ).catch(
          (error) => console.log(error.message),
        );
      next(action);
      break;
    }
    case FETCH_OFFER: {
      axiosInstance
        .get(
          `/offers?id=${action.offerId}`,
        )
        .then(
          (response) => {
            // console.log('test : ', response.data);
            store.dispatch(setOffer(response.data));
          },
        );
      next(action);
      break;
    }
    case DELETE_OFFER: {
      const token = localStorage.getItem('token');
      axiosInstance
        .delete(`/admin/offers?id=${action.data}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then(
          (response) => {
            console.log(response.data);
            if (response.data) {
              window.location = '/account/admin';
            }
          },
          
        ).catch(
          (error) => console.log(error.message),
        );
      next(action);
      break;
    }
    case FETCH_STRIPE_INFOS: {
      const token = localStorage.getItem('token');
      const offerID = store.getState().offers.offerSelected.offer.id;
      const customer_email = store.getState().user.email;
      const booking_start = store.getState().offers.dateRange.startDate;
      const booking_end = store.getState().offers.dateRange.endDate;
      axiosInstance
        .post('/payment_intent',
          {
            offerID,
            booking_start,
            booking_end,
            customer_email,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(
          (response) => {
            store.dispatch(saveStripeInfos(response.data));
          }
        )
        .catch(
          (error) => console.log(error),
        )
        next(action);
        break;
    }
    case SAVE_BOOKING_DATES: {
      const token = localStorage.getItem('token');
      const clientSecret = store.getState().user.stripeInfos.clientSecret;
      const intentID = clientSecret.split('secret').shift().slice(0, -1);
      axiosInstance
        .post('/bookings',
          {
            intentID
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(
          (response) => {
            console.log(response.data);
          }
        )
        .catch(
          (error) => console.log(error),
        )
        next(action);
        break;
    }
    default:
      next(action);
  }
};
