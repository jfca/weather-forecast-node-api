const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('config');
const citiesURI = config.get('citiesURI');

const City = require('../models/City');

const getCities = async () => {
    try {
        const res = await axios.get(citiesURI);
        return res.data;
    } catch (e) {
        console.error(e.message);
        throw e;
    }
};

// @route   GET api/cities/load
// @desc    load all cities into database
// @access  public
router.get('/loadcities', async (req, res) => {
    try {
        const data = await getCities();

        await City.deleteMany({}, (error) => {
            if (error) {
                console.log(error);
            }
        });

        await City.insertMany(data, { ordered: false }, (error, results) => {
            if (error) {
                console.error(error);
            } else {
                console.log('insertMany succeeded');
            }
        });

        //@TODO investigate function, returns zero when documents inserted into db
        const numCities = await City.countDocuments({});
        await res.json(numCities);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/cities/count
// @desc    get count of all cities
// @access  private
router.get('/count', async (req, res) => {
    try {
        const numCities = await City.countDocuments({});
        await res.json(numCities);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/cities/countrycode/:code
// @desc    get all cities from country alpha code
// @access  private
router.get('/countrycode/:code', async (req, res) => {
    try {
        const cities = await City.find({ country: req.params.code });
        await res.json(cities);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/cities/name/:code
// @desc    get all cities from city name
// @access  private
router.get('/name/:name', async (req, res) => {
    try {
        const cities = await City.find({ name: req.params.name });
        await res.json(cities);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/cities/city/id/:id
// @desc    get city object from id
// @access  private
router.get('/city/id/:id', async (req, res) => {
    try {
        const city = await City.findOne({ 'id': req.params.id });
        await res.json(city);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/cities/city/name/:name
// @desc    get city object from name and country code
// @access  private
router.get('/city/name/:name', async (req, res) => {
    try {
        let query = {};
        const queryArr = req.params.name.split(',');
        if (queryArr.length === 2) {
            query['name'] = { $regex: queryArr[0].trim(), $options: 'i' };
            query['country'] = { $regex: queryArr[1].trim(), $options: 'i' };
        } else {
            throw 'Bad query string';
        }
        const city = await City.findOne(query);
        await res.json(city);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// // @route   GET api/cities/name/:name
// // @desc    get all city objects from city name
// // @access  private
// router.get('/name/:name', async (req, res) => {
//     try {
//         let query = {};
//         const queryArr = req.params.name.split(',');
//         console.log('queryArr');
//         console.log(queryArr);
//         switch (queryArr.length) {
//             case 2:
//                 query['name'] = { $regex: queryArr[0].trim(), $options: 'i' };
//                 query['country'] = { $regex: queryArr[1].trim(), $options: 'i' };
//                 break;
//             case 1:
//                 if (queryArr[0].trim().length === 2) {
//                     query['country'] = { $regex: queryArr[0].trim(), $options: 'i' };
//                 } else {
//                     query['name'] = { $regex: queryArr[0].trim(), $options: 'i' };
//                 }
//                 break;
//             default:
//                 throw 'Bad query string';
//         }
//         console.log('query');
//         console.log(query);
//         const city = await City.find(query);
//         await res.json(city);
//     } catch (e) {
//         console.error(e.message);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;
