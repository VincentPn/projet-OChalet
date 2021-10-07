/* eslint-disable camelcase */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import Field from '../Field';

import {
  setUserField,
  setUpdateMode,
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
    updateMode,
  } = useSelector((state) => state.user);

  const dateRange = useSelector((state) => (state.offers.dateRange));

  const changeField = (value, name) => {
    dispatch(setUserField(value, name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch(setUpdateMode());
    dispatch(fetchStripeInfos());
  };

  const toggleUpdateMode = (event) => {
    event.preventDefault();
    dispatch(setUpdateMode());
  };

  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);

  useEffect(
    () => {
      dispatch(saveUserData(parsedUser));
    },
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
          updateMode={!updateMode}
        />
        <Field
          name="firstname"
          value={firstname}
          type="text"
          placeholder="Prénom"
          onChange={changeField}
          updateMode={!updateMode}
        />
        <Field
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={changeField}
          updateMode={!updateMode}
        />
        <Field
          name="street_number"
          value={street_number}
          type="text"
          onChange={changeField}
          placeholder="Numéro de rue"
          updateMode={!updateMode}
        />
        <Field
          name="street_name"
          value={street_name}
          type="text"
          onChange={changeField}
          placeholder="Nom de rue"
          updateMode={!updateMode}
        />
        <Field
          name="zip_code"
          value={zip_code}
          type="text"
          onChange={changeField}
          placeholder="Code postal"
          updateMode={!updateMode}
        />
        <Field
          name="city_name"
          value={city_name}
          type="text"
          onChange={changeField}
          placeholder="Ville"
          updateMode={!updateMode}
        />
        <Field
          name="country"
          value={country}
          type="text"
          onChange={changeField}
          placeholder="Pays"
          updateMode={!updateMode}
        />
        <Field
          name="phone"
          value={phone}
          type="text"
          onChange={changeField}
          placeholder="Numéro de téléphone"
          updateMode={!updateMode}
        />
        <div>
          <h2 className="booking__title">Vos dates de séjour</h2>
          <p>Du { format(dateRange.startDate, 'dd/MM/yyyy') } au { format(dateRange.endDate, 'dd/MM/yyyy') }</p>
        </div>
        <div className="booking__legals">
          <label htmlFor="CGV">
            <input id="CGV" type="checkbox" name="CGV" />  J'ai lu et j'accepte les <Link to="/cgv">conditions générales de vente</Link>
          </label>
        </div>
        <div className="booking__form__buttons">
          <Button
            animated
            className="booking__form__buttons__modify"
            color="brown"
            onClick={toggleUpdateMode}
            type="submit"
          >
            <Button.Content visible>Modifier</Button.Content>
            <Button.Content hidden>
              <Icon name="save" />
            </Button.Content>
          </Button>
          {updateMode && (
          <Button
            animated
            color="teal"
            className="booking__form__buttons__validate"
          >
            <Button.Content visible>Valider</Button.Content>
            <Button.Content hidden>
              <Icon name="checkmark" />
            </Button.Content>
          </Button>
          )}
          <Link to="/booking-payment">
            <Button
              animated
              className="booking__form__buttons__book"
              color="green"
              type="submit"
            >
              <Button.Content visible>Réserver</Button.Content>
              <Button.Content hidden>
                <Icon name="checkmark" />
              </Button.Content>
            </Button>
          </Link>
        </div>
      </Form>
    </main>
  );
};

export default Bookingform;
