var express = require('express');
var router = express.Router();

const { signup, userList, deleteUser, signin, signout, isAuth } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
/* GET users listing. */
router.post('/signup',auth, signup);
router.get('/userList', auth, userList);
router.delete('/delete', auth, deleteUser);
router.post('/signin', signin);
router.get('/signout', auth, signout);
router.get('/isAuth', isAuth);

module.exports = router;
