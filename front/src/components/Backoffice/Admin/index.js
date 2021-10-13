/* eslint-disable camelcase */
import { PropTypes } from 'prop-types';

import { Link, Redirect } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { fetchOffers } from '../../../actions/offers';
import { fetchUserData } from '../../../actions/user';

import './backoffice-admin.scss';

const Admin = () => {

  const role = useSelector((state) => state.user.role);
  if (role === 'user') {
    <Redirect to="/account/user" />;
  }

  const firstname = useSelector((state) => (state.user.firstname));
  const lastname = useSelector((state) => (state.user.lastname));

  const offers = useSelector((state) => (state.offers.offers));

  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(fetchOffers());
    },
    [],
  );

  useEffect(
    () => {
      dispatch(fetchUserData());
    },
    [],
  );

  return (
    <main className="backoffice-admin">
      <h2 className="backoffice-admin__name">{firstname} {lastname}</h2>
      <h3 className="backoffice-admin__role">Administrateur</h3>
      <div className="backoffice-admin__create-offer">
        <Link to="/account/new-offer">
          <Button
            className="backoffice-admin__create-offer__button"
            color="green"
          >
            <Button.Content visible><Icon name="plus" />Créer une annonce</Button.Content>
          </Button>
        </Link>
      </div>
      <div className="backoffice-admin__card-list">
        {
          offers.map((offer) => (
            <div key={offer.id} className="backoffice-admin__card">
              <img src={offer.main_picture} alt="mountain" className="backoffice-admin__card__image" />
              <div className="backoffice-admin__card__details">
                <h2 className="backoffice-admin__card__details__name">{offer.title}</h2>
                <p className="backoffice-admin__card__details__city">{offer.city_name}, {offer.country}</p>
                <Link to={`/offers/${offer.id}`}>
                  <Button
                    className="backoffice-admin__card__details__button"
                    color="teal"
                  >
                    <Button.Content visible><Icon name="eye" />Voir l'annonce</Button.Content>
                  </Button>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  );
};

Admin.propTypes = {
  logged: PropTypes.bool.isRequired,
};

export default Admin;
