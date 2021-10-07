import { Button, Icon } from 'semantic-ui-react';

import './backoffice-user.scss';

const User = () => (
  <main className="backoffice-user">
    <h2 className="backoffice-user__title">Mes réservations</h2>
    <div className="container">
      <div className="backoffice-user__reservation">
        <p className="backoffice-user__reservation__date">Date de réservation</p>
        <p className="backoffice-user__reservation__booking-offer">Annonce réservée</p>
        <p className="backoffice-user__reservation__booking-number">N° de réservation</p>
        <Button
          animated
          className="backoffice-user__reservation__button"
          color="brown"
        >
          <Button.Content visible>Un souci ?</Button.Content>
          <Button.Content hidden>
            <Icon name="warning sign" />
          </Button.Content>
        </Button>
      </div>
      <div className="backoffice-user__reservation">
        <p className="backoffice-user__reservation__date">Date de réservation</p>
        <p className="backoffice-user__reservation__booking-offer">Annonce réservée</p>
        <p className="backoffice-user__reservation__booking-number">N° de réservation</p>
        <Button
          animated
          className="backoffice-user__reservation__button"
          color="brown"
        >
          <Button.Content visible>Un souci ?</Button.Content>
          <Button.Content hidden>
            <Icon name="warning sign" />
          </Button.Content>
        </Button>
      </div>
      <div className="backoffice-user__reservation">
        <p className="backoffice-user__reservation__date">Date de réservation</p>
        <p className="backoffice-user__reservation__booking-offer">Annonce réservée</p>
        <p className="backoffice-user__reservation__booking-number">N° de réservation</p>
        <Button
          animated
          className="backoffice-user__reservation__button"
          color="brown"
        >
          <Button.Content visible>Un souci ?</Button.Content>
          <Button.Content hidden>
            <Icon name="warning sign" />
          </Button.Content>
        </Button>
      </div>
    </div>
  </main>
);

export default User;
