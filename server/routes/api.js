var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/data', function(req, res, next) {
    console.log("recieved");
    res.send({message: "Hello"});
});

module.exports = router;
