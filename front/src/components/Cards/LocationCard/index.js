/* eslint-disable camelcase */
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const LocationCard = ({ name, picture, id }) => (

  <Link className="locations__card" to={`/offers/location/${id}`}>
    <img src={picture} alt="mountain" className="locations__card__image" />
    <h2 className="locations__card__title">{name}</h2>
  </Link>
);

LocationCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default LocationCard;
