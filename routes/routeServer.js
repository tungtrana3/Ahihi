const router = require('express').Router()
var AccountController = require('../controller/AccountController');
var proType = require('./routeProductType');
var routeAccount = require('./routeAccount');
var routeProduct = require('./routeProduct');

//Navigation
router.get('/', function (req, res, next) {
  req.session.isLogin = false
  return res.render('login/login', { mgs: "" });
});

router.get('/home', function (req, res) {
  if (req.session.isLogin) {
    return res.render('pages/index');
  }
  else {
    return res.render('login/login');
  }
});
router.route('/login')
  .post(AccountController.login)
//Product
router.use('/productType', proType);
router.use('/account', routeAccount);
router.use('/product', routeProduct);

module.exports = router;