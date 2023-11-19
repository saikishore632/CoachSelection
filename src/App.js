import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  // Define the backend URL
  // const backendUrl = 'http://localhost:4003'; // Replace with your actual backend URL

  // // Function to check the connection with the backend server
  // const checkBackendConnection = async () => {
  //   try {
  //     const response = await axios.get(`${backendUrl}/api/signup`);
  //     console.log(response.data.message);
  //   } catch (error) {
  //     console.log('Error connecting to backend:', error);
  //   }
  // };

  // // Call the function to check the backend connection
  // checkBackendConnection();

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
            <li className="nav-item">
              <Link to="/home" className="nav-link">HomePage</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

