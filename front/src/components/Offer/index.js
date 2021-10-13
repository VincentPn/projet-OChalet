/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import PropTypes from 'prop-types';

import {
  Button,
  Icon,
  Header,
  Modal,
} from 'semantic-ui-react';

import { withRouter, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import frLocale from 'date-fns/locale/fr';
import addMonths from 'date-fns/addMonths';

// import Carousel from 'nuka-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import './offer.scss';

import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import Loading from '../Loading';
import {
  setUpdateDaterange,
  fetchOffer,
  deleteOffer,
  openModal,
  closeModal,
  removeOfferFromState,
} from '../../actions/offers';

const Offer = ({ match }) => {
  const dispatch = useDispatch();
  const role = localStorage.getItem('role');
  const { id } = match.params;

  // const offer = useSelector(
  //   (state) => findOffer(state.offers.offers, id),
  // );

  const logged = useSelector((state) => state.user.logged);

  // eslint-disable-next-line
  useEffect(() => dispatch(fetchOffer(parseInt(id, 10))), []);

  const offerSelected = useSelector((state) => state.offers.offerSelected);

  const loading = useSelector((state) => state.offers.loading);


  const isModalOpen = useSelector((state) => state.offers.open);

  const history = useHistory();

  const redirect = (url) => {
    history.push(url);
  };

  const dateRange = useSelector((state) => state.offers.dateRange);

  const onChangeDatePicker = (event) => {
    dispatch(setUpdateDaterange(event.dateRange));
  };

  const getDatesDisabled = (bookings) => {
    const reservations = bookings.map((reservation) => eachDayOfInterval({
      start: new Date(reservation.reservation_start),
      end: new Date(reservation.reservation_end),
    }));
    const newArray = Array.prototype.concat.apply([], reservations);
    return newArray;
  };

  const showModal = () => {
    dispatch(openModal());
  };

  const hideModal = () => {
    dispatch(closeModal());
  };

  const removeOffer = () => {
    // dispatch(removeOfferFromState(id));
    dispatch(deleteOffer(id));
    dispatch(closeModal());
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {offerSelected ? (
        <div>
          <section className="offer">
            <div className="offer__header">
              <h2 className="offer__header__title">
                {offerSelected.title}
              </h2>
              <h3 className="offer__header__city">
                {offerSelected.city_name}
              </h3>
              <div className="offer__header__pictures">
                {/* <Carousel>
                  <img src={offerSelected.main_picture} alt="main" />
                  <img
                    src={offerSelected.galery_picture_1}
                    alt="galery"
                  />
                  <img
                    src={offerSelected.galery_picture_2}
                    alt="galery"
                  />
                  <img
                    src={offerSelected.galery_picture_3}
                    alt="galery"
                  />
                  <img
                    src={offerSelected.galery_picture_4}
                    alt="galery"
                  />
                  <img
                    src={offerSelected.galery_picture_5}
                    alt="galery"
                  />
                </Carousel> */}
                <Carousel dynamicHeight="true">
                  <div>
                    <img src={offerSelected.main_picture} alt="main" />
                  </div>
                  <div>
                    <img src={offerSelected.galery_picture_1} alt="galery_1" />
                  </div>
                  <div>
                    <img src={offerSelected.galery_picture_2} alt="galery_2" />
                  </div>
                  <div>
                    <img src={offerSelected.galery_picture_3} alt="galery_3" />
                  </div>
                  <div>
                    <img src={offerSelected.galery_picture_4} alt="galery_4" />
                  </div>
                  <div>
                    <img src={offerSelected.galery_picture_5} alt="galery_5" />
                  </div>
              </Carousel>
              </div>
            </div>
            <div className="offer__main">
              <div
                className="offer__main__description"
                dangerouslySetInnerHTML={{
                  __html: offerSelected.body,
                }}
              />
              <div className="offer__main__calendar">
                <DateRange
                  onChange={onChangeDatePicker}
                  moveRangeOnFirstSelection={false}
                  ranges={[dateRange]}
                  locale={frLocale}
                  dateDisplayFormat="dd.MM.yyyy"
                  minDate={new Date()}
                  maxDate={addMonths(new Date(), 12)}
                  startDatePlaceholder="Arrivée"
                  endDatePlaceholder="Départ"
                  disabledDates={getDatesDisabled(offerSelected.bookings)}
                  rangeColors={['#0dc948']}
                />
              </div>
            </div>
            <div className="offer__main__buttons">
              <Link to={logged ? `/offers/${id}/booking` : '/signin'}>
                <Button
                  className="offer__main__buttons__book"
                  color="brown"
                >
                  <Button.Content visible><Icon name="bookmark" />Réserver</Button.Content>
                </Button>
              </Link>
              {role === 'admin' && (
                <Modal
                  // closeIcon
                  open={isModalOpen}
                  trigger={<Button color="red"><Icon name="trash" />Supprimer l'annonce</Button>}
                  onClose={hideModal}
                  onOpen={showModal}
                >
                  <Header icon="delete" content="Supprimer une annonce" />
                  <Modal.Content>
                    <p>Êtes-vous sûr.e de vouloir supprimer cette annonce ?</p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="green" onClick={removeOffer}>
                      <Icon name="checkmark" /> Oui
                    </Button>
                    <Button color="red" onClick={hideModal}>
                      <Icon name="remove" /> Non
                    </Button>
                  </Modal.Actions>
                </Modal>
              )}
              {/* {role === 'admin' && (
                <Button
                  animated
                  className="offer__main__buttons__book"
                  color="orange"
                >
                  <Button.Content visible>Modifier l'annonce</Button.Content>
                  <Button.Content hidden>
                    <Icon name="code" />
                  </Button.Content>
                </Button>
              )} */}
            </div>
          </section>
        </div>
      ) : (
        <div><Loading /></div>
      )}
    </>
  );
};

Offer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withRouter(Offer);
