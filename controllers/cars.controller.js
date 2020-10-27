// The contoller will handle all CRUD operations:

// Routing:
const router = require('express').Router();
// Model that was created:
let Car = require('.././backend/models/car.model');

// Get request to get cars in database:
// Return as json:
// Example=> GET:http://localhost:8080/cars 
router.route('/').get((req, res) => {
    Car.find()
        .then(cars => res.json(cars))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Post request with required properties:
// Example=> POST:http://localhost:8080/cars/add + JSON Object 
router.route('/add').post((req, res) => {
    const model = Number(req.body.model);
    const make = req.body.make;
    const colour = req.body.colour;
    const registration = req.body.registration;
    const number = req.body.number;
    const owner = req.body.owner;
    const address = req.body.address;

    const newCar = new Car({
        model,
        make,
        colour,
        registration,
        number,
        owner,
        address
    });

    // Save object to database with post request:
    newCar.save()
        // Return json:
        .then(() => res.json('Car added to database!'))
        // Return error if unsuccessful:
        .catch(err => res.status(400).json("Error:" + err));
});

// Update information of a single car by id:
// Example=> POST:http://localhost:8080/cars/update/{id}
router.route('/update/:id').post((req, res) => {
    Car.findById(req.params.id)
        .then(car => {
            car.model = Number(req.body.model);
            car.make = req.body.make;
            car.colour = req.body.colour;
            car.registration = req.body.registration;
            car.number = req.body.number;
            car.owner = req.body.owner;
            car.address = req.body.address;

            // Save updated information of car to database:
            car.save()
                .then(() => res.json('Car details updated on database!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a specific car from database by id:
// Example=> DELETE:http://localhost:8080/cars/delete/{id} 
router.route('/delete/:id').delete((req, res) => {
    Car.findByIdAndDelete(req.params.id)
        .then(() => res.json('Specified car removed from database!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Fetch cars older then 5 years:
router.route('/olderModels').get((req, res) => {
    Car.find({ model: { $lte: 2015 } }).exec((err, cars) => {
        if (err) {
            res.json({
                message: 'Failed to fetch cars older than 5 years!'
            })
        }
        res.status(200).json(cars)
    })
})

// Get information of car by id:
// Example=> GET: http://localhost:8080/{id} .
router.route('/:id').get((req, res) => {
    Car.findById(req.params.id)
        .then(car => res.json(car))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

/*
****Implement later:****

// Update information of multiple cars:
// Example=> POST:
router.route('/update/all').post((req, res) => {
    Car.updateMany()
        .then(car => {
            car.model = req.body.model;
            car.make = req.body.make;
            car.colour = req.body.colour;
            car.registration = req.body.registration;
            car.number = req.body.number;
            car.owner = req.body.owner;
            car.address = req.body.address;

            // Save updated information of cars in database:
            car.save()
                .then(() => res.json('All car details updated on database!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
*/


