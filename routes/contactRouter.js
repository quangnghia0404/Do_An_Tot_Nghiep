const router = require("express").Router();
const contactCtrl = require("../controllers/contactCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/registercontact", contactCtrl.registerContact);

router.get("/inforcontact", contactCtrl.getContact);

router
    .route("/inforcontact/:id")
    .delete(auth, authAdmin, contactCtrl.deleteContact);

module.exports = router;