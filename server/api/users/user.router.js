var express = require('express');
var router = express.Router();
const { me } = require('./user.controller');

/* GET users listing. */
router.route('/').get(me);

module.exports = router;
