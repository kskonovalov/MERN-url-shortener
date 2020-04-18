import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogIn, setIsLogIn] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };



  return (
    <div className="row">
      <div className="col s12 center-align">
        <h1>MERN Link Shortener</h1>
      </div>
      <div className="col s6 offset-s3">
        <div className="card green darken-2">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <form>
              <div className="input-field">
                <input
                  placeholder="Your e-mail"
                  id="email"
                  type="email"
                  name="email"
                  className="white-text"
                  onChange={changeHandler}
                />
                <label htmlFor="email" className="white-text">
                  Email
                </label>
              </div>
              <div className="input-field">
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  name="password"
                  className="white-text"
                  onChange={changeHandler}
                />
                <label htmlFor="password" className="white-text">
                  password
                </label>
              </div>
              <div className="input-field">
                <input
                  type="submit"
                  value="Submit"
                  className="btn white-text"
                />
              </div>
            </form>
          </div>
          <div className="card-action">
            <div className="row">
              <div className="col s3">
                <button className="btn yellow darken-4">Sign in</button>
              </div>
              <div className="col s3">
                <button className="btn deep-purple lighten-1">Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
