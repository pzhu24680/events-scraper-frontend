import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/auth';
import '../styles/Signup.css';
const Signup= () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken':getCookie('csrftoken'),
    };
    fetch("https://event-scraper-96da9a7e534d.herokuapp.com/auth/signup/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
    navigate("/login")
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;