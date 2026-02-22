const express = require('express');
const { connectformsubmit } = require('./submitform.controller');

const router = express.Router();
router.post('/connectformsubmit', connectformsubmit)

module.exports = router;