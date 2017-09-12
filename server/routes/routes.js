var express = require('express');

var login = require('../handlers/login');
var register = require('../handlers/register');
var sendHomePage = require('../handlers/sendHomePage');

var router = express.Router();

router.get('/', sendHomePage);

router.post('/login', login);

router.post('/register', register);

module.exports = router;