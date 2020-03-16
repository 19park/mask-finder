const express = require('express');
const router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
    const data = req.query;
    const options = {
        uri: 'https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1',
        method: 'get',
        json: data
    }

    res.setHeader('Content-type', 'application/json');

    request(options).on('error', next).pipe(res)
});

module.exports = router;
