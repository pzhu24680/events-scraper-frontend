import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/auth';
import '../styles/Login.css';
const Login = ({setIsAuthenticated}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
    const response= await fetch("https://event-scraper-96da9a7e534d.herokuapp.com/auth/login/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(formData),
    })
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        setIsAuthenticated(true);
        navigate("/")
      } else {
        console.error(data.error);
  };
}

  return (
    <div className="login-container">
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;