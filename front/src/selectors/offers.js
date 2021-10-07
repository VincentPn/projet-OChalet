/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */

/**
@param {number} searchedId
@param {string} findOffers
@return {Object}
*/

export function filterOffers(offers, searchedId) {
    const offer = offers.filter((testedOffer) => {
      return testedOffer.location_id.toString() === searchedId;
    });
    return offer;
  }
  
  export function findOffer(offers, searchedId) {
    const offer = offers.find((testedOffer) => {
      return testedOffer.id.toString() === searchedId;
    });
    return offer;
  }
  
  export function getOfferSelected(state) {
    return state.offers.offerSelected;
  }
  