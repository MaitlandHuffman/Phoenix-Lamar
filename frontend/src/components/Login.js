import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // 🔥 NEW

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();  // 🔥 Hook to navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/login', { email, password })
      .then(res => {
        setSuccess(`Logged in successfully!`);
        setError('');
        console.log("Received token:", res.data.token);

        // 🔥 Navigate to parts page after login
        navigate('/parts');
      })
      .catch(err => {
        setError(err.response?.data?.error || 'Login failed.');
        setSuccess('');
      });
  };

  return (
    <div className="login-container">
      <div className="header">
        <h1>Phoenix-Lamar</h1>
        <p>Log in to access the parts system</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
      
        <label>Password:</label>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">Log In</button>
        
      </form>
    </div>
  );
}

export default Login;
