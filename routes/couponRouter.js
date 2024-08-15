const router = require("express").Router();
const couponCtrl = require("../controllers/couponCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
    .route("/coupons")
    .get(couponCtrl.getCoupons)
    .post(auth, authAdmin, couponCtrl.createCoupon);

router
    .route("/coupons/:id")
    .delete(auth, authAdmin, couponCtrl.deleteCoupon)
    .put(auth, authAdmin, couponCtrl.updateCoupon);

module.exports = router;