var express = require('express');
var router = express.Router();

const me = async (req, res) => res.status(200).send(req.user);

/* GET users listing. */
router.get('/', me);

module.exports = router;
