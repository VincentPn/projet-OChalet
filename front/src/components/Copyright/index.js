import { Icon } from 'semantic-ui-react';

import benj from '../../assets/images/benj.png';
import vincent from '../../assets/images/vincent.png';
import allison from '../../assets/images/allison.png';
import christophe from '../../assets/images/christophe.png';
import fire from '../../assets/images/fire.gif';

import './copyright.scss';

const Copyright = () => (
  <section className="copyright">
    <h1 className="copyright__title">L'équipe O'chalet</h1>
    <div className="copyright__card-container">
      <div className="card">
        <img className="fire" src={fire} alt="" />
        <img className="card__image" src={benj} alt="Benjamin en personnage de South Park" />
        <div className="card__content">
          <div className="card__content__header">
            Benjamin
          </div>
          <div className="card__content__description">
            Petit description pour chaque membre de l'équipe.
          </div>
        </div>
        <div className="card__footer">
          <div className="card__footer__role">
            <Icon name="key" />
            P.O
          </div>
          <div className="card__footer__role">
            <Icon name="github" />
            Git Master
          </div>
          <div className="card__footer__role">
            <Icon name="database" />
            Dev Back
          </div>
        </div>
      </div>
      <div className="card">
        <img className="fire" src={fire} alt="" />
        <img className="card__image" src={allison} alt="Allison en personnage de South Park" />
        <div className="card__content">
          <div className="card__content__header">
            Allison
          </div>
          <div className="card__content__description">
            Petit description pour chaque membre de l'équipe.
          </div>
        </div>
        <div className="card__footer">
          <div className="card__footer__role">
            <Icon name="hand peace" />
            Scrum Master
          </div>
          <div className="card__footer__role">
            <Icon name="magic" />
            Dev Front
          </div>
        </div>
      </div>
      <div className="card">
        <img className="fire" src={fire} alt="" />
        <img className="card__image" src={vincent} alt="Vincent en personnage de South Park" />
        <div className="card__content">
          <div className="card__content__header">
            Vincent
          </div>
          <div className="card__content__description">
            Petit description pour chaque membre de l'équipe.
          </div>
        </div>
        <div className="card__footer">
          <div className="card__footer__role">
            <Icon name="magic" />
            Lead Dev Front
          </div>
        </div>
      </div>
      <div className="card">
        <img className="fire" src={fire} alt="" />
        <img className="card__image" src={christophe} alt="Christophe en personnage de South Park" />
        <div className="card__content">
          <div className="card__content__header">
            Christophe
          </div>
          <div className="card__content__description">
            Petit description pour chaque membre de l'équipe.
          </div>
        </div>
        <div className="card__footer">
          <div className="card__footer__role">
            <Icon name="database" />
            Dev Back
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Copyright;
