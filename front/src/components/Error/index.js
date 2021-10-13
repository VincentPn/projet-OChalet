import { useSelector } from 'react-redux';

import './error.scss';

import Header from '../Header';

const Error = () => {
  const logged = useSelector((state) => state.user.logged);

  return (
    <>
      <Header logged={logged} />
      <main className="error404">
        <div className="error404__bg" />
        <h1 className="error404__title">Erreur 404</h1>
        <h2 className="error404__text">On dirait bien que vous êtes perdu.e...</h2>
      </main>
    </>
  );
}

export default Error;
