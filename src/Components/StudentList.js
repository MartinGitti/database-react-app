import React, { Component } from 'react'; // Import React library.
import { Link } from 'react-router-dom'; // Import routing component.
import axios from 'axios'; // Import axios to send http requests.
import '../App.css'; // Styling sheet.
//import OlderStudentsList from './OlderModels';// Import component.

// Create 'Student' component constructor:
// Blueprint for every student in database...
const Student = props => (
    <tr>
        <td>{props.student.forenames}</td>
        <td>{props.student.surname}</td>
        <td>{props.student.email_address}</td>
        <td>{props.student.date_of_birth}</td>
        <td>{props.student.link_to_degree}</td>
        <td>{props.student.firstname}</td>
        <td>{props.student.fullname}</td>
        {/* Link to Edit page to update vehicle
         or remove vehicle from database with use of 'deleteStudent' function. */}
        <td>
            <Link to={"/edit/" + props.student._id}>edit</Link> | <a href="#" onClick={() => { props.deleteStudent(props.student._id) }}>delete</a>
        </td>
    </tr>
)
// List all students stored in database:
class StudentsList extends Component {
    constructor(props) {
        super(props);

        this.deleteStudent = this.deleteStudent.bind(this)
        // Empty array that car details will be stored in:
        this.state = { students: [] };
    }
    // return all students in database upon mount:
    componentDidMount() {
        axios.get('http://localhost:8080/students')
            .then(response => {
                this.setState({ students: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    // Remove an individual student from database:
    // Each student has an option to be removed or updated individually...
    deleteStudent(id) {
        axios.delete('http://localhost:8080/students/delete/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            students: this.state.students.filter(cl => cl._id !== id)
        })
    }
    // Map through and return students listed in database: 
    // Each student in database has a unique 'key' value...
    studentList() {
        return this.state.students.map(currentstudent => {
            return <Student student={currentstudent} deleteStudent={this.deleteStudent} key={currentstudent._id} />;
        })
    }
    render() {
        return (
            <div className='students-list'>
                <h3>Students In Database:</h3>
                <hr />
                <table className="table">
                    <thead className="thead-light">
                        {/* Students displayed in table format: */}
                        <tr>
                            <th>Forenames</th>
                            <th>Surname</th>
                            <th>Email Address</th>
                            <th>Date of birth</th>
                            <th>Link to degree</th>
                            <th>Firstname</th>
                            <th>Fullname</th>
                            <th>Edit|Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Pass through mapped student list: */}
                        {/* student details displayed in table body... */}
                        {this.studentList()}
                    </tbody>
                </table>
                {/*<OlderStudentsList />{/* Return list of all cars older than 5 years. */}
            </div>
        )
    }
}

export default StudentsList;
