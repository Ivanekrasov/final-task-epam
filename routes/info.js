const express = require('express');
const router = express.Router();

// @route   GET info/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Info Works' }));

module.exports = router;
