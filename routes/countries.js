const express = require('express');
const router = express.Router();
const config = require('config');
const axios = require('axios');
const countriesURI = config.get('countriesURI');

const Country = require('../models/Country');

const getCountries = async () => {
    try {
        const res = await axios.get(countriesURI);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

// @route   GET api/countries/load
// @desc    load list of countries from JSON document to database
// @access  private
router.get('/loadcountries', async (req, res) => {
    try {
        const data = await getCountries();

        await Country.deleteMany({}, (error) => {
            if (error) {
                console.log(error);
            }
        });

        await Country.insertMany(data, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log('insertMany succeeded');
            }
        });

        await res.json({ msg: `Inserted ${data.length} documents`});
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/countries
// @desc    get all country objects
// @access  private
router.get('/', async (req, res) => {
    try {
        const countries = await Country.find({});
        await res.json(countries);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/countries/code/:code
// @desc    get country object by two-letter alpha code
// @access  private
router.get('/code/:code', async (req, res) => {
    try {
        const country = await Country.findOne({ 'country-code': req.params.code });
        await res.json(country);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/countries/alpha/:id
// @desc    get country object by three letter numeric id
// @access  private
router.get('/alpha/:id', async (req, res) => {
    console.log('id')
    try {
        const country = await Country.findOne({ 'alpha-2': req.params.id });
        await res.json(country);
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;