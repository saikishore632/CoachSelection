import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [userErr, setUserErr] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("event:", e);
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4003/api/signup', formData);
      if (response.data.success) {
        setSuccessMsg('Signup successful! You can now log in.');
        setFormData({
          username: '',
          email: '',
          password: '',
        }); // Clear the form after successful signup
        

      } else {
        setUserErr("no response");
        
      }
    } catch (error) {
      console.log("inside else block");
      console.log("error", error);
      if(error.response){
        setUserErr(error.response.data.error);
      }
      else{
      setUserErr(error.message);
      }
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      
      {successMsg &&navigate("/login")}
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
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
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
    {userErr && <div className="alert alert-error">{userErr}</div>}
    </div>
  );
};

export default SignupForm;
