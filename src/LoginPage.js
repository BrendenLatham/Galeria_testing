// src/LoginPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [authError, setAuthError] = useState(false);
  const { login } = useAuth();
  const [serverMessage, setServerMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = isLogin ? '/login' : '/signup'; // Update with your server's API endpoints
    if (!isLogin && password !== passwordConfirm) {
      setServerMessage('Passwords do not match');
      return; // Don't submit to server if passwords don't match
    }
    const userData = isLogin ? { username, password } : { username, email, password };

    try {
      console.log('Submitting the following user data:', userData);
      const response = await axios.post(`http://localhost:5000${endpoint}`, userData); // Update with your server's URL
      console.log('Response',response);
      if (response && response.data && response.data.message === 'Login successful' || 'Registration successful') {
        // Handle the successful login
        localStorage.setItem('token', response.data.token);
        login(userData);
        if (userData.username === "Admin") {
          navigate('/panel');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error(error.response.data.message || 'Error occurred');
      if (isLogin) {
        setAuthError(true);
        setServerMessage(error.response.data.message);
      } else {
        setServerMessage(error.response.data.message);
      }
    } 
  }
  return (
    <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh", backgroundImage: "url('https://images.unsplash.com/photo-1583119912267-cc97c911e416?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8YXJ0LHBhaW50aW5nLGh1bWFuLHBlcnNvbixncmV5LHdhbGxwYXBlcnx8fHx8fDE2OTYxMzEyNTU&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600')", backgroundSize: 'cover', backgroundPosition: 'center', margin: '0', padding: '0' }}>
      <div className="w-100 text-center" style={{ maxWidth: '400px' }}>
        <h1 className="mb-2">Galeria</h1>
        <h3 className="mb-4">Rediscover Classics, Redefine Artistry.</h3>
        <Card className="p-4 mx-auto">
          <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" required onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>
            {!isLogin && ( // Conditionally render email field for signup between username and password
              <Form.Group id="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
            )}
            <Form.Group id="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            {!isLogin && ( // Conditionally render password confirmation field for signup
              <Form.Group id="password-confirm" className="mt-3">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type="password" required onChange={(e) => setPasswordConfirm(e.target.value)} />
              </Form.Group>
            )}
            <Button className="w-100 mt-3" type="submit">
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            {serverMessage && <p style={{ color: 'red' }}>{serverMessage}</p>}
            {isLogin ? 'Need an account? ' : 'Already have an account? '}
            <span style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Log In'}
            </span>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default LoginPage;
