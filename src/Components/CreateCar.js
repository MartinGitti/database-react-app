import React, { Component } from 'react'; // React library.
import axios from 'axios'; // Easy HTTP requests with axios.
import '../App.css' // Styling Sheet.

// Import React-bootstrap components:
import Button from 'react-bootstrap/Button';
import { FormControl, Form } from 'react-bootstrap';

class CreateCar extends Component {
    constructor(props) {
        super(props)
        // Pass in all binding methods:
        this.handleChangeModel = this.handleChangeModel.bind(this);
        this.handleChangeMake = this.handleChangeMake.bind(this);
        this.handleChangeColour = this.handleChangeColour.bind(this);
        this.handleChangeRegistration = this.handleChangeRegistration.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleChangeOwner = this.handleChangeOwner.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            model: 0,
            make: '',
            colour: '',
            registration: '',
            number: '',
            owner: '',
            address: '',
            results: [] // Empty array as container to store details.
        }
    }
    // Change handlers for car properties:
    handleChangeModel = (e) => {
        this.setState({
            model: e.target.value
        })
    }
    handleChangeMake = (e) => {
        this.setState({
            make: e.target.value
        })
    }
    handleChangeColour = (e) => {
        this.setState({
            colour: e.target.value
        })
    }
    handleChangeRegistration = (e) => {
        this.setState({
            registration: e.target.value
        })
    }
    handleChangeNumber = (e) => {
        this.setState({
            number: e.target.value
        })
    }
    handleChangeOwner = (e) => {
        this.setState({
            owner: e.target.value
        })
    }
    handleChangeAddress = (e) => {
        this.setState({
            address: e.target.value
        })
    }
    // Create/add new car to database:
    addVehicle = () => {
        // Similar to backend POST method.
        // Properties defined that will be passed into array object:
        const { model, make, colour, registration, number, owner, address } = this.setState;
        // Fetch data from backend and return to frontend with http requests:
        axios.post(`http://localhost:8080/cars/add`, {
            mothod: 'POST',// Call Request.
            headers: {
                'Content-Type': 'application/json'// JSON format.
            },
            // Display json content as json string for readibility:
            body: JSON.stringify({ model, make, colour, registration, number, owner, address })
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
        const { model, make, colour, registration, number, owner, address } = this.state;
        fetch('http://localhost:8080/cars/add', {
            method: 'POST', // Post Request.
            headers: {
                'Content-Type': 'application/json'
            },
            // Display json content as json string for readibility:
            body: JSON.stringify({ model, make, colour, registration, number, owner, address })
        })
            .then((res) => res.json()) // Return result to json.
            .then(this.componentDidMount()) // Display updated data after mount.
            .then((response) => alert('Vehicle added!')) // Inform upon submit.
            .catch((error) => console.log('Error:', error)); // If unsuccessful, return error.
    }
    // Render data after change & updates when successful:
    componentDidMount() {
        fetch('http://localhost:8080/cars')
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
                <h1 className='heading'>Add Additional Car:</h1>
                {/* React-bootstrap form that takes user input: */}
                {/* Pass in event handler to execute function upon submit button: */}
                <Form onSubmit={this.handleSubmit} className="create-form">
                    <Form.Label className='label'>Vehicle Model:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="model"
                        placeholder="Enter year model..."
                        required
                        type="number"
                        name="text"
                        value={this.state.model}
                        onChange={this.handleChangeModel} // Handle changes.
                    />
                    <Form.Label className='label'>Vehicle Make:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="make"
                        placeholder="Enter vehicle make..."
                        required
                        type="text"
                        name="make"
                        value={this.state.make}
                        onChange={this.handleChangeMake} // Handle changes.
                    />
                    <Form.Label className='label'>Vehicle Colour:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="colour"
                        placeholder="Enter vehicle colour..."
                        required
                        type="text"
                        name="colour"
                        value={this.state.colour}
                        onChange={this.handleChangeColour} // Handle changes.
                    />
                    <Form.Label className='label'>Vehicle Registration:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="registration"
                        placeholder="Enter vehicle registration..."
                        required
                        type="text"
                        name="registration"
                        value={this.state.registration}
                        onChange={this.handleChangeRegistration} // Handle changes.
                    />
                    <Form.Label className='label'>Owner's number:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="text"
                        placeholder="Enter owner number..."
                        required
                        type="text"
                        name="number"
                        value={this.state.number}
                        onChange={this.handleChangeNumber} // Handle changes.
                    />
                    <Form.Label className='label'>Owner's Fullname:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="owner"
                        placeholder="Enter fullname..."
                        required
                        type="text"
                        name="owner"
                        value={this.state.owner}
                        onChange={this.handleChangeOwner} // Handle changes.
                    />
                    <Form.Label className='label'>Owner's Address:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="address"
                        placeholder="Enter address..."
                        required
                        type="text"
                        name="address"
                        value={this.state.address}
                        onChange={this.handleChangeAddress} // Handle changes.
                    />
                    <Button variant="dark" type="submit" className='submit'>
                        Submit
                    </Button>
                </Form>
            </div >
        )
    }
}

export default CreateCar