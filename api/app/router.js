const {Router} = require('express');
const router = Router();
const dataValidator = require("./services/dataValidator")
const {verifyAccessToken, isAdmin} = require('./services/authJwt')
const redis = require("./services/cache")

const {
    userRoutes,
    offerRoutes,
    locationRoutes,
    messageRoutes,
    bookingRoutes,
    commentRoutes,
    authRoutes,
    adminRoutes,
    paymentRoutes
} = require('./routes/index');



router.use(redis, dataValidator)

router.use(authRoutes, offerRoutes, locationRoutes)

router.use(verifyAccessToken)
router.use([userRoutes, messageRoutes, bookingRoutes, commentRoutes, paymentRoutes])
router.use(isAdmin, adminRoutes)


module.exports = router;
