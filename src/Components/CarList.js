import React, { Component } from 'react'; // Import React library.
import { Link } from 'react-router-dom'; // Import routing component.
import axios from 'axios'; // Import axios to send http requests.
import '../App.css'; // Styling sheet.
import OlderCarsList from './OlderModels';// Import component.

// Create 'Car' component constructor:
// Blueprint for every car in database...
const Car = props => (
    <tr>
        <td>{props.car.model}</td>
        <td>{props.car.make}</td>
        <td>{props.car.colour}</td>
        <td>{props.car.registration}</td>
        <td>{props.car.number}</td>
        <td>{props.car.owner}</td>
        <td>{props.car.address}</td>
        {/* Link to Edit page to update vehicle
         or remove vehicle from database with use of 'deleteCar' function. */}
        <td>
            <Link to={"/edit/" + props.car._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCar(props.car._id) }}>delete</a>
        </td>
    </tr>
)
// List all vehicles stored in database:
class CarsList extends Component {
    constructor(props) {
        super(props);

        this.deleteCar = this.deleteCar.bind(this)
        // Empty array that car details will be stored in:
        this.state = { cars: [] };
    }
    // return all vehicles in database upon mount:
    componentDidMount() {
        axios.get('http://localhost:8080/cars')
            .then(response => {
                this.setState({ cars: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    // Remove an individual car from database:
    // Each car has an option to be removed or updated individually...
    deleteCar(id) {
        axios.delete('http://localhost:8080/cars/delete/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            cars: this.state.cars.filter(cl => cl._id !== id)
        })
    }
    // Map through and return cars listed in database: 
    // Each car in database has a unique 'key' value...
    carList() {
        return this.state.cars.map(currentcar => {
            return <Car car={currentcar} deleteCar={this.deleteCar} key={currentcar._id} />;
        })
    }
    render() {
        return (
            <div className='cars-list'>
                <h3>Vehicles In Database:</h3>
                <hr />
                <table className="table">
                    <thead className="thead-light">
                        {/* Cars displayed in table format: */}
                        <tr>
                            <th>Model</th>
                            <th>Make</th>
                            <th>Colour</th>
                            <th>Registration</th>
                            <th>Number</th>
                            <th>Owner</th>
                            <th>Address</th>
                            <th>Edit|Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Pass through mapped car list: */}
                        {/* car details displayed in table body... */}
                        {this.carList()}
                    </tbody>
                </table>
                <OlderCarsList />{/* Return list of all cars older than 5 years. */}
            </div>
        )
    }
}

export default CarsList;
