const express = require('express');
const router = express.Router();

// @route   GET api/weather/5dayforecast
// @desc    get 5 day forecast
// @access  private
router.get('/', (req, res) => {
    res.send('get get 5 day forecast');
});

module.exports = router;