const express = require('express');
const router = express.Router();
const Car = require('../models/Car.model');
const cache = require('../utils/cache');

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ message: "Hello world 🇵🇹" });
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
router.get('/car/all', cache(10), async (req, res) => {
  try {
    // Find all cars
    const {id} = req.query
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    // If an error occurs, send it back to the client
    res.status(500).send(err.message);
  }
});

// Get one car
router.get('/car/:id', cache(10), async (req, res) => {
  try {
    const {id} = req.params;
    // Find the car with the given ID
    const car = await Car.findById(req.params.id);
    // Send the car to the client
    return res.status(200).json(car);
} catch (err) {
    // If an error occurs, send it back to the client
    res.status(500).send(err.message);
  }
});

// Get all cars within a radius
router.get('/car/radius/:latitude/:longitude/:radius', cache(10), async (req, res) => {
  try {
    const {latitude, longitude, radius} = req.params;
    // Find all cars within the given radius
    const cars = await Car.find({
      car_location: {
        $geoWithin: {
          $centerSphere: [
            [latitude, longitude],
            radius / 6378.1
          ]
        }
      }
    });
    // Send the cars to the client
    return res.status(200).json(cars);
  } catch (err) {
    // If an error occurs, send it back to the client
    res.status(500).send(err.message);
  }
});






module.exports = router;
