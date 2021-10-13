const {Offer, Booking} = require('../models');

const offerController = {

    findAllorFilter: async (request, response) => {
        try {
            const {id, title, location_id} = request.query;
            if(title){

              const offers = await Offer.findByTitle(title);
              for(const offer of offers) {
                for(const field in offer) {
                  if(!offer[field] && field !== "offer_status") delete offer[field];
                }
                offer.bookings = await Booking.findByOffer(offer.id);
              }
              response.json(offers);
              
            }else if(location_id) {

              const offers = await Offer.findByLocation(location_id);
              for(const offer of offers) {
                for(const field in offer) {
                  if(!offer[field] && field !== "offer_status") delete offer[field];
                }
                offer.bookings = await Booking.findByOffer(offer.id);
              }
              response.json(offers);

            }else if(id) {
              const offer = await Offer.findById(id);
              for(const field in offer) {
                if(!offer[field] && field !== "offer_status") delete offer[field];
              }
              offer.bookings = await Booking.findByOffer(offer.id);
              response.json(offer);
            }
            else {
              const offers = await Offer.findAll();
              for(const offer of offers) {
                for(const field in offer) {
                  if(!offer[field] && field !== "offer_status") delete offer[field];
                }
                offer.bookings = await Booking.findByOffer(offer.id);
              }
              response.json(offers);
            }
            
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    create: async (request, response) => {
      try {
        
        const newOffer = await new Offer(request.body).create();
        if(!newOffer.id) throw new Error('database create offer error');
        response.status(201).json({message: "offer created"});

      } catch (error) {
          response.status(500).send(error.message);
      }
    },

    update: async (request, response) => {
      try {
        const offer = await Offer.findById(request.body.id);

        for(const field in request.body){
          offer[field] = request.body[field];
        };
        await offer.update();
         
        response.status(204).json('Update done');

      } catch (error) {
        response.status(500).send(error.message);
      }
    },

  

  delete: async (request, response) => {
      try {
          const offerID = request.query.id;
          const confirmation = await Offer.delete(offerID);
          
          if(!confirmation) return response.status(404).send({message: `no offer found with id ${offerID}`});
          response.status(200).json(`Offer with id ${offerID} deleted`);
          
      } catch(error) {
          response.status(500).send(error.message);
      }
  }

}

module.exports = offerController;
