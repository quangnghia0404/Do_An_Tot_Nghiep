const router = require("express").Router();
const memberCtrl = require("../controllers/memberCtrl");

router
    .route("/members")
    .get(memberCtrl.getMembers)
    .post(memberCtrl.createMember);

router
    .route("/members/:id")
    .delete(memberCtrl.deleteMember)
    .put(memberCtrl.updateMember);

module.exports = router;