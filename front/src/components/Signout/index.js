import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signout } from '../../actions/user';

import './signout.scss';

const Signout = () => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch(signout());
      localStorage.clear();
    },
    [],
  );

  return (
    <Redirect to="/" />
  );
};

export default Signout;
