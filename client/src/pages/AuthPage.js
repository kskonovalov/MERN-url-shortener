import React, { useEffect, useState } from 'react';

import useHttp from '../hooks/http.hook';
import useMessage from '../hooks/message.hook';

const AuthPage = () => {
  const message = useMessage();
  // const [isLogIn, setIsLogIn] = useState(true);
  const { loading, request, error } = useHttp();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (error) {
      message(error.message);
    }
  }, [error, message]);

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const formHandler = async event => {
    event.preventDefault();
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
    } catch (e) {
      throw e;
    }
  };

  const renderError = (errors, key) => {
    return (
      <ul className="collection">
        {errors.map(item => {
          return item.param === key ? (
            <li className="collection-item red-text text-darken-4" key={item}>
              {item.msg}
            </li>
          ) : null;
        })}
      </ul>
    );
  };

  return (
    <div className="row">
      <div className="col s12 center-align">
        <h1>MERN Link Shortener</h1>
      </div>
      <div className="col s6 offset-s3">
        {error && (
          <ul className="collection">
            <li className="collection-item red lighten-3">{error.message}</li>
          </ul>
        )}
        <div className="card green darken-2">
          <div className="card-content white-text">
            <span className="card-title">Auth</span>
            <form onSubmit={formHandler}>
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
                { error && renderError(error.errors, 'email') }
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
                { error && renderError(error.errors, 'password') }
              </div>
              <div className="input-field">
                <input
                  type="submit"
                  value="Submit"
                  className="btn white-text"
                  disabled={loading}
                />
              </div>
            </form>
          </div>
          <div className="card-action">
            <div className="row">
              <div className="col s3">
                <button className="btn yellow darken-4" disabled={loading}>
                  Sign in
                </button>
              </div>
              <div className="col s3">
                <button
                  className="btn deep-purple lighten-1"
                  disabled={loading}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
