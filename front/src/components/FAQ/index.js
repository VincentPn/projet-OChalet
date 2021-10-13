import { useSelector } from 'react-redux';

import './faq.scss';

import Header from '../Header';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// import 'react-accessible-accordion/dist/fancy-example.css';

import './faq.scss';

const Faq = () => {
  const logged = useSelector((state) => state.user.logged);

  return (
    <>
      <Header logged={logged} />
      <section className="faq">
        <h1>Foire aux questions</h1>
        <Accordion allowZeroExpanded={true}>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Comment faire pour réserver un chalet ?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <p>
                          C'est très simple ! La seule contrainte est d'être connecté à votre espace utilisateur (ou d'en créer un si vous n'en avez pas). Il vous suffit ensuite d'aller sur l'annonce souhaitée, de choisir vos dates et de cliquer sur le bouton réserver (les dates grisées dans le calendrier ne sont plus disponibles). Vous vérifiez ensuite vos informations et validez. Vient alors l'étape du paiement. La réservation sera effective après validation de votre règlement.
                        </p>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            C'est qui le plus grand helper du monde qui a eu la chance d'accompagner les <strong>Uther</strong> tout au long de leur aventure ?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className="oclock-masters">
                        <img src="https://media-exp1.licdn.com/dms/image/C5603AQFkTPwDTF_dxg/profile-displayphoto-shrink_800_800/0/1581375889942?e=1639612800&v=beta&t=GjorZ_2JOGrUzJ6nQHRnVME_oMn9Yj4gLp6m9wP_XNo" alt="" />
                        <h3>Aleks</h3>
                      </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Et c'est qui le deuxième plus grand helper du monde qui a eu la chance d'accompagner les <strong>Uther</strong> pour leur apothéose ?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className="oclock-masters">
                        <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGIBVlAFghmjQ/profile-displayphoto-shrink_800_800/0/1596626590977?e=1639612800&v=beta&t=tincmSyJeS3fhbiGz3MgYhVElPMKphYn9EhRCPJtVdc" alt="" />
                        <h3>Baptiste</h3>
                      </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Et notre roi du back, vous le connaissez ?
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div className="oclock-masters">
                        <img src="https://media-exp1.licdn.com/dms/image/C5603AQHGlJd5eWCWIA/profile-displayphoto-shrink_800_800/0/1517860042916?e=1639612800&v=beta&t=VTVIAkxSWpmvefkII_XYjYgJsVlvmvYaGl4S3rODQyU" alt="" />
                        <h3>Nico</h3>
                      </div>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
      </section>
    </>
  );
}

export default Faq;
