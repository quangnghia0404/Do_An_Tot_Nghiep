//* Sử dụng thư viện
const router = require('express').Router();
//* Sử dụng model khác
const dutyCtrl = require('../controllers/dutyCtrl')
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');



router.route('/duty')
    .get(dutyCtrl.getDuties)
    .post(auth, authAdmin, dutyCtrl.createDuty)

router.route('/duty/:id')
    .delete(auth, authAdmin, dutyCtrl.deleteDuty)
    .put(auth, authAdmin, dutyCtrl.updateDuty)




module.exports = router;