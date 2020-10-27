import React, { Component } from 'react'; // React library.
import axios from 'axios'; // Easy HTTP requests with axios.
import '../App.css'; // Styling Sheet.

// Import React-bootstrap components:
import Button from 'react-bootstrap/Button';
import { FormControl, Form } from 'react-bootstrap';

class EditStudent extends Component {
    constructor(props) {
        super(props);
        // Pass in all binding methods:
        this.handleChangeForenames = this.handleChangeForenames.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeEmail_Address = this.handleChangeEmail_Address.bind(this);
        this.handleChangeDate_of_birth = this.handleChangeDate_of_birth.bind(this);
        this.handleChangeLink_to_degree = this.handleChangeLink_to_degree.bind(this);
        this.handleChangeFirstname = this.handleChangeFirstname.bind(this);
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            forenames: '',
            surname: '',
            email_address: '',
            date_of_birth: '',
            link_to_degree: '',
            firstname: '',
            fullname: '',
            students: [] // Empty array as container to store details.
        }
    }
    // 
    componentDidMount() {
        axios.get('http://localhost:8080/students/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    forenames: response.data.forenames,
                    surname: response.data.surname,
                    email_address: response.data.email_address,
                    date_of_birth: response.data.date_of_birth,
                    link_to_degree: response.data.link_to_degree,
                    firstname: response.data.firstname,
                    fullname: response.data.forenames + response.data.surname,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // Change handlers:
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
    handleChangeEmail_Address = (e) => {
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
    // Submit handler:
    handleSubmit = (e) => {
        e.preventDefault();
        // Basic student information required:
        const student = {
            forenames: this.state.forenames,
            surname: this.state.surname,
            email_address: this.state.email_address,
            date_of_birth: this.state.date_of_birth,
            link_to_degree: this.state.link_to_degree,
            firstname: this.state.forenames,
            fullname: this.state.forenames + this.state.surname,
        }
        // POST request to update student details.
        axios.post('http://localhost:8080/students/update/' + this.props.match.params.id, student)
            .then(() => {
                alert('Details of student have been updated in the database!')
                window.location = '/'; // Return to main page.
            })
    }
    render() {
        return (
            <div className='edit-form-div'>
                <h1 className='heading'>Update Student's Details:</h1>
                {/* React-bootstrap form that takes user input: */}
                {/* Pass in event handler to execute function upon submit button: */}
                <Form onSubmit={this.handleSubmit} className="create-form">
                    <Form.Label className='label'>Student's Forenames:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="forenames"
                        placeholder="Enter student's fornames..."
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
                        name="make"
                        value={this.state.surname}
                        onChange={this.handleChangeSurname} // Handle changes.
                    />
                    <Form.Label className='label'>Student's Email Address:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="email_address"
                        placeholder="Enter students email address..."
                        required
                        type="text"
                        name="email_address"
                        value={this.state.email_address}
                        onChange={this.handleChangeEmail_Address} // Handle changes.
                    />
                    <Form.Label className='label'>Student's date of birth:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="date_of_birth"
                        placeholder="Enter student's date of birth..."
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
                        placeholder="Enter link to student's degree..."
                        required
                        type="text"
                        name="link_to_degree"
                        value={this.state.link_to_degree}
                        onChange={this.handleChangeLink_to_degree} // Handle changes.
                    />
                    <Form.Label className='label'>Student's Firstname:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="firstname"
                        placeholder="Enter firstname..."
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
                    <Button variant="dark" type="submit" className='submit'>
                        Submit
                    </Button>
                </Form>
            </div >
        )
    }
}


export default EditStudent;