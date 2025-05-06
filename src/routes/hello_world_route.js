const express = require('express');
const router = express.Router();

const { HelloWorldController } = require('../controllers');

router.get('/', HelloWorldController.Answer);

module.exports = router;