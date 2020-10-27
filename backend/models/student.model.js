const mongoose = require('mongoose');
const { Link } = require('react-router-dom');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    forenames: String,
    Surname: String,
    Email_address: String,
    Date_of_birth: { type: Date },
    Degree: { type: Link },
    firstname: String,
    fullname: String
}, {
    require: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;