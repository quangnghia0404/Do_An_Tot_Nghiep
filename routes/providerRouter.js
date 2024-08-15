const router = require("express").Router();
const providerCtrl = require("../controllers/providerCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
    .route("/providers")
    .get(providerCtrl.getProviders)
    .post(auth, authAdmin, providerCtrl.createProvider);

router
    .route("/providers/:id")
    .delete(auth, authAdmin, providerCtrl.deleteProvider)
    .put(auth, authAdmin, providerCtrl.updateProvider);

module.exports = router;