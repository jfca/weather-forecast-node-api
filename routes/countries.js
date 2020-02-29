const express = require('express');
const router = express.Router();

// @route   GET api/countries
// @desc    get all countries
// @access  private
router.get('/', (req, res) => {
    res.send('get all countries');
});

module.exports = router;