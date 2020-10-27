// All required Imports:
import React from 'react'; // React library.
import 'bootstrap/dist/css/bootstrap.css'; // Bootstrap.
import { BrowserRouter as Router, Route } from 'react-router-dom'; // Routing components.

// Components:
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import CarList from './Components/CarList';
import EditCar from './Components/EditCar';
import CreateCar from './Components/CreateCar';

// Main app to be rendered:
function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Router>
          <Navbar />
          {/* Map URL Paths: */}
          <Route path='/' exact component={CarList} />
          <Route path='/edit/:id' exact component={EditCar} />
          <Route path='/create' exact component={CreateCar} />
        </Router>
      </div>
    </div>
  );
}

export default App;
