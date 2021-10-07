/* eslint-disable camelcase */
import { Button, Icon, Form } from 'semantic-ui-react';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  setUserField,
  updateUser,
  setUpdateMode,
  saveUserData,
} from '../../actions/user';

import Field from '../Field';

import './profile.scss';

const Profile = () => {
  const dispatch = useDispatch();

  const {
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
    updateMode,
  } = useSelector((state) => state.user);

  const role = localStorage.getItem('role');

  let admin = false;
  if (role === 'admin') {
    admin = true;
  }

  const changeField = (value, name) => {
    dispatch(setUserField(value, name));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser());
    dispatch(setUpdateMode());
  };

  const toggleUpdateMode = (event) => {
    event.preventDefault();
    dispatch(setUpdateMode());
  };

  const deleteAccount = (event) => {
    event.preventDefault();
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
    <main className="profile">
      <h2 className="profile__title">Vos informations</h2>
      <Form className="profile__form" onSubmit={handleSubmit}>
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
          name="phone"
          value={phone}
          type="tel"
          placeholder="Téléphone"
          onChange={changeField}
          updateMode={!updateMode}
        />
        {!admin && (
        <Field
          name="birth_date"
          value={birth_date}
          type="date"
          placeholder="Date de naissance"
          onChange={changeField}
          updateMode={!updateMode}
        />
        )}
        {!admin && (
        <Field
          name="street_number"
          value={street_number}
          type="number"
          placeholder="Numéro de rue"
          onChange={changeField}
          updateMode={!updateMode}
        />
        )}
        {!admin && (
        <Field
          name="street_name"
          type="text"
          value={street_name}
          placeholder="Nom de rue"
          onChange={changeField}
          updateMode={!updateMode}
        />
        )}
        {!admin && (
        <Field
          name="zip_code"
          type="text"
          value={zip_code}
          placeholder="Code postal"
          onChange={changeField}
          updateMode={!updateMode}
        />
        )}
        {!admin && (
        <Field
          name="city_name"
          type="text"
          value={city_name}
          placeholder="Ville"
          onChange={changeField}
          updateMode={!updateMode}
        />
        )}
        {!admin && (
        <Field
          name="country"
          type="text"
          value={country}
          placeholder="Pays"
          onChange={changeField}
          updateMode={!updateMode}
        />
        )}
        <div className="profile__form__buttons">
          <Button
            animated
            className="signup__form__buttons__modify"
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
            className="profile__form__buttons__validate"
          >
            <Button.Content visible>Valider</Button.Content>
            <Button.Content hidden>
              <Icon name="checkmark" />
            </Button.Content>
          </Button>
          )}
          <Button
            animated
            className="signup__form__buttons__delete"
            color="red"
            onClick={deleteAccount}
          >
            <Button.Content visible>Supprimer mon compte</Button.Content>
            <Button.Content hidden>
              <Icon name="trash" />
            </Button.Content>
          </Button>
        </div>
      </Form>
    </main>
  );
};

export default Profile;
