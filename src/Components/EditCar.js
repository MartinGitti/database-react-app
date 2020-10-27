import React, { Component } from 'react'; // React library.
import axios from 'axios'; // Easy HTTP requests with axios.
import '../App.css'; // Styling Sheet.

// Import React-bootstrap components:
import Button from 'react-bootstrap/Button';
import { FormControl, Form } from 'react-bootstrap';

class EditCar extends Component {
    constructor(props) {
        super(props);
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
            model: '',
            make: '',
            colour: '',
            registration: '',
            number: '',
            owner: '',
            address: '',
            cars: [] // Empty array as container to store details.
        }
    }
    // 
    componentDidMount() {
        axios.get('http://localhost:8080/cars/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    model: response.data.model,
                    make: response.data.make,
                    colour: response.data.colour,
                    registration: response.data.registration,
                    number: response.data.number,
                    owner: response.data.owner,
                    address: response.data.address,
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // Change handlers:
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
    // Submit handler:
    handleSubmit = (e) => {
        e.preventDefault();
        // Basic car information required:
        const car = {
            model: this.state.model,
            make: this.state.make,
            colour: this.state.colour,
            registration: this.state.registration,
            number: this.state.number,
            owner: this.state.owner,
            address: this.state.address,
        }
        // POST request to update car details.
        axios.post('http://localhost:8080/cars/update/' + this.props.match.params.id, car)
            .then(() => {
                alert('Car has been updated in database!')
                window.location = '/'; // Return to main page.
            })
    }
    render() {
        return (
            <div className='edit-form-div'>
                <h1 className='heading'>Update Vehicle Details:</h1>
                {/* React-bootstrap form that takes user input: */}
                {/* Pass in event handler to execute function upon submit button: */}
                <Form onSubmit={this.handleSubmit} className="create-form">
                    <Form.Label className='label'>Vehicle Model:</Form.Label>
                    <FormControl
                        className='form-input'
                        id="model"
                        placeholder="Enter year model..."
                        required
                        type="text"
                        name="model"
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
                        id="number"
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


export default EditCar;