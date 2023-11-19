import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4003/api/login', formData);
      
    
      // Check if the login was successful (you might have a different way to verify this)
      if (response.status === 200) {
        console.log("Sai kishore is here at navigation");
        // console.log(response);
        // const userEmail = response.config.adapter.data.email;
        // console.log('User email:', userEmail);
        // Redirect to the home page after successful login
        navigate("/home")
      }
      // const handleLogin = (userData) => {
      //   // Assuming 'userData' is the user info obtained from the API
      //   setUser(userData); // Call 'setUser' to update user info in the context
        
      // };
    } catch (error) {
      // Handle error (e.g., display error message)
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default LoginForm;