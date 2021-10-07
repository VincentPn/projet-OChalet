import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

import './main.scss';

const Main = () => (
  <main className="main">
    <p className="main__text">Vous vous sentez stressé.e ? Fatigué.e ? Vous avez sûrement besoin de changer d'air...</p>
    <Link to="/locations" className="main__link">
      <Button
        animated
        className="main__link__button"
        color="brown"
      >
        <Button.Content visible>D'accord, mais vous me proposez quoi ?</Button.Content>
        <Button.Content hidden>
          <Icon name='angle right' />
        </Button.Content>
      </Button>
    </Link>
  </main>
);

export default Main;
