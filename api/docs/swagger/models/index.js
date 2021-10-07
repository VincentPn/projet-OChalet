const user = require("./user")
const comment = require("./comment")
const message = require("./message")
const booking = require("./booking")
const authentification = require("./authentification")
const offer = require("./offer")
const admin = require("./admin")
const payment = require("./payment")
const locations = require("./locations")

module.exports = {
    paths:{
        
        '/user':{
            ...user.getUser,
            ...user.updateUser,
            ...user.deleteUser
        },
        '/bookings':{
          ...booking.getBookings,
          ...booking.createBooking
        },
        /*'/booking/{_id}':{
          ...booking.deleteBooking,
          ...booking.updateBooking,
          ...booking.getBooking
        },*/
        '/offers/{_id}':{
          ...offer.getOffer
         
        },
        '/offers?title=_':{
          ...offer.getOffer
         
        },

        '/messages':{
            ...message.getMessages,
            ...message.createMessage
        },
       /* '/messages/{_id}':{
            ...message.getMessage,
            ...message.updatemessage,
            ...message.deletemessage
        },*/
       /* 'message/{_id}/reference': {
            ...messageReferences.createReference,
            ...messageReferences.deleteReference
        },*/
        '/comments':{
            ...comment.getComments,
            ...comment.createComment
        },
        '/comments?id=_':{
            ...comment.deleteComment
        },
        '/signin':{
            ...authentification.login
        },
        '/signup':{
            ...authentification.register
        },
        '/refresh_token':{
            ...authentification.refreshToken
        },
        '/reset_password':{
            ...authentification.resetPassword
        },
        '/confirm_reset':{
            ...authentification.confirmResetPassword
        },
        '/admin':{
         // ...admin.getAdmin,
          //...admin.updateAdmin,
          //...admin.changeAdmin,
          //...admin.deleteAdmin 
        },
        '/admin/user':{
          ...admin.getUsers
        },
        '/admin/user?id=_':{
          ...admin.deleteUser
        },
        '/admin/offers':{
          ...admin.createOffer,
          ...admin.updateOffer
        },
        '/admin/offers?id=_':{
          ...admin.deleteOffers
        },
        '/admin/messages':{
          ...admin.getMessages,
          ...admin.updateMessages
          
        },
        '/admin/messages?id=_':{
          ...admin.deleteteMessages
        },
        '/admin/comments?id=_':{
          ...admin.deleteComment
        },
        '/admin/comments':{
          ...admin.getComments
        },
        '/admin/booking?id=_':{
          ...admin.deleteBooking
        },
        '/admin/bookings':{
          ...admin.updateBooking,
          ...admin.getBookings
        },
        '/locations':{
          ...locations.getLocations
        },
        '/payment_intent':{
          ...payment.createPayment,
          ...payment.updatePayment,
          ...payment.deletePayment
        }
        
  }
}
