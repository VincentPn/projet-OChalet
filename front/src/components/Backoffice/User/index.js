//import { Button, Icon } from 'semantic-ui-react';

import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Loading from '../../Loading';
import PropTypes from 'prop-types';
import './backoffice-user.scss';
import { fetchBookings } from '../../../actions/offers';
import { useEffect } from 'react';

const User = () => {

  const dispatch = useDispatch();

  // eslint-disable-next-line
  useEffect(() => dispatch(fetchBookings()), []);
  
  const bookings = useSelector((state) => state.offers.bookings);

  return (
    <>
    {bookings ? 
    <main className="backoffice-user">
      <h2 className="backoffice-user__title">Mes réservations</h2>
      <div className="container">
          {
            bookings.map((booking) => (
              <div className="backoffice-user__reservation">
          <p className="backoffice-user__reservation__date">Du { format(new Date(booking.reservation_start), 'dd/MM/yyyy') } au { format( new Date(booking.reservation_end), 'dd/MM/yyyy') }</p>
          <p className="backoffice-user__reservation__booking-offer">{booking.offer.title}</p>
          <p className="backoffice-user__reservation__booking-number">OC-00052179-00{booking.id}</p>
        </div>
          ))
        }
        </div>
    </main>
    : (<Loading />) }
    </>
  );
};


export default User;
