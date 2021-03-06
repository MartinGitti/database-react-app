import React, { Component } from 'react'; // Import React library.
import axios from 'axios'; // Import axios to send http requests.
import '../App.css'; // Styling sheet.

//'Car' constructor:
// Blueprint of props for every car displayed...
const Car = props => (
    <tr>
        <td>{props.car.model}</td>
        <td>{props.car.make}</td>
        <td>{props.car.colour}</td>
        <td>{props.car.registration}</td>
        <td>{props.car.number}</td>
        <td>{props.car.owner}</td>
        <td>{props.car.address}</td>
    </tr>
)
// List all vehicles older than 5 years stored in database:
class OlderCarsList extends Component {
    constructor(props) {
        super(props);
        // Empty array that car details will be stored in:
        this.state = { cars: [] };
    }
    // return all vehicles older than 5 years in database upon mount:
    componentDidMount() {
        axios.get('http://localhost:8080/cars/olderModels')
            .then(response => {
                this.setState({ cars: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // Map through and return cars listed in database: 
    // Each car in database has a unique 'key' value...
    oldercarList() {
        return this.state.cars.map(currentcar => {
            return <Car car={currentcar} deleteCar={this.deleteCar} key={currentcar._id} />;
        })
    }
    render() {
        return (
            <div className='older-cars-list'>
                <h3>All Vehicles older than 5 years:</h3>
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
                        </tr>
                    </thead>
                    <tbody>
                        {/* Pass through mapped car list: */}
                        {/* car details displayed in table body... */}
                        {this.oldercarList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OlderCarsList;
