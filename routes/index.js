var express = require('express');
var router = express.Router();
const Car = require('../models/Car.model');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// CREATE a new car
router.post('/create', async (req, res) => {
  try {
    console.log(req.body);
    // Create a new car
    const newCar = await Car.create({
      engine_temperature: req.body.engine_temperature,
      car_speed: req.body.car_speed,
      car_location: [{
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }],
      car_fuel_consumtion_rate: req.body.car_fuel_consumtion_rate,
    });
    console.log(newCar);
    // Send the new car to the client
    res.send(newCar);
  }catch (err) {
    // If an error occurs, send it back to the client
    res.status(500).send(err.message);
  }
});

// UPDATE a car
router.put('/update/:id', async (req, res) => {
  try {
    // Find the car with the given ID and update it with the request body
    const car = await Car.findByIdAndUpdate(req.params.id, {
      engine_temperature: req.body.engine_temperature,
      car_speed: req.body.car_speed,
      car_location: [{
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      }],
      car_fuel_consumtion_rate: req.body.car_fuel_consumtion_rate,
    }, 
    { new: true });

    // Send the updated car to the client
    res.send(car);

  } catch (err) {
    // If an error occurs, send it back to the client
    res.status(500).send(err.message);
  }
});

// DELETE a car
router.delete('/delete/:id', async (req, res) => {
  try {
    // Find the car with the given ID and delete it
    const car = await Car.findByIdAndDelete(req.params.id);

    // Send a 204 response to the client
    res.status(204).send( "Car deleted successfully");

  } catch (err) {
    // If an error occurs, send it back to the client
    res.status(500).send(err.message);
  }
});

// GET all cars
router.get('/all', async (req, res) => {
  try {
    // Find all cars
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    // If an error occurs, send it back to the client
    res.status(500).send(err.message);
  }
});

module.exports = router;
