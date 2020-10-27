// The contoller will handle all CRUD operations:

// Routing:
const router = require('express').Router();
// Model that was created:
let Student = require('../backend/models/student.model');

// Get request to get students in database:
// Return as json:
// Example=> GET:http://localhost:8080/students 
router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Post request with required properties:
// Example=> POST:http://localhost:8080/students/add + JSON Object 
router.route('/add').post((req, res) => {
    const forenames = req.body.forenames;
    const surname = req.body.surname;
    const email_address = req.body.email_address;
    const date_of_birth = Date(req.body.date_of_birth);
    const link_of_degree = req.body.link_of_degree;
    //const firstname = req.body.forenames;
    //const fullname = (req.body.forenames + req.body.surname);

    const newStudent = new Student({
        forenames,
        surname,
        email_address,
        date_of_birth,
        link_of_degree,
        //firstname,
        //fullname
    });

    // Save object to database with post request:
    newStudent.save()
        // Return json:
        .then(() => res.json('New student added to database!'))
        // Return error if unsuccessful:
        .catch(err => res.status(400).json("Error:" + err));
});

// Update information of a single student by id:
// Example=> POST:http://localhost:8080/students/update/{id}
router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.forenames = req.body.forenames;
            student.surname = req.body.surname;
            student.email_address = req.body.email_address;
            student.date_of_birth = req.body.date_of_birth;
            student.link_of_degree = req.body.link_of_degree;
            //student.firstname = req.body.forenames;
            //student.fullname = (req.body.forenames + req.body.surname);

            // Save updated information of car to database:
            car.save()
                .then(() => res.json('The details of the student was updated in the database!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a specific student from database by id:
// Example=> DELETE:http://localhost:8080/students/delete/{id} 
router.route('/delete/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json('Specified student removed from database!'))
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

// Get information of student by id:
// Example=> GET: http://localhost:8080/{id} .
router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
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


