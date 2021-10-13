/* eslint-disable camelcase */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import Field from '../Field';

import {
  setUserField,
  saveUserData,
  fetchStripeInfos,
} from '../../actions/user';

import './bookingform.scss';

const Bookingform = () => {
  const dispatch = useDispatch();

  const {
    lastname,
    firstname,
    email,
    street_number,
    street_name,
    zip_code,
    city_name,
    country,
    phone,
  } = useSelector((state) => state.user);

  const dateRange = useSelector((state) => (state.offers.dateRange));

  const changeField = (value, name) => {
    dispatch(setUserField(value, name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchStripeInfos());
  };

  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);

  useEffect(
    () => {
      dispatch(saveUserData(parsedUser));
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <main className="booking">
      <h1 className="booking__main-title">Réservez votre chalet</h1>
      <h2 className="booking__title">Confirmation de vos informations</h2>
      <Form className="booking__form" onSubmit={handleSubmit}>
        <Field
          name="lastname"
          value={lastname}
          type="text"
          placeholder="Nom"
          onChange={changeField}
        />
        <Field
          name="firstname"
          value={firstname}
          type="text"
          placeholder="Prénom"
          onChange={changeField}
        />
        <Field
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={changeField}
        />
        <Field
          name="street_number"
          value={street_number}
          type="text"
          onChange={changeField}
          placeholder="Numéro de rue"
        />
        <Field
          name="street_name"
          value={street_name}
          type="text"
          onChange={changeField}
          placeholder="Nom de rue"
        />
        <Field
          name="zip_code"
          value={zip_code}
          type="text"
          onChange={changeField}
          placeholder="Code postal"
        />
        <Field
          name="city_name"
          value={city_name}
          type="text"
          onChange={changeField}
          placeholder="Ville"
        />
        <Field
          name="country"
          value={country}
          type="text"
          onChange={changeField}
          placeholder="Pays"
        />
        <Field
          name="phone"
          value={phone}
          type="text"
          onChange={changeField}
          placeholder="Numéro de téléphone"
        />
        <div>
          <h2 className="booking__title">Vos dates de séjour</h2>
          <p className="booking__form__dates">Du { format(dateRange.startDate, 'dd/MM/yyyy') } au { format(dateRange.endDate, 'dd/MM/yyyy') }</p>
        </div>
        <div className="booking__legals">
          <label htmlFor="CGV">
            <input id="CGV" type="checkbox" name="CGV" />  J'ai lu et j'accepte les <Link to="/cgv">conditions générales de vente</Link>
          </label>
        </div>
        <div className="booking__form__buttons">
          <Link to="/booking-payment">
            <Button
              className="booking__form__buttons__book"
              color="green"
              type="submit"
            >
              <Button.Content visible><Icon name="bookmark" />Réserver</Button.Content>
            </Button>
          </Link>
        </div>
      </Form>
    </main>
  );
};

export default Bookingform;
