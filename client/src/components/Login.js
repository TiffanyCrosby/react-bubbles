import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [loginInput, setLoginInput] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    setLoginInput({ ...loginInput, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/login', loginInput)
      .then((response) => {
        console.log('Response from post axios login', response);
        localStorage.setItem('token', response.data.payload);
        props.history.push('/bubblePage');
      })
      .catch((error) => console.log('Error from postLogin request ', error));
    setLoginInput({ username: '', password: '' });
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Welcome to the Bubble App!</h1>
      <label>
        <input
          type="text"
          name="username"
          value={loginInput.username}
          placeholder="Enter Username Here"
          onChange={handleChange}
        />
      </label>
      <label>
        <input
          type="password"
          name="password"
          value={loginInput.password}
          placeholder="Enter Password Here"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Log In Here!</button>
    </form>
  );
};

export default Login;
