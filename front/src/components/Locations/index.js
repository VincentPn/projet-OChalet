import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';

import { fetchLocations, fetchOffers } from '../../actions/offers';

import LocationCard from '../Cards/LocationCard';

import './locations.scss';

const Locations = () => {
  const dispatch = useDispatch();

  // dispatch(fetchLocations);

  useEffect(
    () => {
      dispatch(fetchLocations());
    },
    [],
  );

  const locations = useSelector((state) => state.offers.locations);

  // useEffect(
  //   () => {
  //     dispatch(fetchOffers());
  //   },
  //   [],
  // );

  return (
    <section className="offers">

      {locations.map((location) => (
        <LocationCard key={location.id} {...location} />
      ))}

    </section>
  );
};

export default Locations;
