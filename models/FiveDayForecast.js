const mongoose = require('mongoose');

const FiveDayForecastSchema = mongoose.Schema({
    "created": {
        "type": "Date",
        "default": Date.now
    },
    "cod": {
        "type": "Number",
    },
    "message": {
        "type": "Number"
    },
    "cnt": {
        "type": "Number"
    },
    "list": [
        {
            "dt": {
                "type": "Number"
            },
            "main": {
                "temp": {
                    "type": "Number"
                },
                "feels_like": {
                    "type": "Number"
                },
                "temp_min": {
                    "type": "Number"
                },
                "temp_max": {
                    "type": "Number"
                },
                "pressure": {
                    "type": "Number"
                },
                "sea_level": {
                    "type": "Number"
                },
                "grnd_level": {
                    "type": "Number"
                },
                "humidity": {
                    "type": "Number"
                },
                "temp_kf": {
                    "type": "Number"
                }
            },
            "weather": [
                {
                    "id": {
                        "type": "Number"
                    },
                    "main": {
                        "type": "String"
                    },
                    "description": {
                        "type": "String"
                    },
                    "icon": {
                        "type": "String"
                    }
                }
            ],
            "clouds": {
                "all": {
                    "type": "Number"
                }
            },
            "wind": {
                "speed": {
                    "type": "Number"
                },
                "deg": {
                    "type": "Number"
                }
            },
            "sys": {
                "pod": {
                    "type": "String"
                }
            },
            "dt_txt": {
                "type": "Date"
            }
        }
    ],
    "city": {
        "id": {
            "type": "Number"
        },
        "name": {
            "type": "String"
        },
        "coord": {
            "lat": {
                "type": "Number"
            },
            "lon": {
                "type": "Number"
            }
        },
        "country": {
            "type": "String"
        },
        "timezone": {
            "type": "Number"
        },
        "sunrise": {
            "type": "Number"
        },
        "sunset": {
            "type": "Number"
        }
    }
});

module.exports = mongoose.model('fivedayforecast', FiveDayForecastSchema);
