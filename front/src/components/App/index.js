// == Import
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { connectUser } from '../../actions/user';
import { fetchLocations, fetchOffers } from '../../actions/offers';

import 'semantic-ui-css/semantic.min.css';
import './styles.css';

import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';
import Offers from '../Offers';
import Locations from '../Locations';
import Offer from '../Offer';
import Signin from '../Signin';
import Signup from '../Signup';
import Profile from '../Profile';
import Admin from '../Backoffice/Admin';
import User from '../Backoffice/User';
import Signout from '../Signout';
import Cgv from '../CGV';
import Legal from '../Legal';
import Faq from '../FAQ';
import Copyright from '../Copyright';
import Createoffer from '../Createoffer';
import Error from '../Error';
import Bookingform from '../Bookingform';
import Loading from '../Loading';
import Paymentform from "../Paymentform/index";

const promise = loadStripe('pk_test_51JfJN5KVmN7kqniyp7GiGwGamOluieDhF3fSRIlAilHK5cC4AZVdtIsX4n7WHPaldeCiSVusfuFa3vbTcpq2rdHv00LkVaWVJU');

// == Composant
const App = () => {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('token');

  const loading = useSelector((state) => state.offers.loading);

  const logged = useSelector((state) => state.user.logged);
  // const role = useSelector((state) => state.user.role);

  if (accessToken) {
    dispatch(connectUser(accessToken));
  }

  // const role = localStorage.getItem('role');
  // const role = useSelector((state) => state.user.role);

  useEffect(
    () => {
      dispatch(fetchLocations());
    },
    [],
  );

  useEffect(
    () => {
      dispatch(fetchOffers());
    },
    [],
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      {/* <Header logged={logged} role={role} /> */}
      <Switch>
        <Route path="/" exact>
          <Header logged={logged} />
          <Main />
        </Route>
        <Route path="/locations" exact>
          <Header logged={logged} />
          <Locations />
        </Route>
        <Route path="/offers/location/:id" exact>
          <Header logged={logged} />
          <Offers />
        </Route>
        <Route path="/offers/:id" exact>
          <Header logged={logged} />
          <Offer />
        </Route>
        <Route path="/offers/:id/booking" exact>
          <Header logged={logged} />
          <Bookingform />
        </Route>
        <Route path="/booking-payment" exact>
          <Elements stripe={promise}>
            <Header logged={logged} />
            <Paymentform />
          </Elements>
        </Route>
        <Route path="/account/new-offer" exact>
          <Header logged={logged} />
          <Createoffer />
        </Route>
        <Route path="/signup" exact>
          <Header logged={logged} />
          <Signup />
        </Route>
        <Route path="/signin" exact>
          <Header logged={logged} />
          <Signin />
        </Route>
        <Route path="/profile" exact>
          <Header logged={logged} />
          {logged ? (
            <Profile />
          ) : (
            <Signin />
          )}
        </Route>
        <Route path="/account/admin" exact>
          <Header logged={logged} />
          {logged ? (
            <Admin />
          ) : (
            <Signin />
          )}
        </Route>
        <Route path="/account/user" exact>
          <Header logged={logged} />
          {logged ? (
          <User />
          ) : (
            <Signin />
          )}
        </Route>
        <Route path="/cgv" exact>
          <Cgv />
        </Route>
        <Route path="/faq" exact>
          <Faq />
        </Route>
        <Route path="/legal" exact>
          <Legal />
        </Route>
        <Route path="/copyright" exact>
          <Copyright />
        </Route>
        <Route path="/signout" exact>
          <Signout />
        </Route>
        <Route>
          <Error />
        </Route>
      </Switch>
    <Footer />
    </div>
  );
};

// == Export
export default App;
