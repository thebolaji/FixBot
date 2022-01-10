const mongoose = require('mongoose');
const { Schema } = mongoose;

const CarSchema = new Schema({
    engine_temperature: String,
    car_speed: String,
    car_location:[{
            latitude: String,
            longitude: String,
        }],
    car_fuel_consumtion_rate: String, 
});

module.exports = mongoose.model('Car', CarSchema);