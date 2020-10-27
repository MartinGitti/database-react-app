const { Link } = require('react-router-dom');

const Schema = mongoose.Schema;

const lecturerSchema = new Schema({
    Forenames: String,
    Surname: String,
    Email_address: String,
    Date_of_birth: { type: Date },
    Degree: String,
    firstname: Forenames,
    fullname: (FormData + Surname)
}, {
    require: true,
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = Lecturer;