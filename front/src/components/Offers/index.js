import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { filterOffers } from '../../selectors/offers';

import OfferCard from '../Cards/OfferCard';

import './offers.scss';

const Offers = ({ match }) => {
  const { id } = match.params;

  const filteredOffers = useSelector(
    (state) => filterOffers(state.offers.offers, id),
  );

  return (
    <section className="offers">

      {filteredOffers.map((offer) => (
        <OfferCard key={offer.id} {...offer} />
      ))}

    </section>
  );
};

Offers.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default withRouter(Offers);
