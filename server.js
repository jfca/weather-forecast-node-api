const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Forecaster API...'}));

// define routes
app.use('/api/countries', require('./routes/countries'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/weather/current', require('./routes/currentweather'));
app.use('/api/weather/5dayforecast', require('./routes/fivedayforecast'));
//@TODO Implement user authentication feature
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
