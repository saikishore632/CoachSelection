import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [userEmail, setUserEmail] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4003/api/login', formData);

      if (response.status === 200 && response.data.message === 'Login successful') {
        // Redirect to the home page with userEmail passed as state
        //console.log("now:", response.data.email);
        await setUserEmail(response.data.email);
        navigate('/home', { state: { userEmail: response.data.email } });

      } else {
        // Handle other cases if needed
      }
    } catch (error) {
      console.error('Error during login:', error);
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