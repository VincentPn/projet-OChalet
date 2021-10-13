import { useSelector } from 'react-redux';

import './cgv.scss';

import Header from '../Header';

const Cgv = () => {
  const logged = useSelector((state) => state.user.logged);

  return (
    <>
    <Header logged={logged} />
      <section className="cgv">
        <h1>Conditions Générales de Vente</h1>
        <h2>ARTICLE 1 - RESERVATION / PAIEMENT</h2>
        <p>
          <h2>1.1. Conditions d'inscription et de réservation</h2>
          <p>Toute réservation implique, outre l'acceptation des présentes
            Conditions Générales de Vente, un versement incluant :</p>
          <p>Les frais de dossier: pour toute réservation auprès de O’Chalet
            les frais de dossier s'élèvent à dix-huit (18) euros pour une réservation
            effectuée directement en ligne ou par téléphone par carte bancaire,
            trente-six (36) euros pour une réservation par chèque, chèque vacances
            ou tout autre moyen de paiement. Les frais de dossier seront majorés de
            dix-huit (18) euros si l'acompte a été réglé par carte bancaire sur le
            site mais que le solde du séjour est réglé par chèque, chèque vacances ou
            tout autre moyen de paiement.</p>
          <p>A plus de 30 jours avant départ nous vous demanderons de verser des arrhes
            correspondant à 30 % du prix global de votre location</p>
          <p>Si vous partez dans les 30 jours suivant votre réservation nous vous
            demanderons 100% du prix du séjour (sauf dans le cas du paiement en 4x,
            voir ci-après).</p>
          <p>Toute réservation implique la communication d'une adresse électronique
            valide. A défaut, nous ne pourrons traiter votre demande.
            Le devis ne constitue pas une réservation, ou une option sur une date ou
            un prix donné. Seul le règlement permet de réserver un logement.</p>
          <h2>1.2. Paiement du solde</h2>
          <p>Quel que soit le mode de paiement que vous avez choisi vous disposez lors
            de l'inscription de la possibilité de régler soit (i) l'intégralité du coût
            du séjour, options comprises, (ii) soit uniquement, dans un premier temps,
            un acompte de 30 % du montant total du séjour majoré des frais de dossier
            et de la garantie annulation éventuellement souscrite étant entendu que
            l'intégralité du prix de votre location et des éventuelles prestations
            complémentaires est exigible (sauf en cas de paiement en plusieurs fois):</p>
          <p>- au plus tard trente (30) jours avant le début de votre séjour pour une
            réservation,</p>
          <p>- ou immédiatement lors de la souscription pour toute réservation de dernière
            minute intervenant moins de trente (30) jours avant le début du séjour, dans
            le cadre d'offres spécifiques.</p>
          <p>Le paiement complet du prix ainsi que la transmission d'informations nécessaires
            à l'exécution de la réservation conditionnent l'envoi par mail par O’Chalet du
            document de voyage (comprenant votre contrat de location ou bon de séjour,
            description du site). Votre engagement devient donc définitif dès le 30e jour
            précédant votre séjour. L'engagement de O’Chalet devient définitif après l'envoi
            d'une confirmation de réservation. Si vous n'avez pas réglé le solde dans les délais
            impartis et n'avez pas usé de votre faculté de dédit, O’Chalet se réserve la possibilité
            d'annuler la vente dès le 30e jour précédant votre séjour en fonction de votre réservation,
            sans qu'il ne soit nécessaire que O’Chalet n'effectue de relance auprès du client, et
            d'appliquer en conséquence les conditions de l'annulation prévues à cet effet et définies
            ci-après.</p>
          <h2>1.3. Modes de paiement</h2>
          <p>Lorsque le contrat comporte une possibilité expresse de révision du prix, dans les limites
            prévues à l'article L. 211-12, il doit mentionner les modalités précises de calcul,
            tant à la hausse qu'à la baisse, des variations des prix, et notamment le montant des
            frais de transport et taxes y afférentes, la ou les devises qui peuvent avoir une incidence
            sur le prix du voyage ou du séjour, la part du prix à laquelle s'applique la variation,
            le cours de la ou des devises retenu comme référence lors de l'établissement du prix
            figurant au contrat.</p>
          <p>Cartes bancaires acceptées : Visa, Eurocard / Mastercard, American Express, Carte Bleue</p>
          <p>Chèques acceptés : bancaires, vacances, cadeaux</p>
          <p>Pour tout paiement par un moyen autre que la carte bancaire, des frais de gestion
            d'un montant minimum de dix-huit (18) euros et pouvant aller jusqu'à 10% du prix total
            de la réservation, sont appliqués.</p>
          <p>Nos factures sont à régler au plus tard 30 jours avant la date du départ ou en conformité
            avec les conditions de votre contrat particulier. En cas de retard de paiement, O'Chalet
            pourra suspendre toute prestation ou toute réservation en cours, sans préjudice de toute
            autre voie d'action. Toute somme non payée à l'échéance de la facture entraînera
            l'application de pénalités, d'un montant égal à une fois et demie le taux de l'intérêt légal
            en cours au jour de la mise en demeure préalable. Les pénalités sont exigibles sur simple
            demande de O’Chalet.</p>
          <p>En aucun cas, les paiements ne pourront être suspendus, ni faire l'objet d'une quelconque
            compensation sans l'accord écrit et préalable de O’Chalet. Lorsqu'après le départ, le séjour
            est modifié sur des éléments essentiels, le client peut demander le remboursement des
            prestations non exécutées et non remplacées. Le client ne peut modifier le déroulement
            de son séjour.</p>
          <p>Dans le cas où le séjour est annulé pour des circonstances de force majeure ou pour des
            raisons tenant à la sécurité du voyageur, le client ne peut prétendre à une
            quelconque indemnité.</p>
          <p>Pour tout paiement en espèce effectué directement sur site, dans la limite des
            plafonds légaux en vigueur à la date dudit paiement, nous nous réservons la possibilité
            d'appliquer des frais de service d'un montant de cinq (5) euros.</p>
          <p>Paiement avec une subvention: Dans le cadre d'un paiement réalisé en tout ou partie
            à l'aide d'une subvention concédé par votre Comité d'Entreprise, la subvention ne fera
            en aucun cas l'objet d'un quelconque remboursement, notamment en cas d'annulation d'un 
            séjour.
            Délais de paiement : Des délais de paiement peuvent vous être octroyés sans frais ou bien
            avec frais avec notre partenaire établissement bancaire, sous certaines conditions.</p>
          <h2>1.4. Votre documents de voyage</h2>
          <p>Sous réserve de l'acquittement du solde de votre séjour, vous recevrez votre document
            de voyage dans les 24 heures suivant le règlement total du séjour avant le début de
            votre séjour, soit par courrier électronique vous renvoyant sur un lien dédié à votre
            compte personnel soit votre Documents de Voyage qui contient tous les renseignements
            pratiques pour vous aider à vous organiser et le contrat de location ou le bon de séjour
            de votre hébergement et ses prestations réservées.</p>
        </p>
        <h2>ARTICLE 2 - PRIX</h2>
        <p>
          <h2>2.1. Prix</h2>
          <p>Les prix des prestations sont établis en fonction des données économiques en vigueur
            à la date de leur fixation. Une modification des taxes applicables peut nous amener à
            modifier le prix desdites prestations. Ils sont flexibles et variables en application
            de différents critères personnalisables tels que la date de réservation, la date de
            début de séjour, la durée du séjour, la typologie de l'hébergement, l'ajout de
            prestations annexes.</p>
          <h2>2.2. Hébergement</h2>
          <p>Nos prix s'entendent toutes taxes comprises et incluent la sous-location du logement,
            charges comprises (eau, électricité, chauffage), à l'exception de la taxe de séjour,
            des prestations annexes et des primes d'assurances facultatives, et des frais de dossier,
            payables à la réservation quand ils sont dus. Nous vous rappelons qu'un logement est prévu
            pour un nombre déterminé d'occupants à la location et ne saurait en aucun cas être habité
            par un nombre supérieur de personnes. Il est rappelé qu'un enfant en bas âge est considéré
            comme un occupant à part entière. Nos balcons, loggias, terrasses et rez-de-jardin ne sont
            pas tous équipés de sièges et de tables.</p>
          <p>Attention : En cas de non-respect de la capacité maximale de l'hébergement, le fournisseur
            sera en droit de refuser catégoriquement l'accès au logement et aucun remboursement ne
            sera envisageable.</p>
          <h2>2.3. Prestations Optionnelles</h2>
          <p>Nos tarifs hébergement ne comprennent pas les prestations optionnelles supplémentaires
            proposées en catalogue, sur notre site Internet ou sur place.</p>
          <p>Dans l'éventualité d'une prestation de voyage liée, nous vous informons que :</p>
        <p> 1- les droits applicables aux forfaits touristiques ne s'appliquent pas ;</p>
        <p> 2- le prestataire sera responsable de la bonne exécution contractuelle du service ;</p>
        <p> 3- vous bénéficiez d'une protection en cas d'insolvabilité.</p>
          <h2>2.4 Réduction</h2>
          <p>Les réductions mentionnées sur nos supports de vente ne sont applicables que sur la
            partie hébergement. Ces offres sont soumises à des conditions particulières,
            communiquées avec l'offre.</p>
        </p>
        <h2>ARTICLE 3 - TAXE DE SEJOUR</h2>
        <p>
          La taxe de séjour, collectée pour le compte des municipalités,
          n'est pas incluse dans nos tarifs. Son montant est déterminé par
          personne et par jour et est variable en fonction des destinations.
          Elle est à acquitter selon les cas soit sur place soit lors de votre réservation.
        </p>
        <h2>ARTICLE 4 - MODIFICATION / ANNULATION DE SEJOUR PAR LE CLIENT</h2>
          <p>Nous nous efforcerons d'accepter autant que possible vos demandes de modification,
            de date ou lieu de séjour ou de typologie ou de prestations optionnelles dans la limite
            des disponibilités. Vous pouvez modifier un séjour (dans la limite des places disponibles)
            ou le céder moyennant des frais. Vous devez nous informer de votre demande de modification à
            O’Chalet par mail à l'adresse suivante : contact@ochalet.fr ou directement dans votre compte
            personnel. Nous attirons votre attention sur le fait que ce type de modification est
            générateur pour O’Chalet de coûts variables en fonction de la date à laquelle vous formulez
            votre demande et en fonction du type de modification. </p>
          <p>En cas d'annulation, vous devez nous en informer par mail à l'adresse contact@ochalet.fr: la
            date de réception de ce mail déterminant la date d'annulation. Quelle que soit la date à
            laquelle l'annulation intervient, les frais de dossier restent acquis à O’Chalet et ne sont
            pas remboursés. L'annulation de votre fait emporte les conséquences financières suivantes :
            Annulation plus de 60 jours avant le départ : des frais d'annulation de 50 euros
            seront retenus ;</p>
          <p>Annulation entre 60 jours et 46 jours avant le départ : 30 % du montant total du
            séjour seront dus et payables immédiatement ;</p>
          <p>Annulation entre 45 jours et 30 jours avant le départ : 50 % du montant total du
            séjour seront dus et payables immédiatement ;</p>
          <p>Annulation entre 29 jours et 15 jours avant le départ : 75 % du montant total du
            séjour seront dus et payables immédiatement ;</p>
          <p>Annulation moins de 15 jours avant le départ : le prix total du séjour, options comprises,
            restera dû à O’Chalet;</p>
          <p>Toute demande d'annulation sera définitive.</p>
          <p>Tout séjour commencé est considéré comme intégralement consommé par vous et ne donne
            lieu à aucun remboursement ni avoir. Au cas où vous ne vous présentiez pas sur son
            lieu de séjour, O’Chalet retiendra l'intégralité du montant total de votre séjour,
            y compris les options.</p>
          <p>Nous attirons votre attention sur le fait que les activités liées à l'organisation et
            à la vente de voyages ou de séjours à une date déterminée ou à une période spécifiée
            ne sont pas soumises au délai de rétractation de quatorze (14) jours applicable à la
            vente à distance.</p>
          <p>REMBOURSEMENT GARANTI LIÉ AU COVID-19 : Remboursement si votre séjour
            est rendu impossible par des dispositions prises par les Pouvoirs Publics : confinement
            de votre lieu de domicile ou de votre lieu de destination. Ce remboursement s’applique
            également si l’hébergeur est dans l'obligation de renoncer à la location vacances
            (conditions sanitaires, interdiction de louer etc.) ou si les Pouvoirs Publics décident
            de fermer des stations de ski. Les montants versés dans le cadre du règlement
            du séjour seront remboursés déduction faite des frais de dossiers qui s’élèvent à 
            18€ TTC.</p>
          <h2>4.3. Annulation et modification d'option</h2>
          <p>En cas d'annulation d'une prestation de location de matériel de ski, de forfaits remontées
            mécaniques ou toutes autres options commandées, l'annulation doit nous être notifiée
            impérativement par téléphone et email au plus tard 15 jours avant le début du séjour pour
            donner droit au remboursement de ces prestations. En d'autres termes aucune annulation
            d'option n'est possible à moins de 15 jours de la date de début du séjour ;
            En cas de non retrait d'une prestation ou de restitution avant l'échéance, vous ne
            pourrez prétendre à aucun remboursement</p> 
            <p>En cas de modification d'options
              (matériel de ski, forfaits ou autres) des frais de 15 euros seront appliqués ; En cas
              d'annulation d'options (notamment de matériel de ski, forfaits ou autres) le barème de
              frais d'annulation de dossier ci-dessus sera appliqué.</p>
          <p>Si vous ne vous présentez pas sur le lieu de votre séjour, nous retenons les frais de
            dossier initialement versées le cas échéant et le montant des primes d'assurance
            éventuellement souscrites</p>
        <h2>ARTICLE 5 - MODIFICATION OU ANNULATION DU FAIT DE O’CHALET</h2>
        <p>
          O’Chalet adresse un mail de confirmation de réservation si vous avez réservé en ligne.
          Si les circonstances obligent et seulement en cas de survenance d'événements de force
          majeure ou du fait d'un tiers, indépendants de sa volonté, O’Chalet, pourrait être dans
          l'obligation de modifier partiellement ou totalement ses programmes (fermeture totale ou
          partielle d'une Résidence, d'un équipement commun de type piscine, restaurant).
          Dans ce cas, O’Chalet vous informera de la modification opérée sur le séjour, qui pourra
          accepter ou refuser de conserver le séjour modifié. En cas de non acceptation de votre
          séjour modifier, O’Chalet vous remboursera l'intégralité des sommes versées.
          Vous devrez faire connaître votre décision dans les meilleurs délais.
        </p>
        <h2>ARTICLE 6 - ARRIVÉE ET DÉPART</h2>
        <p>
          La carte de crédit utilisée à la réservation ainsi que des papiers d'identités valides
          devront être présentés à l'arrivée. A défaut, l'accès à votre hébergement pourra vous être
          refusé par O’Chalet. O’Chalet attire votre attention sur le fait qu'à défaut de paiement
          complet de prix en dépit des relances, nous ne pourrons procéder à la remise des clés si vous
          vous présentez sur le lieu de votre séjour. Pour tout type de séjour, l'heure de la remise et
          de la restitution des clefs sont indiquées dans le document de voyage. Dans le cas d'une
          restitution des clés au-delà de l'heure indiquée au document de voyage, le jour de votre
          départ (le samedi dans la majorité des cas), une nuitée complémentaire vous sera facturée.
          Il pourra vous être demandé de remplir une fiche de police lors de votre arrivée, en
          application de la réglementation en vigueur dans certains pays.
        </p>
        <h2>ARTICLE 7 - INTERRUPTION DE SÉJOUR / INTERRUPTION D'ACTIVITÉ SPORTIVE OU DE LOISIRS</h2>
        <p>
          Un départ prématuré ou une interruption d'activité sportive ou de loisir réservé
          auprès de O’Chalet, ne pourra donner lieu à un quelconque remboursement de la part
          de ce dernier. Toutefois, si le vous avez souscrit au contrat d'assurance proposé par
          O’Chalet (voir article 18), vous pourrez, selon la cause du départ ou de l'interruption
          d'activité dûment justifiée et rentrant dans le respect des conditions du contrat,
          bénéficier d'un remboursement au prorata temporis, à compter du jour de votre départ
          ou du jour de l'interruption de l'activité. Concernant l'interruption de séjour, vous ne
          pourrez bénéficier du remboursement au prorata du séjour qu'à condition d'avoir totalement
          libéré le chalet.
        </p>
      </section>
    </>
  );
};

export default Cgv;
