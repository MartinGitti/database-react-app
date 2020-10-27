import React, { Component } from 'react'; // React library.
import axios from 'axios'; // Easy HTTP requests with axios.
import '../App.css' // Styling Sheet.

// Import React-bootstrap components:
import Button from 'react-bootstrap/Button';
import { FormControl, Form } from 'react-bootstrap';

class CreateStudent extends Component {
    constructor(props) {
        super(props)
        // Pass in all binding methods:
        this.handleChangeForenames = this.handleChangeForenames.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeEmail_address = this.handleChangeEmail_address.bind(this);
        this.handleChangeDate_of_birth = this.handleChangeDate_of_birth.bind(this);
        this.handleChangeLink_to_degree = this.handleChangeLink_to_degree.bind(this);
        //this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        //this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            forenames: '',
            surname: '',
            email_address: '',
            date_of_birth: '',
            link_to_degree: '',
            firstname: '',
            fullname: '',
            results: [] // Empty array as container to store details.
        }
    }
    // Change handlers for car properties:
    handleChangeForenames = (e) => {
        this.setState({
            forenames: e.target.value
        })
    }
    handleChangeSurname = (e) => {
        this.setState({
            surname: e.target.value
        })
    }
    handleChangeEmail_address = (e) => {
        this.setState({
            email_address: e.target.value
        })
    }
    handleChangeDate_of_birth = (e) => {
        this.setState({
            date_of_birth: e.target.value
        })
    }
    handleChangeLink_to_degree = (e) => {
        this.setState({
            link_to_degree: e.target.value
        })
    }
    /*
    handleChangeFirstname = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }
    handleChangeFullname = (e) => {
        this.setState({
            fullname: e.target.value
        })
    }
     Create/add new student to database:
     */
    addStudent = () => {
        // Similar to backend POST method.
        // Properties defined that will be passed into array object:
        const { forenames, surname, email_address, date_of_birth, link_to_degree, /*firstname, fullname*/ } = this.setState;
        // Fetch data from backend and return to frontend with http requests:
        axios.post(`http://localhost:8080/students/add`, {
            mothod: 'POST',// Call Request.
            headers: {
                'Content-Type': 'application/json'// JSON format.
            },
            // Display json content as json string for readibility:
            body: JSON.stringify({ forenames, surname, email_address, date_of_birth, link_to_degree, /*firstname, fullname*/ })
        })
            .then((res) => res.json()) // Return result to json.
            .then((results) => {
                // Alert upon updates & reload to display updated content:
                alert(results.status)
                window.location.reload()
            })
    };
    // Submit handler:
    handleSubmit = (e) => {
        e.preventDefault(); // Prevent page from default behaviour.
        // Define object properties:
        const { forenames, surname, email_address, date_of_birth, link_to_degree, /*firstname, fullname*/ } = this.state;
        fetch('http://localhost:8080/students/add', {
            method: 'POST', // Post Request.
            headers: {
                'Content-Type': 'application/json'
            },
            // Display json content as json string for readibility:
            body: JSON.stringify({ forenames, surname, email_address, date_of_birth, link_to_degree, /*firstname, fullname*/ })
        })
            .then((res) => res.json()) // Return result to json.
            .then(this.componentDidMount()) // Display updated data after mount.
            .then((response) => alert('Student added!')) // Inform upon submit.
            .catch((error) => console.log('Error:', error)); // If unsuccessful, return error.
    }
    // Render data after change & updates when successful:
    componentDidMount() {
        fetch('http://localhost:8080/students')
            .then((res) => res.json()) // Convert res to json.
            .then((data) =>
                this.setState({
                    results: data // Display result of data after mount.
                })
            )
            .catch((err) => console.log(err)); // Error callback if unsuccessful.
    }
    render() {
        return (
            <div className='create-form-div'>
                <h1 className='heading'>Add New Student:</h1>
                {/* React-bootstrap form that takes user input: */}
                {/* Pass in event handler to execute function upon submit button: */}
                <Form onSubmit={this.handleSubmit} className="create-form">
                    <Form.Label className='label'>Student's Forenames:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="forenames"
                        placeholder="Enter Student's forenames..."
                        required
                        type="text"
                        name="forenames"
                        value={this.state.forenames}
                        onChange={this.handleChangeForenames} // Handle changes.
                    />
                    <Form.Label className='label'>Student's Surname:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="surname"
                        placeholder="Enter student's surname..."
                        required
                        type="text"
                        name="surname"
                        value={this.state.surname}
                        onChange={this.handleChangeSurname} // Handle changes.
                    />
                    <Form.Label className='label'>Student's email adrress:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="email_address"
                        placeholder="Enter student's email address..."
                        required
                        type="text"
                        name="email_address"
                        value={this.state.email_address}
                        onChange={this.handleChangeEmail_address} // Handle changes.
                    />
                    <Form.Label className='label'>Student's date of birth:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="date_of_birth"
                        placeholder="Enter student's DOB..."
                        required
                        type="text"
                        name="date_of_birth"
                        value={this.state.date_of_birth}
                        onChange={this.handleChangeDate_of_birth} // Handle changes.
                    />
                    <Form.Label className='label'>Link to student's degree:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="link_to_degree"
                        placeholder="Enter link to degree..."
                        required
                        type="text"
                        name="link_to_degree"
                        value={this.state.link_to_degree}
                        onChange={this.handleChangeLink_to_degree} // Handle changes.
                    />
                    {/*
                    <Form.Label className='label'>Student's Firstname:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="firstname"
                        placeholder="Enter student's firstname..."
                        required
                        type="text"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleChangeFirstname} // Handle changes.
                    />
                    <Form.Label className='label'>Student's Fullname:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="fullname"
                        placeholder="Enter student's fullname..."
                        required
                        type="text"
                        name="fullname"
                        value={this.state.fullname}
                        onChange={this.handleChangeFullname} // Handle changes.
                    />
                    */}
                    <Button variant="dark" type="submit" className='submit'>
                        Submit
                    </Button>
                </Form>
            </div >
        )
    }
}

export default CreateStudent;