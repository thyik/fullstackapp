var express = require('express');  // import
var router = express.Router();

var mystr = "I am sending this DATA from backend to Frontend";

/* GET my page */
router.get('/', function(req, res, next) {
    res.send(mystr);
});

module.exports = router;