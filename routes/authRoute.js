const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authRoute = Router();
const privateKey = require('./../privateKey');

authRoute.post('/', (req, res) => {
    const token = jwt.sign({}, privateKey, { expiresIn: '600s' });
    res.send(token);
});

module.exports = authRoute;
