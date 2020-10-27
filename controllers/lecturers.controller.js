// The contoller will handle all CRUD operations:

// Routing:
const router = require('express').Router();
// Model that was created:
let Lecturer = require('../backend/models/lecturer.model');

// Get request to get lecturers in database:
// Return as json:
// Example=> GET:http://localhost:8080/lecturers 
router.route('/').get((req, res) => {
    Lecturer.find()
        .then(lecturers => res.json(lecturers))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Post request with required properties:
// Example=> POST:http://localhost:8080/lecturers/add + JSON Object 
router.route('/add').post((req, res) => {
    const forenames = req.body.forenames;
    const surname = req.body.surname;
    const email_address = req.body.email_address;
    const date_of_birth = Date(req.body.date_of_birth);
    const list_of_degrees = req.body.list_of_degrees;
    const firstname = req.body.forenames;
    const fullname = (req.body.forenames + req.body.surname);

    const newLecturer = new Lecturer({
        forenames,
        surname,
        email_address,
        date_of_birth,
        list_of_degrees,
        firstname,
        fullname
    });

    // Save object to database with post request:
    newLecturer.save()
        // Return json:
        .then(() => res.json('New Lecturer added to database!'))
        // Return error if unsuccessful:
        .catch(err => res.status(400).json("Error:" + err));
});

// Update information of a single lecturer by id:
// Example=> POST:http://localhost:8080/lecturers/update/{id}
router.route('/update/:id').post((req, res) => {
    Lecturer.findById(req.params.id)
        .then(lecturer => {
            lecturer.forenames = req.body.forenames;
            lecturer.surname = req.body.surname;
            lecturer.email_address = req.body.email_address;
            lecturer.date_of_birth = Date(req.body.date_of_birth);
            lecturer.list_of_degrees = req.body.list_of_degrees;
            lecturer.firstname = req.body.forenames;
            lecturer.fullname = (req.body.forenames + req.body.surname);

            // Save updated information of lecturer to database:
            car.save()
                .then(() => res.json('The details of the lecturer were updated on the database!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a specific lecturer from database by id:
// Example=> DELETE:http://localhost:8080/lecturers/delete/{id} 
router.route('/delete/:id').delete((req, res) => {
    Lecturer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Specified lecturer removed from database!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*
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
*/

// Get information of lecturer by id:
// Example=> GET: http://localhost:8080/{id} .
router.route('/:id').get((req, res) => {
    Lecturer.findById(req.params.id)
        .then(lecturer => res.json(lecturer))
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


