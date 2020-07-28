const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    "alpha-2": {
        type: String,
        required: true
    },
    "country-code": {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('country', CountrySchema);