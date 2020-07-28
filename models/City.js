const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    coord: {
        lon: {
            type: Number,
            required: true
        },
        lat: {
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model( 'city', CitySchema);
