import { useSelector } from 'react-redux';

import './legal.scss';

import Header from '../Header';

const Legal = () => {

  const logged = useSelector((state) => state.user.logged);

  return (
    <>
    <Header logged={logged} />
      <section className="legal">
        <h1>Mentions légales</h1>
        <h2>Informations éditeur</h2>
        <p>
          Ce site est édité par l’entreprise O’Chalet, Société
          par action simplifiée au capital de 1000 euros.
          <p>Siège social : 5 rue du Dave - 75011 Paris - France</p>
          <p>SIRET 115 315 382 00011</p>
          <p>Code APE : 7911Z</p>
          <p>Immatriculation au registre des opérateurs de voyages et de séjours :
            Licence n° DV075120171 délivrée par Voyage France.</p>
          <p>N° Identification TVA intracommunautaire : FR 89 587 315 678</p>
          <p>Nom du Directeur de la publication : Dave Loper</p>
          <p>Numéro de téléphone de contact : 0 123 456 789</p>
          <p>Adresse mail de contact : info@ochalet.com</p>
        </p>
        <h2>Informations hébergeur</h2>
        <p>DEV SERVER
          <p>RCS Dev Server Group</p>
          <p>154 539 789</p>
          <p>50 Rue du Code, 75011 Paris</p>
          <p>01 06 07 05 09</p>
        </p>
        <h2>Conditions générales d'utilisation</h2>
        <p>
          Ce Site est mis gratuitement à votre disposition pour votre usage personnel,
          sous réserve du respect des conditions définies ci-après. Votre utilisation de
          ce site implique votre acceptation pleine et entière de l'ensemble de ses
          Conditions d'Utilisation.
        </p>
        Vous ne pouvez utiliser ce site que si vous êtes âgé de plus de 18 ans et habilité
        à signer des contrats qui engagent votre responsabilité (l'utilisation de notre site
        par les mineurs est interdite). Vous serez financièrement responsable de toutes vos
        utilisations du site.
        <p>
          Vous ne pouvez utiliser le site que pour faire des réservations et des achats dans un but
          légitime. Ce site est destiné notamment à la réservation de séjours et aucune utilisation,
          ou détournement de finalité n’est autorisée, notamment pour des finalités contraires à
          l’Ordre Public et aux Bonnes Mœurs.
        </p>
        <p>
          A défaut de respect des présentes, nous nous réservons le droit, à tout moment, sans préavis,
          de vous interdire ou de vous restreindre l'accès à tout ou partie du site, sans préjudice de
          tous dommages – intérêts.
        </p>
        <h2>Limitation de responsabilité et exclusion de garantie</h2>
        <p>
          O’Chalet s’engage à prendre un soin tout particulier dans la véracité des informations
          transmises sur le site notamment concernant les spécifications des produits et les prix
          et de maintenir le site à jour de manière régulière. Toutefois, des informations erronées
          ou des omissions pourront être constatées dues notamment à des erreurs typographiques ou de
          mise en page. Si vous constatez quelques erreurs vous êtes invités à nous les indiquer pour
          qu’il soit procédé aux corrections appropriées.
        </p>
        <p>
          O’Chalet se réserve le droit, à sa seule discrétion, de modifier tout élément du site. Dans
          le cadre de sa politique de mise à jour et d'optimisation du site, O'Chalet peut décider
          de modifier les présentes conditions.
          Toute information datée qui est publiée sur le site ne vaut que pour la date précisée
          uniquement. Ainsi O’Chalet se réserve le droit de mettre fin à l’une quelconque ou à toutes
          ses offres sur Internet sans préavis.
          De surcroît, les offres d’informations, de produits ou de services faites sur le site ne
          constituent ni un quelconque démarchage ni une quelconque sollicitation de la part de
          O’Chalet vis-à-vis de quiconque en vue de leur utilisation dans des zones géographiques
          où la fourniture des informations, produits et services susmentionnés est interdite par
          la loi. O’Chalet ne peut garantir l'accès ininterrompu au site, ni l'absence totale
          d'erreurs. Il peut arriver que le service soit interrompu lors de problèmes de maintenance
          ou réparations, ou suite à des problèmes informatiques, à une perturbation du service
          Internet ou à d'autres circonstances imprévues. De même, O’Chalet n’est pas responsable
          des retards, difficultés d’utilisation, ou de l’incompatibilité entre le présent site
          et des fichiers, votre navigateur ou tout autre programme d’accès au site.
          O’Chalet ne pourra en aucun cas être tenu responsable de tout dommage direct ou
          indirect résultant ou consécutif à la diffusion par une personne tierce d’un virus par
          l’intermédiaire de notre site et susceptible d’infecter votre système informatique à
          la suite de votre connexion à ce site, à l’utilisation de ce site ou à la navigation
          sur ce site. De même O’Chalet ne pourra être responsable de dommage matériel ou accessoire
          (y compris, mais sans s'y limiter, défaillance technique, divulgation de documents
          confidentiels, perte de données), ni de tout autre dommage indirect, quelconque
          survenant lors de ou liés à l'utilisation du site.
        </p>
        <h2>Politique de cookies</h2>
        <p>
          Vous êtes informés que, lors de vos connexions aux Sites ou aux Applications
          et lors de l’utilisation des Services, des cookies (petits fichiers texte
          stockés sur votre terminal), ou autres technologies similaires ou complémentaires
          sont (ou peuvent être) utilisées, sous réserve des choix exprimés par vous lorsque
          ceux-ci sont permis. Ces choix peuvent être modifiés à tout moment, en configurant
          les paramètres du navigateur ou en utilisant certains outils, comme indiqué ci-dessous.
          Un Cookie permet à son émetteur, pendant sa durée de validité, de reconnaître le terminal
          concerné (ordinateur, tablette, smartphone, etc.) à chaque fois que ce terminal accède à
          un contenu numérique comportant des Cookies du même émetteur. Un cookie enregistre des
          informations relatives à la navigation de votre ordinateur sur notre site (les pages que
          vous avez consultées, la date et l’heure de la consultation, etc…) que nous pourrons lire
          lors de vos visites ultérieures.
        </p>
        <p>
          Ces cookies facilitent la navigation et améliorent la convivialité du site internet.
          Vous pouvez choisir d’accepter ou de refuser tout ou partie des cookies, à l’exception
          des cookies de navigation, ceux-ci étant nécessaires au fonctionnement du Site.
          Le refus des autres cookies (audience, personnalisation, publicité) ne vous empêchera
          pas d’accéder au Site bien que certains de ses services et rubriques risquent de fonctionner
          de façon dégradée ou que vous puissiez être privé d’une expérience utilisateur optimisée.
          Nous nous efforçons notamment de vous faire bénéficier de la meilleure expérience de parcours
          sur le site, en personnalisant le contenu des pages selon votre parcours et vos intérêts
          lors de la navigation, ainsi qu’en personnalisant les messages sur le site avec les offres
          commerciales du moment.
          Le refus du dépôt des cookies commerciaux, d’audience et de personnalisation nous
          empêchera d’afficher ces mises en avant et nous conduira à vous fournir un contenu
          standard sans animation.
        </p>
        <h2>Confidentialité et sécurité des informations personnelles</h2>
        <p>
          Nous prenons toutes les précautions utiles, au regard de la nature
          des données et des risques présentés par le traitement, pour préserver
          la sécurité des données et, notamment, empêcher qu'elles soient déformées,
          endommagées, ou que des tiers non autorisés y aient accès.
          Les sous-traitants et fournisseurs qui ont accès à vos informations dans le
          cadre des services qu'ils nous fournissent sont tenus à une stricte obligation de
          confidentialité et ils ne sont pas autorisés à utiliser ces informations à d'autres fins
          que les services qu'ils fournissent à O’Chalet.
        </p>
      </section>
    </>
  );
};

export default Legal;
