const express = require('express');
const router = express.Router();

// @route   GET api/cities
// @desc    get all cities
// @access  private
router.get('/', (req, res) => {
    res.send('get all cities');
});

module.exports = router;