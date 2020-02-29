const express = require('express');
const router = express.Router();

// @route   GET api/weather/current
// @desc    get current weather information
// @access  private
router.get('/', (req, res) => {
    res.send('get current weather information');
});

module.exports = router;